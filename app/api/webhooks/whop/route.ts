import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Basic GET healthcheck so we can confirm the route is deployed & reachable.
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "whop-webhook" });
}

// ─────────────────────────────────────────────────────────────
// Signature verification
// ─────────────────────────────────────────────────────────────

/**
 * Whop sends a webhook signature header. Format can vary by version/config,
 * so we parse defensively and accept any of:
 *   - raw hex:                    "abc123..."
 *   - sha256= prefix:             "sha256=abc123..."
 *   - stripe-like csv:            "t=1700000000,v1=abc123..."
 *
 * The signed payload is the raw request body (UTF-8).
 */
function verifyWhopSignature(
  rawBody: string,
  headerValue: string | null,
  secret: string,
): boolean {
  if (!headerValue || !secret) return false;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody, "utf8")
    .digest("hex");

  const candidates: string[] = [];
  const trimmed = headerValue.trim();

  // Format A: plain hex
  if (/^[a-f0-9]{32,}$/i.test(trimmed)) candidates.push(trimmed);

  // Format B: sha256=<hex>
  const sha = trimmed.match(/sha256=([a-f0-9]+)/i);
  if (sha) candidates.push(sha[1]);

  // Format C: t=...,v1=<hex>
  const v1 = trimmed.match(/v1=([a-f0-9]+)/i);
  if (v1) candidates.push(v1[1]);

  // Stripe-style: also try HMAC over `${timestamp}.${body}`
  const ts = trimmed.match(/t=([0-9]+)/);
  if (ts && v1) {
    const tsExpected = crypto
      .createHmac("sha256", secret)
      .update(`${ts[1]}.${rawBody}`, "utf8")
      .digest("hex");
    if (timingSafeEqHex(tsExpected, v1[1])) return true;
  }

  return candidates.some((c) => timingSafeEqHex(expected, c));
}

function timingSafeEqHex(a: string, b: string): boolean {
  const ab = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ab.length === 0 || ab.length !== bb.length) return false;
  return crypto.timingSafeEqual(ab, bb);
}

// ─────────────────────────────────────────────────────────────
// Event name normalization — Whop uses underscores, but we accept dots too
// ─────────────────────────────────────────────────────────────

function normalizeEvent(name: string): string {
  return name.replace(/\./g, "_");
}

// ─────────────────────────────────────────────────────────────
// Payload field extraction — defensive, handles multiple shapes
// ─────────────────────────────────────────────────────────────

type WhopEvent = {
  event: string;
  data: Record<string, unknown>;
};

function extractFields(data: Record<string, unknown>) {
  const str = (v: unknown) => (typeof v === "string" ? v : undefined);
  const num = (v: unknown) => (typeof v === "number" ? v : undefined);

  // Identify the order / membership — prefer the membership/receipt id
  const orderId =
    str(data.id) ??
    str(data.membership_id) ??
    str(data.receipt_id) ??
    str(data.payment_id);

  // Customer user id (stable across memberships for the same user)
  const customerId =
    str(data.user_id) ??
    str((data.user as Record<string, unknown> | undefined)?.id) ??
    str(data.customer_id) ??
    str(data.member_id);

  // Product id
  const productId =
    str(data.product_id) ??
    str((data.product as Record<string, unknown> | undefined)?.id);

  // Email — can be nested under user
  const email =
    str(data.email) ??
    str((data.user as Record<string, unknown> | undefined)?.email) ??
    "";

  // Amount paid in USD
  const amountUsd =
    num(data.final_amount) ??
    num(data.amount) ??
    num(data.subtotal) ??
    num((data.plan as Record<string, unknown> | undefined)?.initial_price) ??
    num(data.initial_price);

  return { orderId, customerId, productId, email, amountUsd };
}

// ─────────────────────────────────────────────────────────────
// Handler
// ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Always read the raw body ONCE for signature verification
  const rawBody = await req.text();

  const secret = process.env.WHOP_WEBHOOK_SECRET ?? "";
  const sigHeader =
    req.headers.get("x-whop-signature") ??
    req.headers.get("whop-signature") ??
    req.headers.get("x-signature") ??
    null;

  if (!secret) {
    console.error("[whop-webhook] WHOP_WEBHOOK_SECRET not configured");
    // Return 200 so Whop doesn't retry forever; log for us to see
    return NextResponse.json({ ok: false, reason: "secret_not_configured" });
  }

  if (!verifyWhopSignature(rawBody, sigHeader, secret)) {
    console.warn("[whop-webhook] signature verification failed", {
      hasHeader: Boolean(sigHeader),
      headerPreview: sigHeader?.slice(0, 20),
    });
    return NextResponse.json({ ok: false, reason: "bad_signature" }, { status: 401 });
  }

  let payload: WhopEvent;
  try {
    const parsed = JSON.parse(rawBody);
    const eventName =
      typeof parsed.event === "string"
        ? parsed.event
        : typeof parsed.action === "string"
          ? parsed.action
          : typeof parsed.type === "string"
            ? parsed.type
            : "";
    const data =
      (parsed.data as Record<string, unknown> | undefined) ??
      (parsed as Record<string, unknown>);
    payload = { event: normalizeEvent(eventName), data };
  } catch (e) {
    console.error("[whop-webhook] invalid JSON body", e);
    return NextResponse.json({ ok: false, reason: "invalid_json" }, { status: 400 });
  }

  const { event, data } = payload;
  const { orderId, customerId, productId, email, amountUsd } = extractFields(data);

  console.log("[whop-webhook] received", {
    event,
    orderId,
    customerId,
    productId,
    hasEmail: Boolean(email),
    amountUsd,
  });

  try {
    const supabase = createSupabaseAdminClient();

    // Claim a spot when a membership becomes valid (= payment succeeded for founding member)
    if (event === "membership_went_valid" || event === "payment_succeeded") {
      if (!orderId) {
        console.warn("[whop-webhook] skipped: no orderId in payload");
        return NextResponse.json({ ok: true, skipped: "no_order_id" });
      }
      // Only process our founding-member product. If productId is missing, still proceed
      // (payment_succeeded events sometimes omit it) — but log.
      if (productId && productId !== "prod_J6RwbzePtS49k") {
        console.log("[whop-webhook] ignoring non-founding product", { productId });
        return NextResponse.json({ ok: true, skipped: "other_product" });
      }

      const { data: row, error } = await supabase.rpc("claim_founding_spot", {
        p_email: email || "unknown@snailon.com",
        p_whop_customer_id: customerId ?? orderId,
        p_whop_order_id: orderId,
        p_whop_product_id: productId ?? "prod_J6RwbzePtS49k",
        p_amount_paid_usd: amountUsd ?? 10,
      });

      if (error) {
        console.error("[whop-webhook] claim_founding_spot failed", error);
        // Return 200 to avoid infinite retries on permanent errors; we've logged it.
        return NextResponse.json({ ok: false, reason: error.message });
      }

      console.log("[whop-webhook] spot claimed", {
        spot_number: (row as { spot_number?: number } | null)?.spot_number,
        orderId,
      });
      return NextResponse.json({ ok: true, claimed: true });
    }

    // Refund / failure path
    if (event === "payment_failed" || event === "membership_went_invalid") {
      if (!orderId) {
        return NextResponse.json({ ok: true, skipped: "no_order_id" });
      }
      const { error } = await supabase
        .from("founding_members")
        .update({ status: "refunded", updated_at: new Date().toISOString() })
        .eq("whop_order_id", orderId);
      if (error) {
        console.error("[whop-webhook] refund update failed", error);
        return NextResponse.json({ ok: false, reason: error.message });
      }
      return NextResponse.json({ ok: true, refunded: true });
    }

    // Any other event — acknowledge but do nothing
    return NextResponse.json({ ok: true, ignored: event });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("[whop-webhook] handler error", msg);
    // Always 200 for unexpected errors, so Whop doesn't retry forever
    return NextResponse.json({ ok: false, reason: "handler_error" });
  }
}

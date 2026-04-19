"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { T, type Lang } from "../../i18n";

const WHOP_PLAN_ID = "plan_Rqh1uX4IZCqly";

type Founding = {
  spot_number: number | null;
  email: string | null;
  amount_mad: number | null;
  commission_rate: string | number | null;
  status: string | null;
  paid_at: string | null;
  whop_order_id: string | null;
};

function hasFoundingSpot(f: Founding | null): boolean {
  if (!f) return false;
  return f.status === "paid" || f.status === "active";
}

function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.5" y="9" width="11" height="8" rx="1.5" />
      <path d="M7 9V6a3 3 0 0 1 6 0v3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M8 17l5 5 11-12" />
    </svg>
  );
}

export default function BalanceClient({
  email,
  founding: initialFounding,
}: {
  email: string;
  founding: Founding | null;
}) {
  const [lang, setLang] = useState<Lang>("en");
  const [founding, setFounding] = useState<Founding | null>(initialFounding);
  const [paying, setPaying] = useState(false);
  const supabase = useMemo(() => createSupabaseBrowserClient(), []);
  const router = useRouter();
  const searchParams = useSearchParams();

  const t = T[lang];
  const isFounder = hasFoundingSpot(founding);
  const justReturned = searchParams?.get("returning") === "1";

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = t.lang;
    document.body.classList.toggle("rtl", t.dir === "rtl");
  }, [t.dir, t.lang]);

  // Poll for founding row if we just returned from Whop or if pending status.
  // Handles the Whop-redirect / webhook race gracefully.
  const poll = useCallback(async () => {
    const { data } = await supabase
      .from("founding_members")
      .select(
        "spot_number, email, amount_mad, commission_rate, status, paid_at, whop_order_id",
      )
      .eq("email", email.toLowerCase())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    return (data as Founding | null) ?? null;
  }, [supabase, email]);

  useEffect(() => {
    if (isFounder) return; // Already done
    if (!justReturned && founding === null && !paying) return;
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = 20; // ~40 seconds
    const tick = async () => {
      if (cancelled) return;
      attempts += 1;
      const fresh = await poll();
      if (cancelled) return;
      if (fresh && hasFoundingSpot(fresh)) {
        setFounding(fresh);
        // Refresh server state so sidebar/dashboard reflect founder status next nav
        router.refresh();
        return;
      }
      if (attempts < maxAttempts) {
        window.setTimeout(tick, 2000);
      }
    };
    window.setTimeout(tick, 1500);
    return () => {
      cancelled = true;
    };
  }, [justReturned, isFounder, founding, paying, poll, router]);

  // Realtime too — if the webhook lands while we're staring at the page
  useEffect(() => {
    if (isFounder) return;
    const channel = supabase
      .channel("balance-live")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "founding_members",
        },
        async (payload) => {
          const row = (payload.new as Founding | undefined) ?? null;
          if (row && row.email?.toLowerCase() === email.toLowerCase()) {
            const fresh = await poll();
            if (fresh && hasFoundingSpot(fresh)) {
              setFounding(fresh);
              router.refresh();
            }
          }
        },
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, email, isFounder, poll, router]);

  function startCheckout() {
    setPaying(true);
    // Whop accepts prefillEmail to populate checkout. Even if Whop ignores
    // some params, the user is instructed to use the same email.
    const qp = new URLSearchParams({
      email,
      prefillEmail: email,
      metadata_user_email: email,
    });
    const url = `https://whop.com/checkout/${WHOP_PLAN_ID}/?${qp.toString()}`;
    window.location.href = url;
  }

  const rateNum = founding?.commission_rate
    ? Number(founding.commission_rate)
    : 0.01;
  const ratePct = `${(rateNum * 100).toFixed(0)}%`;

  return (
    <div className="app-shell">
      {/* ── Sidebar (compact — full sidebar in layout) ── */}
      <aside className="app-side">
        <div>
          <Link
            href="/"
            className="nav-brand"
            style={{ fontSize: 20, display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ color: "var(--moss)" }}>
              <svg
                viewBox="0 0 24 24"
                width="22"
                height="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="14" cy="12" r="6.5" />
                <circle cx="14" cy="12" r="3.2" />
                <circle cx="14" cy="12" r="1" fill="currentColor" stroke="none" />
                <path d="M7.5 16 Q4 15.5 2.8 13.2" />
                <path d="M5.5 10.8 L4 7.2 M7.3 10.2 L7.3 6.8" />
              </svg>
            </span>
            Snailon
          </Link>
        </div>

        <nav className="app-nav" aria-label="Dashboard">
          <Link className="app-nav-item" href="/dashboard">
            {t.dash_nav_overview}
          </Link>
          <Link className="app-nav-item" aria-current="page" href="/dashboard/balance">
            {t.dash_nav_balance}
          </Link>
          <a className="app-nav-item" href="#">
            <span>{t.dash_nav_orders}</span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span>{t.dash_nav_whatsapp}</span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span>{t.dash_nav_risk}</span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span>{t.dash_nav_team}</span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
          <a className="app-nav-item" href="#">
            <span>{t.dash_nav_settings}</span>
            <span className="soon-badge">{t.dash_soon}</span>
          </a>
        </nav>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={`mailto:${t.dash_nav_support}`}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: "var(--ink-60)",
            }}
          >
            {t.dash_nav_support}
          </a>
          <div className="lang" role="tablist" aria-label="Language" style={{ alignSelf: "flex-start" }}>
            {(["en", "fr", "ar"] as const).map((l) => (
              <button
                key={l}
                type="button"
                className={lang === l ? "is-active" : ""}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
              >
                {l === "en" ? "EN" : l === "fr" ? "FR" : "ع"}
              </button>
            ))}
          </div>
          <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="app-nav-item"
              style={{ width: "100%", textAlign: "start", background: "transparent" }}
            >
              {t.dash_nav_signout}
            </button>
          </form>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <main className="app-main">
        <div className="checkout-wrap">
          <div className="checkout-crumb">
            <Link href="/dashboard">{t.bal_crumb_back}</Link>
          </div>

          {isFounder ? (
            /* ── SUCCESS STATE ── */
            <div className="checkout-card">
              <div className="checkout-success">
                <div className="checkout-success-mark">
                  <CheckIcon />
                </div>
                <h1
                  className="checkout-h1"
                  style={{ textAlign: "center", marginBottom: 16 }}
                >
                  {t.bal_success_h}
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: 16,
                    color: "var(--ink-60)",
                    maxWidth: "44ch",
                    margin: "0 auto 32px",
                    lineHeight: 1.6,
                  }}
                >
                  {t.bal_success_p(founding?.spot_number ?? 0)}
                </p>
                <div className="checkout-spec" style={{ marginBottom: 32 }}>
                  <div className="checkout-spec-row">
                    <span className="k">{t.bal_spec_spot}</span>
                    <span className="v highlight">
                      #{founding?.spot_number ?? "—"}
                    </span>
                  </div>
                  <div className="checkout-spec-row">
                    <span className="k">{t.bal_spec_balance}</span>
                    <span className="v highlight">
                      {founding?.amount_mad ?? 0} {t.dash_mad}
                    </span>
                  </div>
                  <div className="checkout-spec-row">
                    <span className="k">{t.bal_spec_commission}</span>
                    <span className="v accent">
                      {ratePct} · {t.dash_forever}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <Link href="/dashboard" className="btn btn-primary btn-lg">
                    {t.bal_success_cta}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* ── PAYMENT STATE ── */
            <div className="checkout-card">
              <div className="checkout-header">
                <h1
                  className="checkout-h1"
                  dangerouslySetInnerHTML={{ __html: t.bal_h1 }}
                />
                <div className="checkout-price-pill">
                  <span className="amount">$10</span>
                  <span className="label">{t.bal_price_label}</span>
                </div>
              </div>

              <div className="checkout-spec">
                <div className="checkout-spec-row">
                  <span className="k">{t.bal_spec_commission}</span>
                  <span className="v accent">
                    {"1% · "}
                    {t.bal_spec_forever}
                  </span>
                </div>
                <div className="checkout-spec-row">
                  <span className="k">{t.bal_spec_balance}</span>
                  <span className="v">100 {t.dash_mad}</span>
                </div>
                <div className="checkout-spec-row">
                  <span className="k">{t.bal_spec_available}</span>
                  <span className="v">{t.bal_spec_first_100}</span>
                </div>
              </div>

              <div className="checkout-trust">
                <div className="trust-item">
                  <span className="tk">{t.bal_trust_1k}</span>
                  <span className="tv">{t.bal_trust_1v}</span>
                </div>
                <div className="trust-item">
                  <span className="tk">{t.bal_trust_2k}</span>
                  <span className="tv">{t.bal_trust_2v}</span>
                </div>
                <div className="trust-item">
                  <span className="tk">{t.bal_trust_3k}</span>
                  <span className="tv">{t.bal_trust_3v}</span>
                </div>
              </div>

              <div className="checkout-cta">
                <div className="checkout-email-lock">
                  <LockIcon />
                  <span className="lock-label">{t.bal_email_lock}</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: "var(--ink)" }}>
                    {email}
                  </span>
                </div>
                <button
                  type="button"
                  className="btn-pay"
                  onClick={startCheckout}
                  disabled={paying}
                  aria-busy={paying}
                >
                  {paying ? t.bal_btn_paying : t.bal_btn_pay}
                </button>
                <p className="checkout-micro">
                  {t.bal_micro.replace("support@snailon.com", "")}
                  <a href="mailto:support@snailon.com">support@snailon.com</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

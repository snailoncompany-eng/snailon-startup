import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import ThanksClient from "./ThanksClient";

export const dynamic = "force-dynamic";

type Founding = {
  spot_number: number | null;
  amount_mad: number | null;
  commission_rate: string | number | null;
  whop_order_id: string | null;
  status: string | null;
};

export default async function ThanksPage({
  searchParams,
}: {
  searchParams?: { email?: string };
}) {
  const emailRaw = searchParams?.email;
  let founding: Founding | null = null;

  if (emailRaw) {
    try {
      const admin = createSupabaseAdminClient();
      const { data } = await admin
        .from("founding_members")
        .select("spot_number, amount_mad, commission_rate, whop_order_id, status")
        .eq("email", emailRaw.toLowerCase().trim())
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      founding = (data as Founding | null) ?? null;
    } catch (e) {
      console.error("[thanks] lookup failed:", e);
    }
  }

  return (
    <ThanksClient
      email={emailRaw ?? null}
      founding={founding}
    />
  );
}

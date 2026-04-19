import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import BalanceClient from "./BalanceClient";

export const dynamic = "force-dynamic";

type Founding = {
  spot_number: number | null;
  email: string | null;
  amount_mad: number | null;
  commission_rate: string | number | null;
  status: string | null;
  paid_at: string | null;
  whop_order_id: string | null;
};

export default async function BalancePage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) redirect("/login?next=/dashboard/balance");

  const admin = createSupabaseAdminClient();
  const { data: founding } = await admin
    .from("founding_members")
    .select(
      "spot_number, email, amount_mad, commission_rate, status, paid_at, whop_order_id",
    )
    .eq("email", user.email.toLowerCase())
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <BalanceClient
      email={user.email}
      founding={(founding as Founding | null) ?? null}
    />
  );
}

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

type Founding = {
  spot_number: number | null;
  email: string | null;
  amount_mad: number | null;
  commission_rate: string | number | null;
  status: string | null;
  paid_at: string | null;
  store_name: string | null;
};

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already protects this, but double-check for safety
  if (!user || !user.email) {
    redirect("/login");
  }

  // Look up founding_members row by email using admin client
  // (RSC runs server-side; service role is safe here)
  const admin = createSupabaseAdminClient();
  const { data: founding } = await admin
    .from("founding_members")
    .select(
      "spot_number, email, amount_mad, commission_rate, status, paid_at, store_name",
    )
    .eq("email", user.email.toLowerCase())
    .maybeSingle();

  return (
    <DashboardClient
      email={user.email}
      founding={(founding as Founding | null) ?? null}
    />
  );
}

import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import LandingClient from "./LandingClient";

export const revalidate = 0;

type SpotsRow = {
  total_spots: number;
  spots_taken: number;
  spots_remaining: number;
};

async function fetchInitialSpots(): Promise<SpotsRow> {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("spots_summary")
      .select("total_spots, spots_taken, spots_remaining")
      .single();
    if (error || !data) throw error ?? new Error("no data");
    return data as SpotsRow;
  } catch (e) {
    console.error("[page] initial spots fetch failed:", e);
    return { total_spots: 100, spots_taken: 0, spots_remaining: 100 };
  }
}

export default async function Page() {
  const initial = await fetchInitialSpots();
  return <LandingClient initial={initial} />;
}

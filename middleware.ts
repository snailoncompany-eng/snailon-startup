import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only run middleware where auth state matters.
  // Landing (/), api/webhooks, and public pages bypass entirely — big perf win.
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/auth/callback",
  ],
};

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";
import { getProfile } from "./lib/utils";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  if (!session) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  if (
    !req.nextUrl.pathname.startsWith("/account/update") &&
    profile &&
    profile.display_name == null
  ) {
    return NextResponse.redirect(new URL("/account/update", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/account/:path*"],
};

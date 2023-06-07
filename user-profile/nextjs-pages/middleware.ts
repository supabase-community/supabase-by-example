// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { getProfile } from "./lib/utils";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res });

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  const url = req.nextUrl.origin;

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

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/account/:path*"],
};

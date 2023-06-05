// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next();
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path starts with /auth redirect the user to /
  if (user && req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // if user is not signed in and the current path doesn't start with /auth redirect the user to /auth/signin
  if (!user && !req.nextUrl.pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/signin', req.url))
  }

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/auth/:path*", "/account/:path*"],
};

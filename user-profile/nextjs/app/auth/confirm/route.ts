import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { EmailOtpType } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType;
  const next = searchParams.get("next") ?? "/";

  if (token_hash && type) {
    const supabase = createRouteHandlerClient({ cookies: () => cookies() });
    await supabase.auth.verifyOtp({ type, token_hash });
  }

  return NextResponse.redirect(new URL(next, req.url));
}

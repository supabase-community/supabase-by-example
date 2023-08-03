import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { EmailOtpType } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token_hash = String(req.query.token_hash);
  const type = req.query.type as EmailOtpType;
  const next = req.query.next ?? "/";

  if (token_hash && type) {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient({ req, res });
    await supabase.auth.verifyOtp({ type, token_hash });
  }

  res.redirect(`/${next.slice(1)}`);
}

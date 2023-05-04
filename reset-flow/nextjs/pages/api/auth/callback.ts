import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });

  const code = req.query.code;
  const next = (req.query.next as string) ?? "/";

  if (typeof code === "string") {
    await supabase.auth.exchangeCodeForSession(code);
  }

  res.redirect(next);
}

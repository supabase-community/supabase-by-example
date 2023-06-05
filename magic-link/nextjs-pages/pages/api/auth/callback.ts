import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code;
  const next = req.query.next as string ?? "/";
  
  if (typeof code === "string") {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient({ req, res });
    await supabase.auth.exchangeCodeForSession(code);
  }

  res.redirect(next);
}

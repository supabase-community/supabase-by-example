import { NextApiRequest, NextApiResponse } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    // Create authenticated Supabase Client
    const supabase = createPagesServerClient({ req, res });

    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      await supabase.auth.signOut();
      return res.redirect(302, '/auth/signin')
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

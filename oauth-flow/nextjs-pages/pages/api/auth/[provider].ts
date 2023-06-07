import { NextApiRequest, NextApiResponse } from "next";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const provider = req.query.provider as Provider;
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient({ req, res });

  let options: { redirectTo: string; scopes?: string } = {
    redirectTo: `http://localhost:3000/api/auth/callback`,
  };

  if (provider == "azure") {
    options.scopes = "email";
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options,
  });

  if (error) throw error;

  res.redirect(data.url);
}

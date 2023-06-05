import { createServerClient } from "@/lib/supabase-server";

export default async function Home() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <h1>Welcome {session?.user.email}</h1>;
}

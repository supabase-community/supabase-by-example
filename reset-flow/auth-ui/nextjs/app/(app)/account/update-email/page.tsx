import { createServerClient } from "@/lib/supabase-server";
import EmailForm from "./email-form";

export const dynamic = "force-dynamic";

export default async function UpdateEmail() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <EmailForm user={session?.user} />;
}

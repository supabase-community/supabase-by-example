import { createServerClient } from "@/lib/supabase-server";
import PasswordForm from "./password-form";

export const dynamic = "force-dynamic";

export default async function UpdatePassword() {
  const supabase = createServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <PasswordForm user={session?.user} />;
}

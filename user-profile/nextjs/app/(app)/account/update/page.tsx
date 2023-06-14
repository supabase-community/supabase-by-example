import { createServerClient } from "@/lib/supabase-server";
import UpdateForm from "./update-form";
import { getProfile } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function Update() {
  const supabase = createServerClient();

  const { profile, session } = await getProfile(supabase);

  return <UpdateForm profile={profile} user={session?.user} />;
}

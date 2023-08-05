import { getProfile } from "~/lib/utils";

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const supabase = useSupabaseClient<Database>();

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  if (!session) {
    return navigateTo("/auth/signin");
  }

  if (
    !to.path.startsWith("/account/update") &&
    profile &&
    profile.display_name == null
  ) {
    return navigateTo("/account/update");
  }
});

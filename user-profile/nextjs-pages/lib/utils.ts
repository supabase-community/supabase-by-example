import type { ZodError } from "zod";
import { Database } from "./schema";
import { Session, SupabaseClient, User } from "@supabase/auth-helpers-nextjs";

export const formatError = (zodError: ZodError) => {
  const formattedErrors: Record<string, string> = {};
  zodError.errors.forEach((err) => {
    const k = err.path.pop() as string;
    if (formattedErrors[k] == null) {
      formattedErrors[k] = err.message;
    }
  });
  return formattedErrors;
};

export const success = <T extends Record<string, unknown> | undefined>(
  message: string,
  data?: T
) => ({
  success: true,
  message,
  ...data,
});

export const fault = <T extends Record<string, unknown> | undefined>(
  message: string,
  data?: T
) => ({
  success: false,
  message,
  ...data,
});

export type ProfileInfo = Database["public"]["Tables"]["profiles_info"]["Row"];
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export type Profile = Profiles & {
  profiles_info: ProfileInfo | ProfileInfo[] | null;
};

export interface UserInfo {
  user: User;
  profile: Profile;
}

export async function getProfile(
  supabase: SupabaseClient,
  slug: string | undefined = undefined
) {
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let match;
  if (slug !== undefined) {
    match = { slug };
  } else {
    match = { id: session?.user.id };
  }

  // get profile and profile_info
  const { data: profile } = await supabase
    .from("profiles")
    .select(`*, profiles_info(*)`)
    .match(match)
    .maybeSingle();

  return {
    profile,
    session,
  } as { profile: Profile; session: Session | null };
}

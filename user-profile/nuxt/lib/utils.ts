import { Session, SupabaseClient, User } from "@supabase/supabase-js";
import get from "just-safe-get";
import type { ZodError } from "zod";

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

export function waitload(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

export interface UserInfo {
  user: User | undefined;
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

  const profileInfo = get(profile as Profile, "profiles_info") as ProfileInfo;

  return {
    profile,
    profileInfo,
    session,
  } as { profile: Profile; profileInfo: ProfileInfo; session: Session | null };
}

export const generateUrl = (slug: string | null | undefined) => {
  return `${useRuntimeConfig().public.baseUrl}/u/${slug}`;
};

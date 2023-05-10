import { cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export const createServerClient = () =>
  createServerComponentSupabaseClient({
    cookies,
  });

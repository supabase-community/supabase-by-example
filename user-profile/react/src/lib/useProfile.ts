import { useEffect, useState } from "react";
import { ProfileWithInfoAndSession, getProfile } from "./utils";
import { SupabaseClient } from "@supabase/supabase-js";

export const useProfile = (supabase: SupabaseClient, slug?: string) => {
  const [data, setData] = useState<ProfileWithInfoAndSession | null>(null);
  useEffect(() => {
    let ignore = false;
    async function startFetching() {
      setData(null);
      const profile = await getProfile(supabase, slug);
      if (!ignore) {
        setData(profile);
      }
    }

    startFetching();

    return () => {
      ignore = true;
    };
  }, [supabase, slug]);

  return data;
};

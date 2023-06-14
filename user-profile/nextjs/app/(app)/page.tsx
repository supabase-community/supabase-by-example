import { createServerClient } from "@/lib/supabase-server";
import { getProfile } from "@/lib/utils";
import get from "just-safe-get";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerClient();

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  const profileInfo = get(profile as Profile, "profiles_info") as ProfileInfo;
  const website = "";

  return (
    <div className="card w-4/12 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Welcome {profile?.display_name ?? session?.user?.email}
        </h2>
        {profile?.display_name ? (
          <>
            <p>
              Name: {profileInfo?.first_name} {profileInfo?.last_name}
            </p>
            <p>Display Name: {profile.display_name}</p>
            <p>Dob: {profileInfo?.dob}</p>
            <p>Location: {profileInfo?.profile_location}</p>
            <h3 className="text-lg font-semibold mt-2">Bio</h3>
            <p>{profile?.bio}</p>
            <p className="text-right">
              <a
                href={`${website}/${profile?.slug}`}
                className="btn btn-md btn-outline"
              >
                View Profile
              </a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

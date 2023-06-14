import Head from "next/head";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import AppLayout from "@/components/AppLayout";
import { getProfile, Profile, ProfileInfo, UserInfo } from "@/lib/utils";
import absoluteUrl from "next-absolute-url";
import get from "just-safe-get";

const Home = ({ user, profile, website }: UserInfo & { website: string }) => {
  const profileInfo = get(profile as Profile, "profiles_info.0") as ProfileInfo;

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppLayout>
        <div className="card w-4/12 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              Welcome {profile?.display_name ?? user?.email}
            </h2>
            {profile?.display_name ? (
              <>
                <p>
                  Name: {profileInfo?.first_name}
                  {profileInfo?.last_name}
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
      </AppLayout>
    </>
  );
};

export default Home;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);

  const { origin } = absoluteUrl(ctx.req);

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  return {
    props: {
      initialSession: session,
      user: session?.user ?? null,
      profile,
      website: origin,
    },
  };
};

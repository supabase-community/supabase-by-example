import Head from "next/head";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import { getProfile, Profile, ProfileInfo } from "@/lib/utils";
import absoluteUrl from "next-absolute-url";
import get from "just-safe-get";

const VanityPage = ({
  profile,
  website,
}: {
  profile: Profile;
  website: string;
}) => {
  const profileInfo = get(profile as Profile, "profiles_info.0") as ProfileInfo;

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
        <div className="rounded-lg shadow-xl bg-gray-900 text-white">
          <div className="border-b border-gray-800 px-8 py-3">
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-red-500" />
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-yellow-300" />
            <div className="inline-block w-3 h-3 mr-2 rounded-full bg-green-400" />
          </div>
          <div className="px-8 py-6">
            <p>
              <em className="text-blue-400">const</em>{" "}
              <span className="text-green-400">aboutMe</span>
              <span className="text-pink-500">=</span>{" "}
              <em className="text-blue-400">function</em>() &#123;
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-pink-500">return</span> &#123;
            </p>
            {profile?.display_name ? (
              <>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;display_name:{" "}
                  <span className="text-yellow-300">
                    '{profile?.display_name}'
                  </span>
                  ,
                </p>
                {profileInfo ? (
                  <>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;first_name:{" "}
                      <span className="text-yellow-300">
                        '{profileInfo.first_name}'
                      </span>
                      ,
                    </p>
                    <p>
                      &nbsp;&nbsp;&nbsp;&nbsp;last_name:{" "}
                      <span className="text-yellow-300">
                        '{profileInfo.last_name}'
                      </span>
                      ,
                    </p>
                  </>
                ) : null}
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;profile:{" "}
                  <span className="text-yellow-300">
                    '
                    <a
                      href={`${website}/${profile?.slug}`}
                      className="text-yellow-300 hover:underline focus:border-none"
                    >{`${website}/${profile?.slug}`}</a>
                    '
                  </span>
                  ,
                </p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;bio:{" "}
                  <span className="text-yellow-300">'{profile?.bio}'</span>,
                </p>
              </>
            ) : (
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;error:{" "}
                <span className="text-yellow-300">'No Profile found!'</span>,
              </p>
            )}
            <p>&nbsp;&nbsp;&#125;</p>
            <p>&#125;</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VanityPage;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);

  const { origin } = absoluteUrl(ctx.req);
  const slug = ctx?.params?.slug as string;

  // get profile and session
  const { profile, session } = await getProfile(supabase, slug);

  return {
    props: {
      initialSession: session,
      profile,
      website: origin,
    },
  };
};

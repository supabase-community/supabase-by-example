import { createServerClient } from "@/lib/supabase-server";
import { getProfile } from "@/lib/utils";
import get from "just-safe-get";

export default async function Home({ params }: { params: { slug: string } }) {
  const supabase = createServerClient();

  // get profile and session
  const { profile } = await getProfile(supabase, params.slug);

  const profileInfo = get(profile as Profile, "profiles_info") as ProfileInfo;

  // TODO: replace when NextJS provides a way to get the url dynamically
  const website = "http://localhost:3000";

  return (
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
                  &apos;{profile?.display_name}&apos;
                </span>
                ,
              </p>
              {profileInfo ? (
                <>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;first_name:{" "}
                    <span className="text-yellow-300">
                      &apos;{profileInfo.first_name}&apos;
                    </span>
                    ,
                  </p>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;last_name:{" "}
                    <span className="text-yellow-300">
                      &apos;{profileInfo.last_name}&apos;
                    </span>
                    ,
                  </p>
                </>
              ) : null}
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;profile:{" "}
                <span className="text-yellow-300">
                  &apos;
                  <a
                    href={`${website}/${profile?.slug}`}
                    className="text-yellow-300 hover:underline focus:border-none"
                  >{`${website}/${profile?.slug}`}</a>
                  &apos;
                </span>
                ,
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;bio:{" "}
                <span className="text-yellow-300">
                  &apos;{profile?.bio}&apos;
                </span>
                ,
              </p>
            </>
          ) : (
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;error:{" "}
              <span className="text-yellow-300">
                &apos;No Profile found!&apos;
              </span>
              ,
            </p>
          )}
          <p>&nbsp;&nbsp;&#125;</p>
          <p>&#125;</p>
        </div>
      </div>
    </div>
  );
}

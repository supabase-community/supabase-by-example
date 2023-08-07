import { ProfileWithInfoAndSession, generateUrl } from "@/lib/utils";
import { useLoaderData } from "react-router-dom";

export default function Profile() {
  const data = useLoaderData() as ProfileWithInfoAndSession;
  const website = generateUrl(data.profile.slug);

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
          {data.profile?.display_name ? (
            <>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;display_name:{" "}
                <span className="text-yellow-300">
                  &apos;{data.profile?.display_name}&apos;
                </span>
                ,
              </p>
              {data.profileInfo ? (
                <>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;first_name:{" "}
                    <span className="text-yellow-300">
                      &apos;{data.profileInfo.first_name}&apos;
                    </span>
                    ,
                  </p>
                  <p>
                    &nbsp;&nbsp;&nbsp;&nbsp;last_name:{" "}
                    <span className="text-yellow-300">
                      &apos;{data.profileInfo.last_name}&apos;
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
                    href={website}
                    className="text-yellow-300 hover:underline focus:border-none"
                  >
                    {website}
                  </a>
                  &apos;
                </span>
                ,
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;bio:{" "}
                <span className="text-yellow-300">
                  &apos;{data.profile?.bio}&apos;
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

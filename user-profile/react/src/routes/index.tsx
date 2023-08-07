import { useAuth } from "@/lib/AuthProvider";
import { ProfileWithInfoAndSession, generateUrl } from "@/lib/utils";
import { useLoaderData } from "react-router-dom";

export default function Home() {
  const { user } = useAuth();
  const data = useLoaderData() as ProfileWithInfoAndSession;
  const website = generateUrl(data.profile.slug);

  return (
    <div className="card w-4/12 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          Welcome {data.profile?.display_name ?? user?.email}
        </h2>
        {data.profile?.display_name ? (
          <>
            <p>
              Name: {data.profileInfo?.first_name} {data.profileInfo?.last_name}
            </p>
            <p>Display Name: {data.profile.display_name}</p>
            <p>Dob: {data.profileInfo?.dob}</p>
            <p>Location: {data.profileInfo?.profile_location}</p>
            <h3 className="text-lg font-semibold mt-2">Bio</h3>
            <p>{data.profile?.bio}</p>
            <p className="text-right">
              <a href={website} className="btn btn-md btn-outline">
                View Profile
              </a>
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

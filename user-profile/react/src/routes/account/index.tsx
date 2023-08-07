import { useAuth } from "@/lib/AuthProvider";
import { ProfileWithInfoAndSession } from "@/lib/utils";
import { Link, useLoaderData } from "react-router-dom";

export default function AccountIndex() {
  const { user } = useAuth();
  const data = useLoaderData() as ProfileWithInfoAndSession;

  return (
    <>
      <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 className="font-semibold text-4xl mb-4">Account</h2>
        <p className="font-medium mb-10">
          Hi {data?.profile?.display_name ?? user?.email}, you can update your
          email or password from here
        </p>

        <ul className="divide-y-2 divide-gray-200">
          <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
            <Link className="block w-full p-3" to="/account/update">
              Update
            </Link>
          </li>
          <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
            <Link className="block w-full p-3" to="/account/update-email">
              Update email
            </Link>
          </li>
          <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
            <Link className="block w-full p-3" to="/account/update-password">
              Update password
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

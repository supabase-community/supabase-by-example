import { createServerClient } from "@/lib/supabase-server";
import { getProfile } from "@/lib/utils";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Account() {
  const supabase = createServerClient();

  // get profile and session
  const { profile, session } = await getProfile(supabase);

  return (
    <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
      <h2 className="font-semibold text-4xl mb-4">Account</h2>
      <p className="font-medium mb-10">
        Hi {profile?.display_name ?? session?.user.email}, you can update your
        profile, email or password from here
      </p>

      <ul className="divide-y-2 divide-gray-200">
        <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
          <Link className="block w-full p-3" href="/account/update">
            Update profile
          </Link>
        </li>
        <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
          <Link className="block w-full p-3" href="/account/update-email">
            Update email
          </Link>
        </li>
        <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
          <Link className="block w-full p-3" href="/account/update-password">
            Update password
          </Link>
        </li>
      </ul>
    </div>
  );
}

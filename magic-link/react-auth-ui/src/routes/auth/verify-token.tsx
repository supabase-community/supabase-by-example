import { classAppearance } from "@/lib/utils";
import { useSupabaseClient } from "@/lib/AuthProvider";
import { VerifyOtp } from "@supabase/auth-ui-react";

export default function VerifyToken() {
  const supabase = useSupabaseClient();

  return (
    <>
      <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 className="font-semibold text-4xl mb-4">Verify your OTP</h2>
        <p className="font-medium mb-4">Hi, Welcome back</p>
        <VerifyOtp supabaseClient={supabase} appearance={classAppearance} />
      </div>
    </>
  );
}

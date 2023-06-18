import { SignIn as SignInAuthUI } from "@supabase/auth-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@/lib/AuthProvider";
import { classAppearance } from "@/lib/utils";
import { useEffect } from "react";

export default function SignIn() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  });

  return (
    <>
      <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 className="font-semibold text-4xl mb-4">Sign in</h2>
        <p className="font-medium mb-4">Hi, Welcome back</p>
        <SignInAuthUI
          supabaseClient={supabase}
          appearance={classAppearance}
          providers={[]}
        />
        <div className="pt-4 text-center">
          <Link className="block pb-2 text-blue-500" to="/auth/forgotpassword">
            Forgot Password?
          </Link>
        </div>
        <div className="pt-4 text-center">
          Not registered yet?{" "}
          <Link to="/auth/signup" className="underline text-blue-500">
            Create an account
          </Link>
        </div>
      </div>
    </>
  );
}

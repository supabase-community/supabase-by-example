import { useState } from "react";
import { SignUp as SignUpAuthUI } from "@supabase/auth-ui-react";
import { Link } from "react-router-dom";
import { useSupabaseClient } from "@/lib/AuthProvider";
import { classAppearance } from "@/lib/utils";

export default function SignUp() {
  const supabase = useSupabaseClient();
  const [redirectTo] = useState(`${new URL(location.href).origin}`);

  return (
    <>
      <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 className="font-semibold text-4xl mb-4">Create an account</h2>
        <p className="font-medium mb-4">Let's get started</p>
        <SignUpAuthUI
          supabaseClient={supabase}
          appearance={classAppearance}
          redirectTo={redirectTo}
          localization={{
            variables: {
              sign_up: {
                button_label: "Create account",
              },
            },
          }}
          providers={[]}
        />
        <div className="pt-4 text-center">
          Already have an account?{" "}
          <Link to="/auth/signin" className="underline text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}

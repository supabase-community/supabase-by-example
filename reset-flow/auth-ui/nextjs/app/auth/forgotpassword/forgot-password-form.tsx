"use client";
import { useState } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ForgottenPassword } from "@supabase/auth-ui-react";
import { classAppearance } from "@/app/formStyle";

export default function ForgotPasswordForm() {
  const supabase = createClientComponentClient();
  const [redirectTo] = useState(
    `${
      new URL(location.href).origin
    }/auth/callback?next=/account/update-password`
  );

  return (
    <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
      <h2 className="font-semibold text-4xl mb-4">Forgot Password</h2>
      <p className="font-medium mb-4">
        Looks like you&apos;ve forgotten your password
      </p>
      <ForgottenPassword
        supabaseClient={supabase}
        appearance={classAppearance}
        redirectTo={redirectTo}
        localization={{
          variables: {
            forgotten_password: {
              button_label: "Send",
            },
          },
        }}
      />
      <div className="pt-4 text-center">
        Not registered yet?{" "}
        <Link href="/auth/signup" className="underline text-blue-500">
          Create an account
        </Link>
      </div>
    </div>
  );
}

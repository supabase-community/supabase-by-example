"use client";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SignUp } from "@supabase/auth-ui-react";
import { classAppearance } from "@/app/formStyle";
import { useState } from "react";

export default function SignUpForm() {
  const supabase = createClientComponentClient();

  return (
    <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
      <h2 className="font-semibold text-4xl mb-4">Create an account</h2>
      <p className="font-medium mb-4">Let&apos;s get started</p>
      <SignUp
        supabaseClient={supabase}
        appearance={classAppearance}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Create account",
            },
          },
        }}
        providers={[]}
      />
      <div className="pt-4 text-center">
        Already have an account?{" "}
        <Link href="/auth/signin" className="underline text-blue-500">
          Sign In
        </Link>
      </div>
    </div>
  );
}

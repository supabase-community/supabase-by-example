"use client";
import { formatError } from "@/lib/utils";
import { ForgotPasswordSchema } from "@/lib/validationSchema";
import { useState, FormEvent } from "react";
import { z, ZodError } from "zod";
import Alert from "@/components/Alert";
import InputErrorMessage from "@/components/InputErrorMessage";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type FormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordForm() {
  const supabase = createClientComponentClient();
  const [errors, setErrors] = useState<FormData>();
  const [message, setMessage] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // reset all states
    setFormSuccess(false);
    setErrors(undefined);
    setMessage("");

    const email = formData.email;

    try {
      ForgotPasswordSchema.parse({ email });
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData;
        setErrors(errs);
        return;
      }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${
        new URL(location.href).origin
      }/auth/callback?next=/account/update-password`,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // reset form
    setFormData({ email: "" });
    setFormSuccess(true);
    setMessage(
      "Please check your email for a password reset link to log into the website."
    );
  };
  return (
    <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
      {message ? (
        <Alert
          className={`${formSuccess ? "alert-info" : "alert-error"} mb-10`}
        >
          {message}
        </Alert>
      ) : null}
      <h2 className="font-semibold text-4xl mb-4">Forgot Password</h2>
      <p className="font-medium mb-4">
        Looks like you&apos;ve forgotten your password
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email" className="label">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            value={formData?.email ?? ""}
            onChange={(ev) =>
              setFormData({ ...formData, email: ev.target.value })
            }
            className="input input-bordered"
          />
        </div>
        {errors?.email ? (
          <InputErrorMessage>{errors?.email}</InputErrorMessage>
        ) : null}
        <div className="form-control mt-6">
          <button className="btn btn-primary no-animation">Send</button>
        </div>
      </form>
      <div className="pt-4 text-center">
        Not registered yet?{" "}
        <Link href="/auth/signup" className="underline text-blue-500">
          Create an account
        </Link>
      </div>
    </div>
  );
}

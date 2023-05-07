import { FormEvent, useState } from "react";
import { AuthUserWithTokenSchema } from "@/lib/validationSchema";
import { z, ZodError } from "zod";
import { formatError } from "@/lib/utils";
import InputErrorMessage from "@/components/InputErrorMessage";
import { AuthApiError } from "@supabase/supabase-js";
import Alert from "@/components/Alert";
import { useSupabaseClient } from "@/lib/AuthProvider";
import { useNavigate } from "react-router-dom";

type FormData = z.infer<typeof AuthUserWithTokenSchema>;

export default function VerifyToken() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormData>();
  const [message, setMessage] = useState<string>("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    token: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // reset all states
    setFormSuccess(false);
    setErrors(undefined);
    setMessage("");

    const email = formData.email;
    const token = formData.token;

    try {
      AuthUserWithTokenSchema.parse({ email, token });
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData;
        setErrors(errs);
        return;
      }
    }

    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        setMessage("Invalid credentials.");
        return;
      }
      setMessage(error.message);
      return;
    }

    // reset form
    setFormData({ email: "", token: "" });
    navigate("/");
  };

  return (
    <>
      <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        {message ? (
          <Alert
            className={`${formSuccess ? "alert-info" : "alert-error"} mb-10`}
          >
            {message}
          </Alert>
        ) : null}
        <h2 className="font-semibold text-4xl mb-4">Sign in</h2>
        <p className="font-medium mb-4">Hi, Welcome back</p>
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
          <div className="form-control">
            <label htmlFor="token" className="label">
              Token
            </label>
            <input
              id="token"
              name="token"
              type="text"
              value={formData?.token ?? ""}
              onChange={(ev) =>
                setFormData({ ...formData, token: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.token ? (
            <InputErrorMessage>{errors?.token}</InputErrorMessage>
          ) : null}
          <div className="form-control mt-6">
            <button className="btn btn-primary no-animation">Sign in</button>
          </div>
        </form>
      </div>
    </>
  );
}

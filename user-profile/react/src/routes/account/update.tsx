import { FormEvent, useEffect, useState } from "react";
import { UpdateProfileSchema } from "@/lib/validationSchema";
import { z, ZodError } from "zod";
import { ProfileWithInfoAndSession, formatError } from "@/lib/utils";
import InputErrorMessage from "@/components/InputErrorMessage";
import Alert from "@/components/Alert";
import { useAuth, useSupabaseClient } from "@/lib/AuthProvider";
import { useLoaderData, useRevalidator } from "react-router-dom";

type FormData = z.infer<typeof UpdateProfileSchema>;

export default function Update() {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const data = useLoaderData() as ProfileWithInfoAndSession;
  const revalidate = useRevalidator();
  const [errors, setErrors] = useState<FormData>();
  const [message, setMessage] = useState("");
  const [formSuccess, setFormSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    displayName: "",
    bio: "",
    firstName: "",
    lastName: "",
    dob: "",
    profileLocation: "",
  });

  useEffect(() => {
    setFormData({
      displayName: data?.profile?.display_name ?? "",
      bio: data?.profile?.bio ?? "",
      firstName: data?.profileInfo?.first_name ?? "",
      lastName: data?.profileInfo?.last_name ?? "",
      dob: data?.profileInfo?.dob ?? "",
      profileLocation: data?.profileInfo?.profile_location ?? "",
    });
  }, [data]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const displayName = formData.displayName;
    const bio = formData.bio;
    const firstName = formData.firstName;
    const lastName = formData.lastName;
    const dob = formData.dob;
    const profileLocation = formData.profileLocation;

    setFormSuccess(false);
    setErrors(undefined);
    setMessage("");

    try {
      UpdateProfileSchema.parse(formData);
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData;
        setErrors(errs);
        return;
      }
    }

    const { error } = await supabase.rpc("update_profile", {
      display_name: displayName,
      bio,
      first_name: firstName,
      last_name: lastName,
      dob,
      profile_location: profileLocation,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    // reset form
    revalidate.revalidate();
    setFormSuccess(true);
    setMessage("Your profile was updated successfully.");
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
        <h2 className="font-semibold text-4xl mb-4">
          {data?.profile?.display_name
            ? "Update Profile"
            : "Please complete your profile"}
        </h2>
        <p className="font-medium mb-4">
          Hi {data?.profile?.display_name ?? user?.email}, Enter your user
          profile info below
        </p>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="first_name" className="label">
              First Name
            </label>
            <input
              id="first_name"
              name="firstName"
              type="text"
              value={formData?.firstName}
              onChange={(ev) =>
                setFormData({ ...formData, firstName: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.firstName ? (
            <InputErrorMessage>{errors?.firstName}</InputErrorMessage>
          ) : null}
          <div className="form-control">
            <label htmlFor="last_name" className="label">
              Last Name
            </label>
            <input
              id="last_name"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={(ev) =>
                setFormData({ ...formData, lastName: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.lastName ? (
            <InputErrorMessage>{errors?.lastName}</InputErrorMessage>
          ) : null}
          <div className="form-control">
            <label htmlFor="display_name" className="label">
              Display Name
            </label>
            <input
              id="display_name"
              name="displayName"
              type="text"
              value={formData.displayName}
              onChange={(ev) =>
                setFormData({ ...formData, displayName: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.displayName ? (
            <InputErrorMessage>{errors?.displayName}</InputErrorMessage>
          ) : null}
          <div className="form-control">
            <label htmlFor="bio" className="label">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              className="textarea textarea-bordered textarea-lg w-full"
              value={formData.bio}
              onChange={(ev) =>
                setFormData({ ...formData, bio: ev.target.value })
              }
            />
          </div>
          {errors?.bio ? (
            <InputErrorMessage>{errors?.bio}</InputErrorMessage>
          ) : null}
          <div className="form-control">
            <label htmlFor="dob" className="label">
              Date of birth
            </label>
            <input
              id="dob"
              name="dob"
              type="text"
              value={formData.dob}
              onChange={(ev) =>
                setFormData({ ...formData, dob: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.dob ? (
            <InputErrorMessage>{errors?.dob}</InputErrorMessage>
          ) : null}
          <div className="form-control">
            <label htmlFor="profile_location" className="label">
              Location
            </label>
            <input
              id="profile_location"
              name="profileLocation"
              type="text"
              value={formData.profileLocation}
              onChange={(ev) =>
                setFormData({ ...formData, profileLocation: ev.target.value })
              }
              className="input input-bordered"
            />
          </div>
          {errors?.profileLocation ? (
            <InputErrorMessage>{errors?.profileLocation}</InputErrorMessage>
          ) : null}
          <div className="form-control mt-6">
            <button className="btn btn-primary no-animation">Update</button>
          </div>
        </form>
      </div>
    </>
  );
}

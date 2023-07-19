import { useAuth } from "@/lib/AuthProvider";

export default function AccountIndex() {
  const { user } = useAuth();

  return (
    <>
      <div className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6">
        <h2 className="font-semibold text-4xl mb-4">Account</h2>
        <p className="font-medium mb-10">
          Hi {user?.email}, you can update your email or password from here
        </p>
      </div>
    </>
  );
}

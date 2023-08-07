import { useAuth } from "@/lib/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthLayout() {
  const { user } = useAuth();

  return (
    <main data-theme="winter">
      <div className="flex flex-col h-screen">
        <div className="header border-b border-gray-300 py-8 px-4 mx-8 text-center">
          <h1 className="font-semibold">User Profile</h1>
        </div>
        <div className="grid place-items-center my-20 mx-2 sm:my-auto">
          {user ? <Navigate to="/" replace /> : <Outlet />}
        </div>
      </div>
    </main>
  );
}

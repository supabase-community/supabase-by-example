import { useAuth, useSupabaseClient } from "@/lib/AuthProvider";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function AppLayout() {
  const supabase = useSupabaseClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main data-theme="winter">
      <div className="flex flex-col h-screen">
        <div className="navbar border-b border-gray-300 px-4">
          <div className="flex-1">
            <h1 className="font-semibold">
              <Link to="/">User Profile</Link>
            </h1>
          </div>
          <div className="flex-none space-x-10">
            <Link to="/account" className="btn btn-outline no-animation">
              Account
            </Link>
            <button
              className="block"
              onClick={() => {
                supabase.auth.signOut().then(() => navigate("/auth/signin"));
              }}
            >
              Sign out
            </button>
          </div>
        </div>
        <div className="grid place-items-center my-20 mx-2">
          {user ? (
            <Outlet />
          ) : (
            <Navigate to="/auth/signin" state={{ from: location }} replace />
          )}
        </div>
      </div>
    </main>
  );
}

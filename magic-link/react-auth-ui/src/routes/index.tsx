import { useAuth } from "@/lib/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1>Welcome {user?.email}</h1>
    </>
  );
}

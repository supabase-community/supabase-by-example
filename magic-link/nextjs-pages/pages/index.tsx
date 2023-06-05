import {
  createPagesServerClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import AppLayout from "@/components/AppLayout";

export default function Home({ user }: { user: User }) {
  return (
    <>
      <AppLayout>
        <h1>Welcome {user.email}</h1>
      </AppLayout>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return {
    props: {
      initialSession: session,
      user: session?.user,
    },
  };
};

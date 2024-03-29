import Head from "next/head";
import {
  createPagesServerClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import AppLayout from "@/components/AppLayout";

export default function Home({ user }: { user: User }) {
  return (
    <>
      <Head>
        <title>Reset Flow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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

  if (!session)
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  };
};

import Head from 'next/head'
import { createPagesServerClient, User } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import AppLayout from '@/components/AppLayout'
import Link from 'next/link'

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
        <div
          className="w-11/12 p-12 px-6 py-10 rounded-lg sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-3/12 sm:px-10 sm:py-6"
        >
          <h2 className="font-semibold text-4xl mb-4">Account</h2>
          <p className="font-medium mb-10">
            Hi {user.email}, you can update your email or password from here
          </p>

          <ul className="divide-y-2 divide-gray-200">
            <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
              <Link className="block w-full p-3" href="/account/update-email">Update email</Link>
            </li>
            <li className="flex justify-between hover:bg-blue-600 hover:text-blue-200">
              <Link className="block w-full p-3" href="/account/update-password">Update password</Link>
            </li>
          </ul>
        </div>

      </AppLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx)
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session)
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      user: session.user,
    },
  }
}

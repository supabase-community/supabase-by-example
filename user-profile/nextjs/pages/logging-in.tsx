import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { waitload } from "@/lib/utils";

export default function LoggingIn() {
  const router = useRouter();

  useEffect(() => {
    // check if user has been set in session store then redirect
    const url = new URL(window.location.href);
    const redirectTo = url.searchParams.get("redirect");
    (async () => {
      await waitload(1);
      router.push(redirectTo ?? "/");
    })();
  }, []);

  return (
    <>
      <Head>
        <title>User Profile</title>
      </Head>

      <section className="fixed z-20 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0" aria-hidden="true">
            <div className="absolute inset-0 opacity-100" />
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom transform sm:align-middle sm:max-w-2xl">
            <div className="text-center">
              <em className="text-2xl">
                "Because as we know, there are known knowns; there are things we
                know we know. We also know there are known unknowns; that is to
                say we know there are some things we do not know. But there are
                also unknown unknowns—the ones we don't know we don't know"
              </em>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

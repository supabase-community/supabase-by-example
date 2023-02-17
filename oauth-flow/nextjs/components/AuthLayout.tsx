import { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <>
      <Head>
        <title>OAuth Flow</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main data-theme="winter">
        <div className="flex flex-col h-screen">
          <div className="header border-b border-gray-300 py-8 px-4 mx-8 text-center">
            <h1 className="font-semibold">OAuth Flow</h1>
          </div>
          <div className="grid place-items-center my-20 mx-2 sm:my-auto">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

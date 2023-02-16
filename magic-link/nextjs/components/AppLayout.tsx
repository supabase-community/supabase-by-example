import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function AppLayout({ children }: Props) {
  return (
    <main data-theme="winter">
      <div className="flex flex-col h-screen">
        <div className="navbar border-b border-gray-300 py-8 px-4">
          <div className="flex-1">
            <h1 className="font-semibold">
              <Link href="/">Reset Flow</Link>
            </h1>
          </div>
          <div className="flex-none space-x-10">
            <Link className="btn btn-outline no-animation" href="/account">
              Account
            </Link>
            <Link className="block" href="/auth/signout">
              Sign out
            </Link>
          </div>
        </div>
        <div className="grid place-items-center my-20 mx-2">{children}</div>
      </div>
    </main>
  );
}

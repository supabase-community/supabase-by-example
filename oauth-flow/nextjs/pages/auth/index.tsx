import { GetServerSidePropsContext } from "next";

export default function Auth() {}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    redirect: {
      destination: "/auth/signin",
      permanent: true,
    },
  };
};

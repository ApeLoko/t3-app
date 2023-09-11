import { useSession } from "next-auth/react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";

import { ssgHelper } from "~/server/api/ssgHelper";
import { api } from "~/utils/api";

import { authOptions } from "~/server/auth";
import { getServerSession } from "next-auth/next";

const Profile: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
  const { data: sessionData } = useSession();

  const { data: helloData } = api.example.hello.useQuery({ text: "from tRPC" });

  const { user } = sessionData ?? {};

  return (
    <div className="pt-16">
      <div>{helloData ? helloData.greeting : "loading..."} </div>
      <div>name: {user?.name}</div>
      <div>email: {user?.email}</div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const session = await getServerSession(context.req, context.res, authOptions);

  const ssg = ssgHelper();

  await ssg.example.getSecretMessage.prefetch();
  await ssg.example.hello.prefetch({ text: "from tRPC" });

  return {
    props: {
      session,
      trpcState: ssg.dehydrate(),
    },
  };
}

export default Profile;

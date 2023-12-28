import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import ServerInfo from "@/app/components/server/ServerInfo";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    serverId: string;
  };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const data = await api.server.getServer.query({ serverId: params.serverId });

  if (!data) {
    return redirect("/");
  }

  return (
    <DefaultLayout>
      <ServerInfo data={data} />
    </DefaultLayout>
  );
}

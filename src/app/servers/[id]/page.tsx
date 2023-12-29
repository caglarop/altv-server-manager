import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import ServerInfo from "@/app/components/server/ServerInfo";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return redirect("/");
  }

  const data = await api.server.getServer.query({ id: params.id });

  if (!data || data.id !== params.id) {
    return redirect("/");
  }

  return (
    <DefaultLayout>
      <ServerInfo data={data} />
    </DefaultLayout>
  );
}

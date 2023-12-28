import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import ServerInfo from "@/app/components/server/ServerInfo";
import { getServerAuthSession } from "@/server/auth";

export default async function Page({
  params,
}: {
  params: { serverId: string };
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return;
  }

  return (
    <DefaultLayout>
      <ServerInfo serverId={params.serverId} />
    </DefaultLayout>
  );
}

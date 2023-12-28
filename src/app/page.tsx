import { getServerAuthSession } from "@/server/auth";
import NotSignedIn from "./_components/mixed/auth/NotSignedIn";
import DefaultLayout from "./_components/layouts/DefaultLayout";

export default async function AdminPanel() {
  const session = await getServerAuthSession();

  if (!session) {
    return <NotSignedIn />;
  }

  return <DefaultLayout>Main</DefaultLayout>;
}

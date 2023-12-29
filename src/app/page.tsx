import { getServerAuthSession } from "@/server/auth";
import NotSignedIn from "./components/mixed/auth/NotSignedIn";
import DefaultLayout from "./components/layouts/DefaultLayout";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) {
    return <NotSignedIn />;
  }

  return <DefaultLayout>Here you can manage your servers.</DefaultLayout>;
}

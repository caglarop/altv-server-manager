"use client";

import { useAppStore } from "@/store/AppStore";
import { api } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { setServers } = useAppStore();

  const servers = api.server.getAll.useQuery().data;

  useEffect(() => {
    if (!servers) {
      setServers([]);

      return;
    }

    setServers(servers);
  }, [servers]);

  return <SessionProvider>{children}</SessionProvider>;
}

"use client";

import type { AltVServer } from "@/lib/altv/types";
import { useAppStore } from "@/store/AppStore";
import { api } from "@/trpc/react";
import type { Server } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { useEffect } from "react";

export function ServerList() {
  const servers = api.server.getAll.useQuery();

  const checkStatus = api.server.checkStatus.useMutation();

  const { serverInfos, setServerInfos } = useAppStore();

  useEffect(() => {
    if (servers.data) {
      servers.data.forEach(async (server: Server) => {
        const serverInfo = await checkStatus
          .mutateAsync({ serverId: server.id })
          .catch(console.error);

        const newServerInfos = {
          ...serverInfos,
          [server.id]: serverInfo,
        };

        setServerInfos(newServerInfos as Record<string, AltVServer>);
      });
    }
  }, [servers.data]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xs font-semibold text-gray-500">MY SERVERS</h2>
      <ul className="flex flex-col gap-2.5">
        {servers.data?.map((server: Server) => (
          <li key={server.id}>
            <Link
              className="flex cursor-pointer items-center gap-2 rounded text-gray-400 transition hover:text-white"
              href={`/servers/${server.id}`}
            >
              <div
                className={clsx(
                  "flex h-2 w-2 animate-pulse items-center justify-center rounded-full",
                  serverInfos[server.id]?.available
                    ? "bg-green-500"
                    : "bg-red-500",
                )}
              ></div>
              <span>{server.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

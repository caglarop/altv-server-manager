"use client";

import { useAppStore } from "@/store/AppStore";
import type { Server } from "@prisma/client";
import { useEffect } from "react";

export default function ServerInfo({ data }: { data: Server }) {
  const { serverInfos } = useAppStore();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!serverInfos[data.id]) {
    return (
      <>
        <div className="mb-2">Server #{data.id}</div>
        <h2 className="text-xl">Could not find server info!</h2>
      </>
    );
  }

  return (
    <>
      <div className="mb-2">Server #{data.id}</div>
      <h2 className="text-xl">{serverInfos[data.id]?.name}</h2>
    </>
  );
}

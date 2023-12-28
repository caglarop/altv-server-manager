"use client";

import { useEffect } from "react";

export default function ServerInfo(params: { serverId: string }) {
  useEffect(() => {
    console.log(params);
  }, [params]);

  return <>Server #{params.serverId}</>;
}

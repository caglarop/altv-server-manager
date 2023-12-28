"use client";

import type { Server } from "@prisma/client";
import { useEffect } from "react";

export default function ServerInfo({ data }: { data: Server }) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return <>Server #{data.id}</>;
}

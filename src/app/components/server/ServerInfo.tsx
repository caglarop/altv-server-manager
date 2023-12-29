"use client";

import type { Server } from "@prisma/client";
import { useEffect } from "react";

export default function ServerInfo({ data }: { data: Server }) {
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="mb-2">Server #{data.id}</div>
      <h2 className="text-xl"></h2>
    </>
  );
}

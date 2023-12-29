"use client";

import type { Server } from "@prisma/client";
import { Box, Tabs, Text } from "@radix-ui/themes";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function ServerInfo({ data }: { data: Server }) {
  const [tab, setTab] = useState("server");

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="mb-5 text-2xl">Server #{data.name}</div>

      <div className="flex items-end">
        <button
          onClick={() => setTab("server")}
          className={clsx(
            "border-b-2 px-5 pb-2 font-medium transition duration-300 hover:border-primary",
            tab === "server" ? "border-primary" : "border-transparent",
          )}
        >
          <span>Server</span>
        </button>
        <button
          onClick={() => setTab("settings")}
          className={clsx(
            "border-b-2 px-5 pb-2 font-medium transition duration-300 hover:border-primary",
            tab === "settings" ? "border-primary" : "border-transparent",
          )}
        >
          <span>Settings</span>
        </button>
      </div>

      <div className="my-5 rounded border border-white/10 p-5">
        {tab === "server" && <div>Coming soon!</div>}
        {tab === "settings" && <div>Settings coming soon!</div>}
      </div>
    </>
  );
}

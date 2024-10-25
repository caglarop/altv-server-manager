"use client";

import type { Server } from "@prisma/client";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Button from "../button/Button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function ServerInfo({ data }: { data: Server }) {
  const [tab, setTab] = useState("server");
  const router = useRouter();

  const control = api.server.controlServer.useMutation({
    onSuccess: async (res) => {
      alert(JSON.stringify(res));
    },
  });

  const deleteServer = api.server.deleteServer.useMutation({
    onSuccess: () => {
      router.push("/");
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (!data) {
    return null;
  }

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
        {tab === "server" && (
          <div className="flex items-center gap-4">
            <Button
              onClick={() => control.mutate({ action: "start", id: data.id })}
            >
              Start
            </Button>

            <Button
              onClick={() => control.mutate({ action: "stop", id: data.id })}
            >
              Stop
            </Button>

            <Button
              onClick={() => control.mutate({ action: "restart", id: data.id })}
            >
              Restart
            </Button>
          </div>
        )}
        {tab === "settings" && (
          <div>
            <Button
              className="mt-4 bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (confirm("Are you sure you want to delete this server?")) {
                  deleteServer.mutate({ id: data.id });
                }
              }}
            >
              Delete Server
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

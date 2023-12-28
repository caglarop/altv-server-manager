"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function CreateServer() {
  const servers = api.server.getAll.useQuery();

  const [name, setName] = useState("");
  const [serverId, setServerId] = useState("");

  const create = api.server.create.useMutation({
    onSuccess: async () => {
      await servers.refetch();

      setName("");
      setServerId("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        create.mutate({ name, serverId });
      }}
      className="flex flex-col gap-2"
    >
      <h2 className="text-xs font-semibold text-gray-500">CREATE SERVER</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded px-4 py-2 text-black outline-none ring-0"
      />

      <input
        type="text"
        placeholder="Server ID"
        value={serverId}
        onChange={(e) => setServerId(e.target.value)}
        className="w-full rounded px-4 py-2 text-black outline-none ring-0"
      />

      <button
        type="submit"
        className="rounded bg-white/10 px-10 py-3 font-semibold transition hover:bg-primary hover:text-[#0d0d0d]"
        disabled={create.isLoading}
      >
        {create.isLoading ? "Creating..." : "Create"}
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";

import { api } from "@/trpc/react";
import Input from "../input/Input";
import Button from "../button/Button";

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
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Server ID"
        value={serverId}
        onChange={(e) => setServerId(e.target.value)}
      />

      <Button disabled={create.isLoading}>
        {create.isLoading ? "Creating..." : "Create"}
      </Button>
    </form>
  );
}

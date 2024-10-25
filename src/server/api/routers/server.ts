import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Server } from "@prisma/client";
import { installAltVServer } from "@/utils/altv/server";
import { db } from "@/server/db";

export async function findAvailablePort() {
  const existingPorts = await db.server.findMany({
    select: { port: true },
  });

  const usedPorts = new Set(existingPorts.map((server) => server.port));

  let port = 7788;

  while (usedPorts.has(port)) {
    port++;
  }

  return port;
}

export const serverRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }): Promise<Server> => {
      const servers = await ctx.db.server.findMany({
        where: { createdBy: { id: ctx.session.user.id } },
      });

      if (servers.length >= 5) {
        throw new Error("REACHED_SERVER_LIMIT");
      }

      const port = await findAvailablePort();

      if (!port) {
        throw new Error("NO_AVAILABLE_PORT");
      }

      const server = await ctx.db.server.create({
        data: {
          name: input.name,
          isInstalled: false,
          port,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      installAltVServer(server.id).catch(console.error);

      return server;
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const servers = await ctx.db.server.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });

    return servers;
  }),

  getServer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const server = await ctx.db.server.findUnique({
        where: { id: input.id },
      });

      if (!server) {
        throw new Error("SERVER_NOT_FOUND");
      }

      if (server.createdById !== ctx.session.user.id) {
        throw new Error("SERVER_NOT_FOUND");
      }

      return server;
    }),

  controlServer: protectedProcedure
    .input(z.object({ id: z.string(), action: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const server = await ctx.db.server.findUnique({
        where: { id: input.id },
      });

      if (!server || server.createdById !== ctx.session.user.id) {
        throw new Error("SERVER_NOT_FOUND");
      }

      if (!server.isInstalled) {
        throw new Error("SERVER_NOT_INSTALLED");
      }

      if (input.action === "start") {
        console.log(`Starting server ${server.id}...`);
      } else if (input.action === "stop") {
        console.log(`Stopping server ${server.id}...`);
      } else if (input.action === "restart") {
        console.log(`Restarting server ${server.id}...`);
      } else {
        throw new Error("INVALID_ACTION");
      }

      return server;
    }),

  deleteServer: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const server = await ctx.db.server.findUnique({
        where: { id: input.id },
      });

      if (!server) {
        throw new Error("SERVER_NOT_FOUND");
      }

      if (server.createdById !== ctx.session.user.id) {
        throw new Error("UNAUTHORIZED");
      }

      await ctx.db.server.delete({
        where: { id: input.id },
      });

      return { success: true, message: "SUCCESSFULLY" };
    }),
});

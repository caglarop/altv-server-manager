import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Server } from "@prisma/client";
import { getServerByServerId } from "@/lib/altv/altv";
import { installAltVServer } from "@/utils/altv/server";

export const serverRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1), serverId: z.string().min(1) }))
    .mutation(async ({ ctx, input }): Promise<Server> => {
      const servers = await ctx.db.server.findMany({
        where: { createdBy: { id: ctx.session.user.id } },
      });

      if (servers.length >= 5) {
        throw new Error("REACHED_SERVER_LIMIT");
      }

      const server = await ctx.db.server.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      installAltVServer(server.id).catch(console.error);

      return server;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.server.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getServer: protectedProcedure
    .input(z.object({ serverId: z.string() }))
    .query(async ({ ctx, input }) => {
      const server = await ctx.db.server.findUnique({
        where: { id: input.serverId },
      });

      if (!server) {
        throw new Error("SERVER_NOT_FOUND");
      }

      if (server.createdById !== ctx.session.user.id) {
        throw new Error("SERVER_NOT_FOUND");
      }

      return server;
    }),

  checkStatus: protectedProcedure
    .input(z.object({ serverId: z.string() }))
    .mutation(async ({ ctx, input }): Promise<boolean> => {
      const server = await ctx.db.server.findUnique({
        where: { id: input.serverId },
      });

      if (!server) {
        throw new Error("SERVER_NOT_FOUND");
      }

      if (!server.serverId) {
        throw new Error("SERVER_NOT_CONFIGURED");
      }

      const data = await getServerByServerId(`${server.serverId}`);

      if (!data) {
        throw new Error("SERVER_NOT_FOUND");
      }

      return data;
    }),
});

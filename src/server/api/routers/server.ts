import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { Server } from "@prisma/client";

export const serverRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }): Promise<Server> => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const server = await ctx.db.server.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      return server;
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.server.findMany({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});

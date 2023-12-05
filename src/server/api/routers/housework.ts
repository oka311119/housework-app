import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const houseWorkRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.db.houseWork.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        span: z.number(),
        icon: z.string().nullable(),
        parentId: z.string().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const houseWork = await ctx.db.houseWork.create({
        data: {
          name: input.name,
          span: input.span,
          isActive: true,
          icon: input.icon,
          parent: input.parentId,
        },
      });
      await ctx.db.schedule.create({
        data: {
          date: new Date(),
          houseWorkId: houseWork.id,
        },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }): Promise<void> => {
      await ctx.db.schedule.deleteMany({
        where: { houseWorkId: input.id },
      });
      await ctx.db.houseWork.delete({
        where: { id: input.id },
      });
    }),
});

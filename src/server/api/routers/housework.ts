import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const houseWorkRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    console.log("will call");
    return ctx.db.houseWork.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        span: z.number().min(1),
        icon: z.string().optional().nullable(),
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

      if (houseWork.parent === "") {
        console.log("empty in prisma!!!!!");
        return;
      }
      await ctx.db.schedule.create({
        data: {
          date: new Date(),
          houseWorkId: houseWork.id,
        },
      });
    }),
  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().nullable(),
        span: z.number().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }): Promise<void> => {
      const data: { name?: string; span?: number } = {};
      if (input.name !== null) {
        data.name = input.name;
      }
      if (input.span !== null) {
        data.span = input.span;
      }
      await ctx.db.houseWork.update({
        where: { id: input.id },
        data: data,
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }): Promise<void> => {
      // 子houseWorkのIDを取得
      const childHouseWorks = await ctx.db.houseWork.findMany({
        where: { parent: input.id },
      });
      const childHouseWorkIds = childHouseWorks.map(
        (houseWork) => houseWork.id,
      );

      // 子houseWorkと指定したhouseWorkに対応するscheduleを一括で削除
      await ctx.db.schedule.deleteMany({
        where: { houseWorkId: { in: [...childHouseWorkIds, input.id] } },
      });

      // 子houseWorkと指定したhouseWorkを一括で削除
      await ctx.db.houseWork.deleteMany({
        where: { id: { in: [...childHouseWorkIds, input.id] } },
      });
    }),
});

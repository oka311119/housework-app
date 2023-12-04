import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getSchedules: publicProcedure.query(async ({ ctx }) => {
    const schedules = await ctx.db.schedule.findMany({
      where: {
        houseWork: {
          isActive: true,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
      include: {
        houseWork: true,
      },
    });
    return schedules;
  }),
  getHouseWorks: publicProcedure.query(({ ctx }) => {
    return ctx.db.houseWork.findMany();
  }),
  createNewHouseWork: publicProcedure
    .input(
      z.object({
        name: z.string(),
        span: z.number(),
        icon: z.string(),
        parentId: z.string(),
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
      const newSchedule = await ctx.db.schedule.create({
        data: {
          date: new Date(),
          houseWorkId: houseWork.id,
        },
      });
    }),
  createNextHouseWork: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }): Promise<void> => {
      const schedule = await ctx.db.schedule.findUnique({
        where: { id: input.id },
        include: { houseWork: true },
      });

      if (!schedule) {
        return;
      }

      const newDate = new Date();
      newDate.setDate(newDate.getDate() + schedule.houseWork.span);

      const newSchedule = await ctx.db.schedule.create({
        data: {
          date: newDate,
          houseWorkId: schedule.houseWorkId,
        },
      });

      const relatedHouseWorks = await ctx.db.houseWork.findMany({
        where: { parent: schedule.houseWorkId },
      });

      for (const houseWork of relatedHouseWorks) {
        const newDateForRelated = new Date();
        newDateForRelated.setDate(newDateForRelated.getDate() + houseWork.span);

        await ctx.db.schedule.create({
          data: {
            date: newDateForRelated,
            houseWorkId: houseWork.id,
          },
        });
      }
    }),
  deleteHouseWork: publicProcedure
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

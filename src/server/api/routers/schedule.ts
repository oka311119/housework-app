import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const scheduleRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    const schedules = await ctx.db.schedule.findMany({
      where: {
        houseWork: {
          isActive: true,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        houseWork: true,
      },
    });
    return schedules;
  }),
  pendingAll: publicProcedure.query(async ({ ctx }) => {
    const schedules = await ctx.db.schedule.findMany({
      where: {
        houseWork: {
          isActive: true,
        },
        doneDate: null,
      },
      orderBy: {
        date: "asc",
      },
      include: {
        houseWork: true,
      },
    });
    return schedules;
  }),
  createNext: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }): Promise<void> => {
      // 完了日時を設定
      await ctx.db.schedule.update({
        where: { id: input.id },
        data: { doneDate: new Date() },
      });

      const schedule = await ctx.db.schedule.findUnique({
        where: { id: input.id },
        include: { houseWork: true },
      });

      if (!schedule) {
        throw new Error("Schedule not found");
      }

      const newSchedules = [];

      const current = new Date();
      const scheduled = schedule.date;
      const nextScheduleDate = scheduled > current ? scheduled : current;

      // メインのスケジュールを追加
      newSchedules.push({
        date: calculateNewDate(nextScheduleDate, schedule.houseWork.span),
        houseWorkId: schedule.houseWorkId,
      });

      // 関連するhouseWorkのスケジュールを追加
      const relatedHouseWorks = await ctx.db.houseWork.findMany({
        where: { parent: schedule.houseWorkId },
      });
      relatedHouseWorks.forEach((houseWork) => {
        newSchedules.push({
          date: calculateNewDate(nextScheduleDate, houseWork.span),
          houseWorkId: houseWork.id,
        });
      });

      // 新しいスケジュールをデータベースに一括挿入
      await ctx.db.schedule.createMany({
        data: newSchedules,
      });
    }),
});

function calculateNewDate(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}

import { houseWorkRouter } from "~/server/api/routers/housework";
import { scheduleRouter } from "~/server/api/routers/schedule";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  houseWork: houseWorkRouter,
  schedule: scheduleRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

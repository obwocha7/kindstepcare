import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission, importPendingNews, listApprovedNews, listPublishedContent } from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  content: router({
    published: publicProcedure.query(() => listPublishedContent()),
  }),
  news: router({
    approved: publicProcedure.query(() => listApprovedNews()),
    importPending: protectedProcedure.input(z.object({ items: z.array(z.object({ sourceName: z.string(), sourceUrl: z.string().url(), title: z.string().min(3), summary: z.string().min(10), imageUrl: z.string().url().optional() })) })).mutation(({ ctx, input }) => { if (ctx.user.role !== "admin") throw new Error("Admin access required"); return importPendingNews(input.items); }),
  }),
  contact: router({
    submit: publicProcedure.input(z.object({ name: z.string().min(2), email: z.string().email(), audience: z.string().min(2), message: z.string().min(10) })).mutation(({ input }) => createContactSubmission(input)),
  }),
});

export type AppRouter = typeof appRouter;

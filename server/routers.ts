import { COOKIE_NAME } from "@shared/const";
import { parse as parseCookie } from "cookie";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createContactSubmission, createContentItem, importPendingNews, listAllContent, listApprovedNews, listModerationNews, listPublishedContent, setNewsStatus, updateContentItem } from "./db";
import { importNewsFromFeed } from "./newsImport";
import { createHeartbeatJob } from "./_core/heartbeat";

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
    manage: adminProcedure.query(() => listAllContent()),
    create: adminProcedure.input(z.object({ slug: z.string().min(3), title: z.string().min(3), content: z.string().min(10), category: z.string().min(2), imageUrl: z.string().url().optional(), published: z.number().int().min(0).max(1).optional() })).mutation(({ input }) => createContentItem(input)),
    update: adminProcedure.input(z.object({ id: z.number().int(), slug: z.string().min(3), title: z.string().min(3), content: z.string().min(10), category: z.string().min(2), imageUrl: z.string().url().optional(), published: z.number().int().min(0).max(1).optional() })).mutation(({ input: { id, ...values } }) => updateContentItem(id, values)),
  }),
  news: router({
    approved: publicProcedure.query(() => listApprovedNews()),
    importPending: adminProcedure.input(z.object({ items: z.array(z.object({ sourceName: z.string(), sourceUrl: z.string().url(), title: z.string().min(3), summary: z.string().min(10), imageUrl: z.string().url().optional() })) })).mutation(({ input }) => importPendingNews(input.items)),
    moderation: adminProcedure.query(() => listModerationNews()),
    setStatus: adminProcedure.input(z.object({ id: z.number().int(), status: z.enum(["approved", "rejected", "pending"]) })).mutation(({ input }) => setNewsStatus(input.id, input.status)),
    importFeed: adminProcedure.input(z.object({ feedUrl: z.string().url(), sourceName: z.string().min(3) })).mutation(({ input }) => importNewsFromFeed(input.feedUrl, input.sourceName)),
    provisionRefresh: adminProcedure.mutation(async ({ ctx }) => { const session = parseCookie(ctx.req.headers.cookie ?? "")[COOKIE_NAME] ?? ""; return createHeartbeatJob({ name: "kindstepcare-news-refresh", cron: "0 0 */6 * * *", path: "/api/scheduled/news-refresh", description: "Refresh trusted cerebral palsy news feeds into moderation every six hours" }, session); }),
  }),
  contact: router({
    submit: publicProcedure.input(z.object({ name: z.string().min(2), email: z.string().email(), audience: z.string().min(2), message: z.string().min(10) })).mutation(({ input }) => createContactSubmission(input)),
  }),
});

export type AppRouter = typeof appRouter;

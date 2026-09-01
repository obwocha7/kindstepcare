import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";

vi.mock("./db", () => ({
  listPublishedContent: vi.fn(async () => [{ id: 1, slug: "care-note", title: "Care note", content: "A note", category: "learning", imageUrl: null, published: 1 }]),
  listApprovedNews: vi.fn(async () => [{ id: 1, sourceName: "CPARF", sourceUrl: "https://cparf.org/", title: "Research update", summary: "A verified update", imageUrl: null, status: "approved", publishedAt: new Date(), createdAt: new Date() }]),
  createContactSubmission: vi.fn(async () => ({ success: true })),
}));

describe("KindStepCare public content", () => {
  const caller = appRouter.createCaller({} as never);
  it("returns approved news and published content", async () => {
    await expect(caller.news.approved()).resolves.toHaveLength(1);
    await expect(caller.content.published()).resolves.toHaveLength(1);
  });
  it("accepts a valid contact submission", async () => {
    await expect(caller.contact.submit({ name: "Amina", email: "amina@example.com", audience: "Potential donor", message: "I would like to learn about supporting the course." })).resolves.toEqual({ success: true });
  });
  it("rejects incomplete contact submissions", async () => {
    await expect(caller.contact.submit({ name: "A", email: "not-an-email", audience: "", message: "short" })).rejects.toThrow();
  });
});

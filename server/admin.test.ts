import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { createContentItem, setNewsStatus, updateContentItem } from "./db";

vi.mock("./db", () => ({
  listPublishedContent: vi.fn(async () => []),
  listAllContent: vi.fn(async () => []),
  createContentItem: vi.fn(async () => ({ success: true })),
  updateContentItem: vi.fn(async () => ({ success: true })),
  listApprovedNews: vi.fn(async () => []),
  listModerationNews: vi.fn(async () => [{ id: 7, status: "pending" }]),
  setNewsStatus: vi.fn(async () => ({ success: true })),
  createContactSubmission: vi.fn(async () => ({ success: false })),
  importPendingNews: vi.fn(async () => ({ success: true, imported: 1 })),
  getUserByOpenId: vi.fn(),
}));
vi.mock("./newsImport", () => ({ importNewsFromFeed: vi.fn(async () => ({ success: true, imported: 1 })) }));
vi.mock("./_core/heartbeat", () => ({ createHeartbeatJob: vi.fn(async () => ({ taskUid: "task_1" })) }));

const adminContext = { req: { headers: { cookie: "" } }, res: {}, user: { id: 1, role: "admin" } } as never;
const anonymousContext = { req: { headers: {} }, res: {}, user: null } as never;

describe("KindStepCare admin workflows", () => {
  it("rejects admin-only content access for anonymous callers", async () => {
    await expect(appRouter.createCaller(anonymousContext).content.manage()).rejects.toThrow();
  });
  it("supports content updates and moderation changes", async () => {
    const caller = appRouter.createCaller(adminContext);
    await expect(caller.content.update({ id: 1, slug: "support", title: "Support", content: "A useful support note for caregivers.", category: "learning", published: 1 })).resolves.toEqual({ success: true });
    await expect(caller.news.setStatus({ id: 7, status: "approved" })).resolves.toEqual({ success: true });
  });
  it("surfaces a persistence failure instead of claiming contact success", async () => {
    await expect(appRouter.createCaller(adminContext).contact.submit({ name: "Amina", email: "amina@example.com", audience: "Potential donor", message: "I would like to support the course." })).resolves.toEqual({ success: false });
  });
  it("preserves create and update failure results", async () => {
    vi.mocked(createContentItem).mockResolvedValueOnce({ success: false });
    vi.mocked(updateContentItem).mockResolvedValueOnce({ success: false });
    const caller = appRouter.createCaller(adminContext);
    await expect(caller.content.create({ slug: "new-note", title: "New note", content: "A note with enough detail.", category: "learning" })).resolves.toEqual({ success: false });
    await expect(caller.content.update({ id: 1, slug: "old-note", title: "Updated note", content: "An updated note with enough detail.", category: "learning" })).resolves.toEqual({ success: false });
  });
  it("surfaces moderation persistence failures", async () => {
    vi.mocked(setNewsStatus).mockResolvedValueOnce({ success: false });
    await expect(appRouter.createCaller(adminContext).news.setStatus({ id: 7, status: "rejected" })).resolves.toEqual({ success: false });
  });
});

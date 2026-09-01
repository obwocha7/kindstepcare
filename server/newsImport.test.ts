import { describe, expect, it, vi } from "vitest";
import { importNewsFromFeed } from "./newsImport";

const { importPendingNews } = vi.hoisted(() => ({ importPendingNews: vi.fn(async (items: unknown[]) => ({ success: true, imported: items.length })) }));
vi.mock("./db", () => ({ importPendingNews }));

describe("trusted news feed importer", () => {
  it("normalizes RSS items into pending records", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`<?xml version="1.0"?><rss><channel><item><title>Research update</title><link>https://example.org/update</link><description><![CDATA[New caregiver learning resources are available.]]></description></item></channel></rss>`)));
    await expect(importNewsFromFeed("https://example.org/feed.xml", "Trusted source")).resolves.toEqual({ success: true, imported: 1 });
    expect(importPendingNews).toHaveBeenCalledWith([{ sourceName: "Trusted source", sourceUrl: "https://example.org/update", title: "Research update", summary: "New caregiver learning resources are available." }]);
  });
  it("filters items without meaningful summaries", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`<rss><channel><item><title>Headline only</title><link>https://example.org/item</link><description>short</description></item></channel></rss>`)));
    await expect(importNewsFromFeed("https://example.org/feed.xml", "Trusted source")).resolves.toEqual({ success: true, imported: 0 });
  });
  it("surfaces a non-OK feed response", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("unavailable", { status: 503 })));
    await expect(importNewsFromFeed("https://example.org/feed.xml", "Trusted source")).rejects.toThrow("Feed returned 503");
  });
  it("returns persistence failure from the pending queue", async () => {
    vi.mocked(importPendingNews).mockResolvedValueOnce({ success: false, imported: 0 });
    vi.stubGlobal("fetch", vi.fn(async () => new Response(`<rss><channel><item><title>Research update</title><link>https://example.org/update</link><description>New caregiver learning resources are available.</description></item></channel></rss>`)));
    await expect(importNewsFromFeed("https://example.org/feed.xml", "Trusted source")).resolves.toEqual({ success: false, imported: 0 });
  });
});

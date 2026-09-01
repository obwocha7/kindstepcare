import { describe, expect, it } from "vitest";
import { seoSnapshot } from "../client/src/components/Seo";
import { articleViewModel, selectRelatedStories } from "../client/src/pages/EditorialPages";

describe("KindStepCare SEO and editorial helpers", () => {
  it("builds canonical and social metadata from a route", () => {
    expect(seoSnapshot({ title: "Cerebral palsy care in Kenya", description: "Practical caregiver learning.", path: "/care", type: "website" })).toEqual({ title: "Cerebral palsy care in Kenya", description: "Practical caregiver learning.", canonical: "https://kindstepcare.manus.space/care", image: "https://kindstepcare.manus.space/manus-storage/therapy-home_e99ff27b.jpg", type: "website", robots: "index,follow" });
  });
  it("keeps article source attribution and related stories together", () => {
    const items = [{ id: 1, title: "Kenya care update", sourceName: "Kenya · recent coverage", sourceUrl: "https://example.com/kenya", summary: "A source summary." }, { id: 2, title: "Africa care update", sourceName: "Africa · recent coverage", sourceUrl: "https://example.com/africa", summary: "Another source summary." }];
    expect(articleViewModel(items[0], items)).toMatchObject({ sourceLabel: "Kenya · recent coverage", sourceUrl: "https://example.com/kenya", related: [{ id: 2 }] });
  });
  it("excludes the current article and limits related stories", () => {
    expect(selectRelatedStories([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }], 2, 2)).toEqual([{ id: 1 }, { id: 3 }]);
  });
});

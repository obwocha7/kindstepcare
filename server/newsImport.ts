import { importPendingNews } from "./db";

const stripMarkup = (value: string) => value.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
const tagValue = (block: string, tag: string) => {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, "i"));
  return match?.[1]?.trim() ?? "";
};
const imageValue = (block: string) => {
  const enclosure = block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)?.[1];
  const media = block.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1];
  return enclosure || media;
};

export const trustedNewsFeeds = [
  { url: "https://news.google.com/rss/search?q=cerebral+palsy+Kenya&hl=en-KE&gl=KE&ceid=KE:en", sourceName: "Kenya · recent coverage" },
  { url: "https://news.google.com/rss/search?q=cerebral+palsy+Africa&hl=en&gl=ZA&ceid=ZA:en", sourceName: "Africa · recent coverage" },
  { url: "https://news.google.com/rss/search?q=cerebral+palsy&hl=en&gl=US&ceid=US:en", sourceName: "Global · recent coverage" },
];

export async function importTrustedNews() {
  let imported = 0;
  for (const feed of trustedNewsFeeds) {
    try { const result = await importNewsFromFeed(feed.url, feed.sourceName); if (result.success) imported += result.imported; }
    catch (error) { console.warn(`Trusted feed skipped: ${feed.sourceName}`, error); }
  }
  return { success: true, imported };
}

export async function importNewsFromFeed(feedUrl: string, sourceName: string) {
  const response = await fetch(feedUrl, { headers: { Accept: "application/rss+xml, application/atom+xml, text/xml" } });
  if (!response.ok) throw new Error(`Feed returned ${response.status}`);
  const xml = await response.text();
  const blocks = Array.from(xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)).map((match) => match[1]);
  const items = blocks.slice(0, 10).map((block) => ({
    sourceName,
    sourceUrl: tagValue(block, "link") || feedUrl,
    title: stripMarkup(tagValue(block, "title")),
    summary: stripMarkup(tagValue(block, "description") || tagValue(block, "content:encoded")).slice(0, 900),
    imageUrl: imageValue(block),
  })).filter((item) => item.title.length >= 3 && item.summary.length >= 10);
  return importPendingNews(items);
}

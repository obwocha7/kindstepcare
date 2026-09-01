import { useEffect } from "react";

type SeoProps = { title: string; description: string; path?: string; image?: string; type?: "website" | "article" };

export function seoSnapshot({ title, description, path = "", image = "/manus-storage/therapy-home_e99ff27b.jpg", type = "website" }: SeoProps, origin = "https://kindstepcare.manus.space") { return { title, description, canonical: `${origin}${path}`, image: `${origin}${image}`, type, robots: "index,follow" }; }

export default function Seo({ title, description, path = "", image = "/manus-storage/therapy-home_e99ff27b.jpg", type = "website" }: SeoProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const canonical = `${origin}${path}`;
    document.title = title;
    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) { tag = document.createElement("meta"); if (property) tag.setAttribute("property", name); else tag.setAttribute("name", name); document.head.appendChild(tag); }
      tag.content = content;
    };
    setMeta("description", description);
    setMeta("robots", "index,follow");
    setMeta("og:title", title, true); setMeta("og:description", description, true); setMeta("og:url", canonical, true); setMeta("og:type", type, true); setMeta("og:image", `${origin}${image}`, true);
    setMeta("twitter:card", "summary_large_image"); setMeta("twitter:title", title); setMeta("twitter:description", description); setMeta("twitter:image", `${origin}${image}`);
    let link = document.head.querySelector("link[rel=canonical]") as HTMLLinkElement | null;
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = canonical;
  }, [title, description, path, image, type]);
  return null;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) { return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />; }

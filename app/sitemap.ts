import type { MetadataRoute } from "next";
import { mainNav } from "@/content/site";
import { absUrl } from "@/lib/url";
import { articles } from "@/content/resources";
import { services } from "@/content/services";
import { artists } from "@/content";
import { pageLastModified, serviceLastModified } from "@/content/lastmod";

export const dynamic = "force-static";

type Entry = MetadataRoute.Sitemap[number];

/**
 * One sitemap is enough (≈40 URLs; a sitemap index only becomes worthwhile beyond a few thousand URLs or several content types
 * that are managed separately). Every entry uses the canonical, trailing-slash URL on the production origin, and lastmod
 * comes from content/lastmod.ts or the record itself — never from the build date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (path: string, priority: number, lastmod?: string, images?: string[]): Entry => ({
    url: absUrl(path),
    ...(lastmod && { lastModified: lastmod }),
    changeFrequency: "monthly",
    priority,
    ...(images && images.length > 0 && { images }),
  });

  const artistImages = artists.filter((a) => a.profileImage).map((a) => absUrl(a.profileImage!).replace(/\/$/, ""));

  return [
    ...mainNav.map((n) => entry(n.href, n.href === "/" ? 1 : 0.8, pageLastModified[n.href === "/" ? "/" : n.href], n.href === "/artists" ? artistImages : undefined)),
    ...services
      .filter((s) => s.href.startsWith("/services/"))
      .map((s) => entry(s.href, 0.8, serviceLastModified.overrides[s.slug] ?? serviceLastModified.default)),
    entry("/resources", 0.7, pageLastModified["/resources"]),
    ...articles.map((a) => entry(`/resources/${a.slug}`, 0.6, a.updated)),
  ];
}

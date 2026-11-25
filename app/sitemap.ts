import type { MetadataRoute } from "next";
import { mainNav } from "@/content/site";
import { absUrl } from "@/lib/url";
import { articles } from "@/content/resources";
import { services } from "@/content/services";
import { projects } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, lastModified: Date = now): MetadataRoute.Sitemap[number] => ({ url: absUrl(path), lastModified, changeFrequency: "monthly", priority });
  return [
    ...mainNav.map((n) => entry(n.href, n.href === "/" ? 1 : 0.8)),
    ...services.filter((s) => s.href.startsWith("/services/")).map((s) => entry(s.href, 0.7)),
    ...projects.map((p) => entry(`/portfolio/${p.slug}`, 0.6)),
    entry("/resources", 0.7),
    ...articles.map((a) => entry(`/resources/${a.slug}`, 0.6, new Date(a.updated))),
  ];
}

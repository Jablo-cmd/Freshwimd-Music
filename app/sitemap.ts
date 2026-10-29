import type { MetadataRoute } from "next";
import { site, mainNav } from "@/content/site";
import { services } from "@/content/services";
import { artists, projects } from "@/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({ url: `${site.url}${path === "/" ? "" : path}${path !== "/" && process.env.STATIC_EXPORT === "1" ? "/" : ""}`, lastModified: now, changeFrequency: "monthly", priority });
  return [
    ...mainNav.map((n) => entry(n.href, n.href === "/" ? 1 : 0.8)),
    ...services.filter((s) => s.href.startsWith("/services/")).map((s) => entry(s.href, 0.7)),
    ...artists.map((a) => entry(`/artists/${a.slug}`, 0.6)),
    ...projects.map((p) => entry(`/portfolio/${p.slug}`, 0.6)),
  ];
}

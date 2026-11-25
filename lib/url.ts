import { site } from "@/content/site";

/**
 * Absolute URL for a site path. Reads the origin from content/site.ts (NEXT_PUBLIC_SITE_URL).
 * Trailing-slash policy: the static export serves every page as a directory, so every canonical URL, sitemap entry,
 * Open Graph URL and structured-data URL ends in "/" — including the homepage (`https://origin/`).
 */
export function absUrl(path: string = "/") {
  const p = path.startsWith("/") ? path : `/${path}`;
  if (p === "/") return `${site.url}/`;
  return `${site.url}${process.env.STATIC_EXPORT === "1" && !p.endsWith("/") ? `${p}/` : p}`;
}

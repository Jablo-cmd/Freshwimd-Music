import { site } from "@/content/site";

/**
 * Absolute URL for a site path. The static export serves directories with a trailing slash, so canonical URLs,
 * sitemap entries and structured data must use the same form. Reads the domain from content/site.ts (NEXT_PUBLIC_SITE_URL).
 */
export function absUrl(path: string) {
  if (path === "/" || path === "") return site.url;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${site.url}${process.env.STATIC_EXPORT === "1" && !p.endsWith("/") ? `${p}/` : p}`;
}

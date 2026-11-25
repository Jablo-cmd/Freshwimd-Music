/**
 * Real last-modified dates for the XML sitemap (ISO yyyy-mm-dd).
 *
 * These are NOT generated at build time: a sitemap that stamps every page with today's date tells search engines nothing.
 * Update a page's date here only when its content meaningfully changes. Guides use their own `updated` field
 * (content/resources.ts); portfolio entries can add `updated` to their record. A page missing from this map is listed
 * WITHOUT a lastmod rather than with a made-up one.
 */
export const pageLastModified: Record<string, string> = {
  "/": "2026-11-25",
  "/services": "2026-11-23",
  "/portfolio": "2026-11-19",
  "/artists": "2026-11-25",
  "/studio": "2026-11-23",
  "/music-lessons": "2026-11-19",
  "/recommended-equipment": "2026-11-19",
  "/contact": "2026-11-23",
  "/resources": "2026-11-25",
};

/** Service pages were last rewritten in the 23 Nov 2026 restructure; override individual slugs below when they change. */
export const serviceLastModified: { default: string; overrides: Record<string, string> } = {
  default: "2026-11-23",
  overrides: {},
};

import type { Metadata } from "next";
import { site } from "@/content/site";
import { absUrl } from "@/lib/url";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
  /** Open Graph type: guides use "article" with published / modified times */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Unique title, description, canonical URL, robots, hreflang, Open Graph and Twitter metadata for a page.
 * The site is a single-language (en-ZA) site: hreflang carries a self-reference plus x-default so that adding other
 * languages or regions later does not require reworking every page.
 */
export function pageMetadata({ title, description, path, image = "/og-image.jpg", noIndex, type = "website", publishedTime, modifiedTime }: PageMeta): Metadata {
  const url = absUrl(path);
  return {
    title,
    description,
    alternates: { canonical: path, languages: { "en-ZA": url, "x-default": url } },
    // Indexable pages inherit the site-wide robots directive from the root layout (index, follow, large previews).
    ...(noIndex && { robots: { index: false, follow: false } }),
    openGraph: {
      type,
      siteName: site.name,
      locale: "en_ZA",
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
      ...(type === "article" && { publishedTime, modifiedTime, authors: [site.name] }),
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

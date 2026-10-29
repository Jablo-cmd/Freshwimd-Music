import type { Metadata } from "next";
import { site } from "@/content/site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

/** Unique title, description, canonical URL, Open Graph and Twitter metadata for a page. */
export function pageMetadata({ title, description, path, image = "/og-image.jpg", noIndex }: PageMeta): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_ZA",
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

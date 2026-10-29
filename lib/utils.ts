import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * `output: export` rejects an empty generateStaticParams(). While there are no records yet, emit one placeholder
 * slug; the page calls notFound() for it, so it renders the 404 page and is never linked or listed in the sitemap.
 */
export function staticSlugs(slugs: string[]) {
  return (slugs.length ? slugs : ["_"]).map((slug) => ({ slug }));
}

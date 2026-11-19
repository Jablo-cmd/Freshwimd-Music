import manifest from "./image-manifest.json";

/**
 * next/image loader for static hosting: serves the pre-generated WebP variants listed in
 * image-manifest.json (see scripts/prepare-images.py). Images that are not in the manifest
 * (e.g. artist photos you add later) are served as-is.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  const widths = (manifest as Record<string, number[]>)[src];
  if (!widths) return src;
  const w = widths.find((x) => x >= width) ?? widths[widths.length - 1];
  const slash = src.lastIndexOf("/");
  const stem = src.slice(slash + 1).replace(/\.[a-z]+$/i, "");
  return `${src.slice(0, slash)}/opt/${stem}-${w}.webp`;
}

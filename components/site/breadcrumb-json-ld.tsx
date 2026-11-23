import { absUrl } from "@/lib/url";
import { JsonLd } from "./json-ld";

/** BreadcrumbList structured data. `items` excludes Home, which is added first. Paths use trailing slashes like the static site. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: all.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absUrl(it.path) })),
      }}
    />
  );
}

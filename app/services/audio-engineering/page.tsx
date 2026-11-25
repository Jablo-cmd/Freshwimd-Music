import type { Metadata } from "next";
import Link from "next/link";
import { absUrl } from "@/lib/url";

const TARGET = "/services/mixing-mastering";

/**
 * Permanent redirect stub. This page was renamed to "Mixing & Mastering"; GitHub Pages cannot send server-side 301s,
 * so the old address answers with an instant meta refresh (treated by search engines as a permanent redirect) and a
 * canonical pointing at the new page. It is not linked anywhere and is not in the sitemap.
 */
export const metadata: Metadata = {
  title: "Moved: Mixing & Mastering",
  description: "This page has moved to Mixing & Mastering.",
  alternates: { canonical: TARGET },
};

export default function AudioEngineeringRedirect() {
  const target = absUrl(TARGET);
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="display text-4xl sm:text-5xl">This page has moved</h1>
        <p className="mt-5 max-w-md text-muted">Audio engineering is now part of our Mixing &amp; Mastering page.</p>
        <Link href={TARGET} className="mt-8 text-amber underline underline-offset-4">Go to Mixing &amp; Mastering</Link>
      </section>
    </>
  );
}

import Link from "next/link";
import { absUrl } from "@/lib/url";

/**
 * Body of a permanent-redirect stub. GitHub Pages cannot send server-side 301s, so a moved or removed page answers with an
 * instant meta refresh (treated by search engines as a permanent redirect). The route's metadata must set `alternates.canonical`
 * to the same target. Stubs are not linked anywhere and are not in the sitemap.
 */
export function RedirectPage({ to, heading, text, label }: { to: string; heading: string; text: string; label: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${absUrl(to)}`} />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center pt-24 text-center">
        <h1 className="display text-4xl sm:text-5xl">{heading}</h1>
        <p className="mt-5 max-w-md text-muted">{text}</p>
        <Link href={to} className="mt-8 text-amber underline underline-offset-4">{label}</Link>
      </section>
    </>
  );
}

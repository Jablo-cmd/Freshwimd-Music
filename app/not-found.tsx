import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

/** Error pages must never be indexed (the root layout otherwise asks for indexing). */
export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow mb-4">404</p>
      <h1 className="display text-5xl sm:text-6xl">This page is off the record.</h1>
      <p className="mt-5 max-w-md text-muted">The page you are looking for does not exist or has moved.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonVariants()}>Back to home</Link>
        <Link href="/services" className={buttonVariants({ variant: "outline" })}>Explore services</Link>
      </div>
    </section>
  );
}

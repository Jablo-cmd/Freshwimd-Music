import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

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

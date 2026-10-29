"use client";

import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="container-x flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="eyebrow mb-4">Something went wrong</p>
      <h1 className="display text-5xl">We hit a wrong note.</h1>
      <p className="mt-5 max-w-md text-muted">This page failed to load. Please try again, or reach us directly on WhatsApp.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <WhatsAppButton variant="outline" />
      </div>
    </section>
  );
}

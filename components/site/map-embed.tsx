"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Google Maps loads only after the visitor asks for it (no third-party request or tracking until then). */
export function MapEmbed({ src, title, directionsHref }: { src: string; title: string; directionsHref: string }) {
  const [loaded, setLoaded] = useState(false);
  if (loaded) {
    return <iframe src={src} title={title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[380px] w-full border-0 grayscale invert-[0.92] contrast-[0.9]" />;
  }
  return (
    <div className="flex h-[380px] flex-col items-center justify-center gap-5 bg-surface-soft px-6 text-center">
      <MapPin className="size-8 text-amber" aria-hidden="true" />
      <p className="max-w-md text-muted">{title}</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={() => setLoaded(true)}>Load interactive map</Button>
        <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center rounded-sm border border-cream/30 px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-cream transition-colors hover:border-amber hover:text-amber">
          Get directions<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <p className="text-xs text-muted/80">Loading the map connects to Google.</p>
    </div>
  );
}

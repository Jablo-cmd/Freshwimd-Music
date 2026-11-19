import Link from "next/link";
import { Play } from "lucide-react";
import type { Artist } from "@/content/types";
import { ArtistPortrait } from "./artist-portrait";

/** Picture + name + song title; links to the listening card on the Artists & Music page. */
export function ArtistCard({ artist, songTitle }: { artist: Artist; songTitle?: string }) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-line bg-surface-soft transition-colors hover:border-amber/50">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ArtistPortrait artist={artist} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" imageClassName="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="display text-3xl">
            <Link href={`/artists/#${artist.slug}`} className="after:absolute after:inset-0 hover:text-amber">{artist.name}</Link>
          </h3>
          {songTitle && (
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-cream/90"><Play className="size-3.5 fill-current text-amber" aria-hidden="true" /> {songTitle}</p>
          )}
        </div>
      </div>
    </article>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/content/types";
import { relationshipLabels } from "@/content/types";
import { Badge } from "@/components/ui/badge";

export function ArtistCard({ artist, featuredTitle }: { artist: Artist; featuredTitle?: string }) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-line bg-surface-soft transition-colors hover:border-amber/50">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={artist.profileImage} alt={`${artist.name} — profile photograph`} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Badge className="mb-3 border-amber/40 bg-ink/60 text-amber">{relationshipLabels[artist.relationship].label}</Badge>
          <h3 className="display text-3xl">
            <Link href={`/artists/${artist.slug}`} className="after:absolute after:inset-0 hover:text-amber">{artist.name}</Link>
          </h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-amber">{artist.genres.join(" · ")}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{artist.shortBio}</p>
        {featuredTitle && <p className="mt-4 border-t border-line-soft pt-4 text-sm text-cream/80"><span className="text-muted">Featured: </span>{featuredTitle}</p>}
      </div>
    </article>
  );
}

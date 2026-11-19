import type { Artist, Track } from "@/content/types";
import { ArtistPortrait } from "./artist-portrait";
import { TrackPlayer } from "@/components/media/track-player";

const initials = (name: string) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

/** One artist: their picture, name and a play button for their song. Nothing else. */
export function ArtistListenCard({ artist, track }: { artist: Artist; track?: Track }) {
  return (
    <article id={artist.slug} className="scroll-mt-28 overflow-hidden rounded-sm border border-line bg-surface-soft">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ArtistPortrait artist={artist} sizes="(min-width:1280px) 25vw, (min-width:640px) 50vw, 100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <h2 className="display absolute inset-x-0 bottom-0 p-5 text-3xl sm:text-[2rem]">{artist.name}</h2>
      </div>
      {track && (
        <TrackPlayer id={`track-${track.id}`} title={track.title} platform={track.platform} embedUrl={track.embedUrl} audioUrl={track.audioUrl} artwork={track.artwork ?? artist.profileImage} monogram={initials(artist.name)} artworkPosition={artist.profileImagePosition} listenUrl={track.listenUrl} className="rounded-none border-0 border-t border-line-soft" />
      )}
    </article>
  );
}

import Image from "next/image";
import type { Artist } from "@/content/types";
import { cn } from "@/lib/utils";

const initials = (name: string) =>
  name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

interface Props {
  artist: Pick<Artist, "name" | "profileImage" | "profileImageAlt">;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * The artist's photograph, filling its (relatively positioned) parent. Without a photograph it shows a
 * branded monogram portrait, so every artist looks complete until an authorised photo is added.
 */
export function ArtistPortrait({ artist, sizes, priority, className, imageClassName }: Props) {
  if (artist.profileImage) {
    return (
      <Image
        src={artist.profileImage}
        alt={artist.profileImageAlt ?? `${artist.name} — portrait photograph`}
        fill
        sizes={sizes}
        priority={priority}
        className={cn("object-cover", imageClassName)}
      />
    );
  }
  return (
    <div aria-hidden="true" className={cn("absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-surface via-surface-soft to-ink-deep", className)}>
      <Image src="/images/site/logo-mark.png" alt="" width={480} height={333} sizes="480px" className="absolute -right-10 -top-6 w-3/4 max-w-none opacity-[0.07]" />
      <div className="absolute inset-6 rounded-sm border border-amber/20" />
      <span className="display select-none text-[7rem] leading-none tracking-wider text-amber/90 sm:text-[9rem]">{initials(artist.name)}</span>
    </div>
  );
}

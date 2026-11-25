"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, Pause, Play } from "lucide-react";
import { toEmbed, platformLabel } from "@/lib/media";
import type { Platform } from "@/content/types";
import { useActiveMedia } from "./media-provider";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  platform: Platform;
  embedUrl?: string;
  audioUrl?: string;
  artwork?: string;
  /** Initials shown in place of artwork when there is no picture */
  monogram?: string;
  /** CSS object-position for the artwork crop */
  artworkPosition?: string;
  listenUrl?: string;
  className?: string;
}

function ArtworkSlot({ artwork, monogram, position }: { artwork?: string; monogram?: string; position?: string }) {
  if (artwork) {
    return (
      <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-surface">
        <Image src={artwork} alt="" fill sizes="64px" className="object-cover" style={{ objectPosition: position ?? "50% 20%", transformOrigin: position ?? "50% 20%", transform: "scale(1.9)" }} />
      </div>
    );
  }
  if (monogram) {
    return (
      <div aria-hidden="true" className="display flex size-16 shrink-0 items-center justify-center rounded-sm border border-amber/20 bg-gradient-to-br from-surface to-ink-deep text-2xl tracking-wider text-amber/90">
        {monogram}
      </div>
    );
  }
  return null;
}

const playButtonClass = "flex size-12 shrink-0 items-center justify-center rounded-full bg-amber text-ink transition-colors hover:bg-amber-soft";

const fmt = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

/**
 * One player for hosted audio and Spotify / SoundCloud / YouTube embeds.
 * Embeds load only after the visitor presses play (lighter pages, no third-party tracking until chosen),
 * and starting one track stops every other track on the page.
 */
export function TrackPlayer({ id, title, subtitle, platform, embedUrl, audioUrl, artwork, monogram, artworkPosition, listenUrl, className }: Props) {
  const { activeId, setActive } = useActiveMedia();
  const embed = toEmbed(platform, embedUrl);
  const hosted = platform === "hosted" && !!audioUrl;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [embedOpen, setEmbedOpen] = useState(false);
  const isActive = activeId === id;

  // Another player took over: pause hosted audio. (Embeds unload via `embedVisible` below.)
  useEffect(() => {
    if (!isActive) audioRef.current?.pause();
  }, [isActive]);
  const embedVisible = embedOpen && isActive;

  if (!hosted && !embed) {
    if (!listenUrl) return null;
    // Link-only song: same layout and round play button as the players, opening the official page.
    return (
      <div className={cn("overflow-hidden rounded-sm border border-line bg-surface-soft", className)}>
        <div className="flex items-center gap-4 p-4">
          <ArtworkSlot artwork={artwork} monogram={monogram} position={artworkPosition} />
          <div className="min-w-0 flex-1">
            <p className="font-medium text-cream">{title}</p>
            {subtitle && <p className="truncate text-xs uppercase tracking-[0.14em] text-muted">{subtitle}</p>}
          </div>
          <a href={listenUrl} target="_blank" rel="noopener noreferrer" className={playButtonClass}>
            <Play className="size-5 translate-x-px" aria-hidden="true" />
            <span className="sr-only">Listen to {title} (opens in a new tab)</span>
          </a>
        </div>
      </div>
    );
  }

  const toggleHosted = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      setActive(id);
      void el.play();
    } else el.pause();
  };

  return (
    <div className={cn("overflow-hidden rounded-sm border border-line bg-surface-soft", className)}>
      <div className="flex items-center gap-4 p-4">
        <ArtworkSlot artwork={artwork} monogram={monogram} position={artworkPosition} />
        <div className="min-w-0 flex-1">
          <p className="font-medium text-cream">{title}</p>
          <p className="truncate text-xs uppercase tracking-[0.14em] text-muted">{[subtitle, platformLabel[platform]].filter(Boolean).join(" · ")}</p>
        </div>
        {hosted ? (
          <button
            type="button"
            onClick={toggleHosted}
            aria-label={`${playing ? "Pause" : "Play"} ${title}`}
            className={playButtonClass}
          >
            {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5 translate-x-px" aria-hidden="true" />}
          </button>
        ) : (
          !embedVisible && (
            <button
              type="button"
              onClick={() => { setActive(id); setEmbedOpen(true); }}
              aria-label={`Load ${platformLabel[platform]} player for ${title}`}
              className={playButtonClass}
            >
              <Play className="size-5 translate-x-px" aria-hidden="true" />
            </button>
          )
        )}
      </div>

      {hosted && (
        <div className="flex items-center gap-3 border-t border-line-soft px-4 py-3">
          <span className="w-10 text-xs tabular-nums text-muted">{fmt(time)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={time}
            onChange={(e) => { const v = Number(e.target.value); if (audioRef.current) audioRef.current.currentTime = v; setTime(v); }}
            aria-label={`Seek ${title}`}
            className="h-1 flex-1 cursor-pointer accent-[#d9a45b]"
          />
          <span className="w-10 text-right text-xs tabular-nums text-muted">{fmt(duration)}</span>
          <audio
            ref={audioRef}
            src={audioUrl}
            preload="none"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => { setPlaying(false); setTime(0); }}
            onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          />
        </div>
      )}

      {embed && embedVisible && (
        <iframe
          src={embed.autoplaySrc}
          title={`${embed.title}: ${title}`}
          {...(embed.platform === "youtube" ? {} : { height: embed.height })}
          className={cn("block w-full border-t border-line-soft", embed.platform === "youtube" && "aspect-video")}
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}

      {listenUrl && (
        <div className="border-t border-line-soft px-4 py-3">
          <a href={listenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-amber">
            Open on {platformLabel[platform]} <ExternalLink className="size-3.5" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      )}
    </div>
  );
}

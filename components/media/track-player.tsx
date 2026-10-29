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
  listenUrl?: string;
  className?: string;
}

const fmt = (s: number) => (Number.isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");

/**
 * One player for hosted audio and Spotify / SoundCloud / YouTube embeds.
 * Embeds load only after the visitor presses play (lighter pages, no third-party tracking until chosen),
 * and starting one track stops every other track on the page.
 */
export function TrackPlayer({ id, title, subtitle, platform, embedUrl, audioUrl, artwork, listenUrl, className }: Props) {
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
    return listenUrl ? (
      <a href={listenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-amber hover:underline">
        Listen to {title} <ExternalLink className="size-4" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
      </a>
    ) : null;
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
        <div className="relative size-16 shrink-0 overflow-hidden rounded-sm bg-surface">
          {artwork && <Image src={artwork} alt="" fill sizes="64px" className="object-cover" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-cream">{title}</p>
          <p className="truncate text-xs uppercase tracking-[0.14em] text-muted">{[subtitle, platformLabel[platform]].filter(Boolean).join(" · ")}</p>
        </div>
        {hosted ? (
          <button
            type="button"
            onClick={toggleHosted}
            aria-label={`${playing ? "Pause" : "Play"} ${title}`}
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-amber text-ink transition-colors hover:bg-amber-soft"
          >
            {playing ? <Pause className="size-5" aria-hidden="true" /> : <Play className="size-5 translate-x-px" aria-hidden="true" />}
          </button>
        ) : (
          !embedVisible && (
            <button
              type="button"
              onClick={() => { setActive(id); setEmbedOpen(true); }}
              aria-label={`Load ${platformLabel[platform]} player for ${title}`}
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-amber text-ink transition-colors hover:bg-amber-soft"
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
          height={embed.height}
          className="block w-full border-t border-line-soft"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}

      {listenUrl && (
        <div className="border-t border-line-soft px-4 py-3">
          <a href={listenUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-amber">
            Listen on the official platform <ExternalLink className="size-3.5" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      )}
    </div>
  );
}

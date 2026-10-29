import type { Platform } from "@/content/types";

export interface EmbedSpec {
  platform: Exclude<Platform, "hosted">;
  src: string;
  /** iframe height in px */
  height: number;
  title: string;
  /** src with autoplay enabled, used after the visitor presses play */
  autoplaySrc: string;
}

const YT_ID = /^[\w-]{11}$/;

function safeUrl(input: string): URL | null {
  try {
    const u = new URL(input);
    return u.protocol === "https:" ? u : null;
  } catch {
    return null;
  }
}

/**
 * Converts a normal share URL (or an embed URL) into a vetted iframe src.
 * Only Spotify, SoundCloud and YouTube are allowed; anything else returns null.
 */
export function toEmbed(platform: Platform, input?: string): EmbedSpec | null {
  if (!input || platform === "hosted") return null;
  const u = safeUrl(input);
  if (!u) return null;
  const host = u.hostname.replace(/^www\./, "");

  if (platform === "spotify" && host === "open.spotify.com") {
    const m = u.pathname.match(/^\/(?:embed\/)?(?:intl-[a-z]+\/)?(track|album|playlist|episode|artist)\/([A-Za-z0-9]+)/);
    if (!m) return null;
    const src = `https://open.spotify.com/embed/${m[1]}/${m[2]}?utm_source=generator&theme=0`;
    return { platform, src, autoplaySrc: src, height: m[1] === "track" || m[1] === "episode" ? 152 : 352, title: "Spotify player" };
  }

  if (platform === "soundcloud" && (host === "soundcloud.com" || host === "w.soundcloud.com" || host === "on.soundcloud.com")) {
    const target = host === "w.soundcloud.com" ? u.searchParams.get("url") : u.toString();
    const t = target ? safeUrl(target) : null;
    if (!t || !/(^|\.)soundcloud\.com$/.test(t.hostname)) return null;
    const base = `https://w.soundcloud.com/player/?url=${encodeURIComponent(t.toString())}&color=%23d9a45b&hide_related=true&show_comments=false&show_teaser=false&visual=false`;
    return { platform, src: base, autoplaySrc: `${base}&auto_play=true`, height: 166, title: "SoundCloud player" };
  }

  if (platform === "youtube" && ["youtube.com", "m.youtube.com", "youtu.be", "youtube-nocookie.com"].includes(host)) {
    let id: string | null = null;
    if (host === "youtu.be") id = u.pathname.slice(1);
    else if (u.pathname.startsWith("/embed/")) id = u.pathname.split("/")[2];
    else id = u.searchParams.get("v");
    if (!id || !YT_ID.test(id)) return null;
    const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`;
    return { platform, src, autoplaySrc: `${src}&autoplay=1`, height: 315, title: "YouTube video player" };
  }

  return null;
}

export const platformLabel: Record<Platform, string> = {
  spotify: "Spotify",
  soundcloud: "SoundCloud",
  youtube: "YouTube",
  hosted: "Preview",
};

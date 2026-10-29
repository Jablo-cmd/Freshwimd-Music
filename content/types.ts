export type Platform = "spotify" | "soundcloud" | "youtube" | "hosted";

/** How Fresh Wind Music is connected to an artist — shown on the site, never implies a signing. */
export type Relationship = "produced" | "collaborated" | "supported";

export const relationshipLabels: Record<Relationship, { label: string; description: string }> = {
  produced: { label: "Produced by Fresh Wind Music", description: "Artists whose music was directly produced by Fresh Wind Music." },
  collaborated: { label: "Collaboration", description: "Artists with whom Fresh Wind Music has collaborated." },
  supported: { label: "Supported", description: "Artists supported through other confirmed Fresh Wind Music services." },
};

export interface Artist {
  id: string;
  name: string;
  slug: string;
  biography: string;
  shortBio: string;
  /** Path under /public (e.g. /images/artists/name.jpg) */
  profileImage: string;
  coverImage?: string;
  genres: string[];
  relationship: Relationship;
  /** Plain-language credit — only publish once confirmed with the artist. */
  contributionSummary?: string;
  featuredTrackId?: string;
  socialLinks: { label: string; href: string }[];
  /** Official platform links (Spotify artist page, Apple Music, YouTube channel…) */
  platformLinks: { label: string; href: string }[];
  featured: boolean;
  published: boolean;
}

export interface Track {
  id: string;
  artistId: string;
  title: string;
  description?: string;
  artwork?: string;
  /** Authorised hosted preview only (path under /public or an https URL you own) */
  audioUrl?: string;
  /** A normal share URL or embed URL for Spotify / SoundCloud / YouTube */
  embedUrl?: string;
  platform: Platform;
  listenUrl?: string;
  releaseYear?: number;
  /** e.g. ["Production", "Mixing", "Mastering"] — shown only when creditsConfirmed is true */
  credits: string[];
  creditsConfirmed: boolean;
  featured: boolean;
  published: boolean;
}

export const portfolioCategories = [
  "Music Production",
  "Mixing and Mastering",
  "Songwriting and Composition",
  "Vocal Production",
  "Music Arrangements",
  "Piano and Keyboard Performances",
  "Artist Projects",
  "Music Education Projects",
] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];

export interface Project {
  id: string;
  slug: string;
  title: string;
  /** Only where permission exists */
  artistName?: string;
  artistId?: string;
  artwork?: string;
  category: PortfolioCategory;
  description: string;
  /** Fresh Wind Music's confirmed contribution — shown only when contributionConfirmed is true */
  contribution?: string;
  contributionConfirmed: boolean;
  platform?: Platform;
  audioUrl?: string;
  embedUrl?: string;
  listenUrl?: string;
  year?: number;
  featured: boolean;
  published: boolean;
}

export interface EquipmentProduct {
  id: string;
  name: string;
  brand?: string;
  category: string;
  /** A permitted product image */
  image: string;
  /** Link to the product page */
  url: string;
  note?: string;
  published: boolean;
}

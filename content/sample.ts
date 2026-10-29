/**
 * DEVELOPMENT-ONLY SAMPLE RECORDS.
 * Loaded only when FWM_SAMPLE_CONTENT=1, so the portfolio / artist layouts can be previewed
 * and tested. Every record is clearly labelled SAMPLE and must never be published.
 */
import type { Artist, Project, Track } from "./types";

export const sampleArtists: Artist[] = [
  {
    id: "sample-1", name: "SAMPLE Artist One", slug: "sample-artist-one",
    biography: "SAMPLE biography text used only to preview the artist profile layout. This is not a real artist.",
    shortBio: "SAMPLE — preview of an artist card. Not a real artist.",
    profileImage: "/images/site/console-portrait.jpg", coverImage: "/images/site/burgundy-control-room.jpg",
    genres: ["Sample Genre", "Preview"], relationship: "produced",
    contributionSummary: "SAMPLE credit line describing Fresh Wind Music's confirmed contribution.",
    featuredTrackId: "sample-t1", socialLinks: [{ label: "Example link", href: "https://example.com" }],
    platformLinks: [{ label: "Example platform", href: "https://example.com" }], featured: true, published: true,
  },
  {
    id: "sample-2", name: "SAMPLE Artist Two", slug: "sample-artist-two",
    biography: "SAMPLE biography text used only to preview the layout.", shortBio: "SAMPLE — collaboration preview.",
    profileImage: "/images/site/control-room-session.jpg", genres: ["Sample"], relationship: "collaborated",
    socialLinks: [], platformLinks: [], featured: true, published: true,
  },
];

export const sampleTracks: Track[] = [
  { id: "sample-t1", artistId: "sample-1", title: "SAMPLE Hosted Preview", description: "Generated test tone to preview the hosted-audio player.",
    artwork: "/images/site/live-room-instruments.jpg", audioUrl: "/sample/tone.wav", platform: "hosted", releaseYear: 2026,
    credits: ["Production", "Mixing"], creditsConfirmed: true, featured: true, published: true },
  { id: "sample-t2", artistId: "sample-1", title: "SAMPLE YouTube Embed", platform: "youtube",
    embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", credits: [], creditsConfirmed: false, featured: false, published: true },
  { id: "sample-t3", artistId: "sample-1", title: "SAMPLE Spotify Embed", platform: "spotify",
    embedUrl: "https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT", credits: [], creditsConfirmed: false, featured: false, published: true },
  { id: "sample-t4", artistId: "sample-1", title: "SAMPLE SoundCloud Embed", platform: "soundcloud",
    embedUrl: "https://soundcloud.com/forss/flickermood", credits: [], creditsConfirmed: false, featured: false, published: true },
];

export const sampleProjects: Project[] = [
  { id: "sample-p1", slug: "sample-project-one", title: "SAMPLE Project One", artistName: "SAMPLE Artist One", artistId: "sample-1",
    artwork: "/images/site/console-wide.jpg", category: "Music Production", description: "SAMPLE description used to preview the portfolio card and detail page.",
    contribution: "SAMPLE contribution statement.", contributionConfirmed: true, platform: "hosted", audioUrl: "/sample/tone.wav",
    listenUrl: "https://example.com", year: 2026, featured: true, published: true },
  { id: "sample-p2", slug: "sample-project-two", title: "SAMPLE Project Two", category: "Mixing and Mastering",
    artwork: "/images/site/vintage-control-room.jpg", description: "SAMPLE description.", contributionConfirmed: false,
    platform: "youtube", embedUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", featured: false, published: true },
];

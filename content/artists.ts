import type { Artist } from "./types";

/**
 * Artists & Music. Each artist is shown as a picture, their name and their featured song — nothing else.
 *
 * To add an artist: append a record here and their song in content/tracks.ts. They appear on /artists and the home page
 * automatically. `profileImage` is a path under /public/images/artists/ (run `python3 scripts/prepare-images.py` after
 * adding a photo). Without one, a branded monogram portrait is shown. Only add photographs you have the right to publish.
 * Sources, licensing status and open verification items are recorded in docs/ARTIST_RESEARCH.md.
 */
export const artists: Artist[] = [
  { id: "putuma-tiso", name: "Putuma Tiso", slug: "putuma-tiso", featuredTrackId: "putuma-tiso-uzuko", featured: true, published: true },
  { id: "monde-mgquba", name: "Monde Mgquba", slug: "monde-mgquba", featuredTrackId: "monde-mgquba-if-not-for-you", featured: true, published: true },
  { id: "exaltation-crew", name: "Exaltation Crew", slug: "exaltation-crew", featuredTrackId: "exaltation-crew-you-are", featured: true, published: true },
  { id: "refilwe-tjatji", name: "Refilwe Tjatji", slug: "refilwe-tjatji", featuredTrackId: "refilwe-tjatji-full-of-faith", featured: true, published: true },
];

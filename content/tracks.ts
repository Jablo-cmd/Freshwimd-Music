import type { Track } from "./types";

/**
 * Songs, linked to an artist through `artistId`. YouTube / Spotify / SoundCloud embeds play from the rights-holder's own
 * upload — nothing is hosted or redistributed here. A normal share link is fine for `embedUrl`.
 * `platform: "external"` with a `listenUrl` shows a plain "Listen now" button instead of a player.
 */
const song = (id: string, artistId: string, title: string, extra: Partial<Track>): Track => ({
  id, artistId, title, platform: "youtube", credits: [], creditsConfirmed: false, featured: true, published: true, ...extra,
});

export const tracks: Track[] = [
  // Official "Provided to YouTube" upload (Worship Encounter, ℗ 2019 Putuma Productions). Found via search; not opened from the build environment.
  song("putuma-tiso-uzuko", "putuma-tiso", "Uzuko", { embedUrl: "https://www.youtube.com/watch?v=r3RBUyis6GE", listenUrl: "https://www.youtube.com/watch?v=r3RBUyis6GE" }),
  song("monde-mgquba-if-not-for-you", "monde-mgquba", "If Not for You", { embedUrl: "https://youtu.be/fKrQSv3ZEL0", listenUrl: "https://youtu.be/fKrQSv3ZEL0" }),
  song("exaltation-crew-you-are", "exaltation-crew", "You Are", { embedUrl: "https://youtu.be/oiNhJH04Pj0", listenUrl: "https://youtu.be/oiNhJH04Pj0" }),
  song("refilwe-tjatji-full-of-faith", "refilwe-tjatji", "Full of Faith (Live)", { embedUrl: "https://youtu.be/GJZEkhPYxds", listenUrl: "https://youtu.be/GJZEkhPYxds" }),
];

# Content guide — adding artists, tracks and products

No database is needed: content lives in typed files under `content/`. Adding a record makes it appear on listing
pages, the homepage (if `featured`), the sitemap, and generates its own detail page. Records with
`published: false` are ignored. **Never add anything you do not have permission to publish.**

## Artists & Music (`content/artists.ts`, `content/tracks.ts`)
Each artist is shown as a picture, a name and a song. Add an artist and their song and they appear on `/artists` and the home page:
```ts
// content/artists.ts
{ id: "artist-name", name: "Artist Name", slug: "artist-name", featuredTrackId: "artist-name-song",
  profileImage: "/images/artists/artist-name.jpg", profileImageAlt: "Artist Name — portrait photograph",   // optional
  featured: true, published: true }
// content/tracks.ts
song("artist-name-song", "artist-name", "Song Title", { embedUrl: "https://youtu.be/VIDEO_ID", listenUrl: "https://youtu.be/VIDEO_ID" })
```
- Platforms: YouTube / Spotify / SoundCloud embeds (`embedUrl`, a normal share link is fine), `platform: "hosted"` + `audioUrl` for authorised previews,
  or `platform: "external"` + `listenUrl` for a plain "Listen now" button. Embeds load only after the visitor presses play; one plays at a time.
- Photos: save the authorised original in `public/images/artists/`, run `python3 scripts/prepare-images.py`, then set `profileImage`. Without a photo a branded monogram is shown.
- Optional descriptive fields (`biography`, `genres`, `releases`, …) exist in `content/types.ts` for future profile pages but are not displayed.
- Record every photograph's source and licence in `docs/ARTIST_RESEARCH.md`.

## Services and lessons
`content/services.ts` / `content/lessons.ts`. Set `confirmed: false` on any service item that is not yet confirmed
as available — it is hidden from the public site until set back to `true`.

## Previewing layouts
`FWM_SAMPLE_CONTENT=1 npm run dev` loads clearly-labelled SAMPLE records (`content/sample.ts`)
so every layout can be previewed. Never set this in production.

## Supabase
Not used. Content volume is small, changes are infrequent and nothing requires user accounts or server state, so a
backend would add cost and attack surface without benefit. If artists/releases later need non-developer editing,
the types in `content/types.ts` map one-to-one to tables (`artists`, `tracks`) with public-read RLS
policies (`published = true`) and writes restricted to authenticated admins. The proposed schema would be
documented and reviewed before any production database change.

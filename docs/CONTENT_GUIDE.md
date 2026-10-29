# Content guide — adding artists, tracks, projects and products

No database is needed: content lives in typed files under `content/`. Adding a record makes it appear on listing
pages, the homepage (if `featured`), the sitemap, and generates its own detail page. Records with
`published: false` are ignored. **Never add anything you do not have permission to publish.**

## Artist (`content/artists.ts`)
```ts
{
  id: "artist-name", name: "Artist Name", slug: "artist-name",
  shortBio: "One or two sentences for the card.",
  biography: "Full biography. Separate paragraphs with a blank line.",
  profileImage: "/images/artists/artist-name.jpg", coverImage: "/images/artists/artist-name-cover.jpg",
  genres: ["Gospel", "Afro-soul"],
  relationship: "produced",            // "produced" | "collaborated" | "supported"
  contributionSummary: "Confirmed credit, e.g. 'Production and mixing on the EP …'",
  featuredTrackId: "artist-name-track-1",
  socialLinks: [{ label: "Instagram", href: "https://…" }],
  platformLinks: [{ label: "Spotify", href: "https://open.spotify.com/artist/…" }],
  featured: true, published: true,
}
```
`relationship` controls the transparency label and grouping. Nothing implies an artist is signed.

## Track (`content/tracks.ts`)
```ts
{
  id: "artist-name-track-1", artistId: "artist-name", title: "Song title", releaseYear: 2025,
  platform: "spotify",                 // "spotify" | "soundcloud" | "youtube" | "hosted"
  embedUrl: "https://open.spotify.com/track/…",   // normal share URL is fine
  listenUrl: "https://open.spotify.com/track/…",
  artwork: "/images/artists/artist-name-track-1.jpg",
  credits: ["Production", "Mixing", "Mastering"], creditsConfirmed: true,   // credits show ONLY when true
  featured: true, published: true,
}
```
Embeds are validated in `lib/media.ts` (only Spotify, SoundCloud and YouTube-nocookie are allowed) and load only
after the visitor presses play; starting one stops the others. For `platform: "hosted"` provide `audioUrl`
(authorised previews only).

## Portfolio project (`content/projects.ts`)
`category` must be one of the eight categories in `content/types.ts`. `contribution` is displayed only when
`contributionConfirmed: true`. Projects can link to an artist via `artistId`.

## Recommended equipment (`content/equipment.ts`)
Add only real products: real name, permitted image and real product-page URL. No prices or stock status are displayed.

## Services and lessons
`content/services.ts` / `content/lessons.ts`. Set `confirmed: false` on any service item that is not yet confirmed
as available — it is hidden from the public site until set back to `true`.

## Previewing layouts
`FWM_SAMPLE_CONTENT=1 npm run dev` loads clearly-labelled SAMPLE records (`content/sample.ts`)
so every layout can be previewed. Never set this in production.

## Supabase
Not used. Content volume is small, changes are infrequent and nothing requires user accounts or server state, so a
backend would add cost and attack surface without benefit. If artists/releases later need non-developer editing,
the types in `content/types.ts` map one-to-one to tables (`artists`, `tracks`, `projects`) with public-read RLS
policies (`published = true`) and writes restricted to authenticated admins. The proposed schema would be
documented and reviewed before any production database change.

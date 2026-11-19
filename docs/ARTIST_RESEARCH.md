# Artists & Music — research, image sources and licensing status

The site shows each artist as **a picture, their name and their featured song** (no biographies or details). This file
records what was researched, what could and could not be verified, and the status of every photograph.
Research was done on 19 Nov 2026 with web search only; YouTube, Apple Music and most news/music sites were not reachable
from the build environment, so **no link or video was opened and checked in a browser** (see "Verification still needed").

## Photographs — status

| Artist | Photograph on site | Licensing status |
|---|---|---|
| Putuma Tiso | **None — branded monogram shown** | No image with a clear licence was obtainable. Official/press images exist (artist profiles on streaming services, news features) but are copyrighted and no permission was available. |
| Monde Mgquba | **None — monogram** | No authentic, licensed photograph located. |
| Exaltation Crew | **None — monogram** | No group photograph located. |
| Refilwe Tjatji | **None — monogram** | No authentic, licensed photograph located. |

No AI-generated or look-alike photographs were used. **To add a real photograph:** obtain it from the artist (or their label /
official channels) with written permission, save the original as `public/images/artists/<slug>.jpg` (portrait, ~4:5, at
least 1000 px wide), run `python3 scripts/prepare-images.py` (creates optimised WebP sizes), then add
`profileImage: "/images/artists/<slug>.jpg"` and `profileImageAlt: "<Name> — portrait photograph"` (and `photoCredit`
if the licence requires one) to the artist in `content/artists.ts`. Nothing else changes.

## Songs and listening links
Policy: **YouTube first** — each song was searched on YouTube before any other platform was used. A search of YouTube for the other three songs (by artist + title) did **not** surface your supplied videos or any other upload, and searching by video ID returned nothing; those three links are therefore exactly as supplied and still need opening/confirming.

| Artist | Song | Link on site | Status |
|---|---|---|---|
| Putuma Tiso | Uzuko | `https://www.youtube.com/watch?v=r3RBUyis6GE` (embed + link) | **Found on YouTube by search** (YouTube-first): an official "Provided to YouTube" upload — "Uzuko · Putuma Tiso · Worship Encounter · ℗ 2019 Putuma Productions · Released 2019-10-04" (distributor: Catapult Reservatory, LLC). Matches artist, album and date, but the page itself was **not opened**, so title, availability and embeddability are unconfirmed. Earlier fallback was the Deezer artist page. Other Putuma Tiso videos surfaced (not used): Worship Medley `Y_2ViGDM1ws` / `zfF4WgwRBa0`, "Qamata" `bSqy4a5WZNs`, "Bow Down And Worship Him" `O4lfvcVGhik`, and the artist's channel `@putumaproductionstiso535`. Remaining notes from the earlier search: Search results (Deezer, Amazon Music) list *Uzuko* as track 2 of *Worship Encounter* (Putuma Productions, 4 Oct 2019, ≈9:19; Amazon credits "feat. Takesure Zamar Ncube"). Apple Music also shows "Uzuko (Live)". No YouTube link was supplied and none was verified. Two different Apple Music artist IDs appear in results for this name (391470069, 1576935856), so the correct profile must be confirmed. |
| Monde Mgquba | If Not for You | `https://youtu.be/fKrQSv3ZEL0` (embed + link) | Supplied by the owner. **Not opened/verified** (title, channel and availability unconfirmed). |
| Exaltation Crew | You Are | `https://youtu.be/oiNhJH04Pj0` (embed + link) | Supplied by the owner (Spring Worship **Volume 4**, Sweep Life Church, 2016). **Not opened/verified.** No independent source for this album was found. |
| Refilwe Tjatji | Full of Faith (Live) | `https://youtu.be/GJZEkhPYxds` (embed + link) | Supplied by the owner. **Not opened/verified.** |

Embeds use `youtube-nocookie.com`, load only after the visitor presses play, and play from the uploader's own video. Nothing
is downloaded or hosted. Ownership/permission to feature these artists has not been confirmed with them.

## Background research (NOT published; kept for future profile pages)

- **Putuma Tiso** — gospel singer, songwriter, sessionist from Gqeberha, based in Johannesburg; earlier Afro-jazz/Afro-soul career
  (signed to Native Rhythms 2010, debut *Putuma*); returned to gospel. Sources: Music In Africa directory (`musicinafrica.net/directory/putuma-tiso/`),
  Drum/News24 (21 Apr 2021), Daily Dispatch (28 Nov 2017, Crown Gospel award), Deezer, Amazon Music. Album titles/years for her gospel
  releases (*Jesu Dwala* 2016, *Back To The Journey Of Grace (Live)* 2017, *The Healing In Worship* per Gospel Music Magazine) differ between
  sources and were not confirmed.
- **Monde Mgquba** — no reliable biography found. A YouTube channel named "Monde Mgquba" exists (`/channel/UCo2mvHt-142NLjygXgsjYJw`), but it was not confirmed
  to belong to the same person as the supplied video, and its self-description contains unverified claims, so nothing from it was used.
- **Exaltation Crew** — nothing found about the choir, *Spring Worship Volume 4* or Sweep Life Church.
- **Refilwe Tjatji** — nothing found. (A different artist, Refilwe Sediti, appears in results; not the same person. Name spelling kept as supplied.)

## Verification still needed
1. Open each YouTube link and confirm title, uploader, that it is the right recording, and that embedding is permitted.
2. Open the Uzuko YouTube link (`r3RBUyis6GE`) and confirm it is the right, embeddable recording; confirm which Putuma Tiso streaming profile is official.
3. Obtain authorised photographs for all four artists (and confirm permission to feature them).
4. If profile pages are wanted later, supply/confirm biographies and release details with the artists.

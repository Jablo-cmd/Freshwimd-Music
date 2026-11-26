# Artists & Music — research, image sources and licensing status

The site shows each artist as **a picture, their name and their featured song** (no biographies or details). This file
records what was researched, what could and could not be verified, and the status of every photograph.
Research was done on 19 Nov 2026 with web search only; YouTube, Apple Music and most news/music sites were not reachable
from the build environment, so **no link or video was opened and checked in a browser** (see "Verification still needed").

## Photographs — status

| Artist | Photograph on site | Source / licensing status |
|---|---|---|
| Putuma Tiso | `public/images/artists/putuma-tiso.jpg` (682×852, as supplied) | Supplied by the site owner (19 Nov 2026), who identified the subject. Photographer/credit **unknown** (no watermark or metadata). **Permission from the artist/photographer not confirmed.** |
| Refilwe Tjatji | `public/images/artists/refilwe-tjatji.jpg` (853×1198, cropped) | Supplied by the site owner, who identified the subject. The original carried a photographer's logo (an "Am" camera mark, apparently *African Moments Photography*) in the bottom-left corner; **at the owner's instruction the image was cropped just above it** (removing the bottom 82 px, which trims only the fingertips). Original size 853×1280. **Permission from the photographer and the artist is not confirmed** — cropping a credit is only appropriate with the photographer's consent; if they ask for credit, add `photoCredit` and display it. |
| Monde Mgquba | `public/images/artists/monde-mgquba.jpg` (1254×1254, converted from WebP) | Supplied by the site owner, who states **they personally photographed it in 2019** and identified the subject. Not independently verified. (During review the image was queried because of possible AI-generation artefacts — merged hands/microphone stand, cable-less mic — and the owner confirmed it is their own photograph.) Subject's permission not confirmed. |
| Godson Zek | `public/images/artists/godson-zek.jpg` (1254×1254, converted from WebP, uncropped) | Supplied by the site owner, who identified the subject (19–25 Nov 2026). Photographer/credit unknown (no watermark). Subject's and photographer's permission not confirmed. |
| Exaltation Crew | `public/images/artists/exaltation-crew.jpg` (1382×922, as supplied) | Supplied by the site owner, who identified the group. Photographer/credit unknown (no watermark). Permission from the group and the photographer not confirmed. The card crops this landscape photo to portrait. |

No AI-generated or look-alike photographs were used. Identity of each subject rests on the owner's statement; it was not independently verified.
**To add or replace a photograph:** save the authorised original as `public/images/artists/<slug>.jpg` (portrait, ~4:5, ≥ 1000 px wide ideally), run
`python3 scripts/prepare-images.py` (creates optimised WebP sizes), then set `profileImage`, `profileImageAlt` and, if needed, `profileImagePosition` / `photoCredit`
for the artist in `content/artists.ts`.

## Songs and listening links
Policy: **YouTube first** — each song was searched on YouTube before any other platform was used. A search of YouTube for the other three songs (by artist + title) did **not** surface your supplied videos or any other upload, and searching by video ID returned nothing; those three links are therefore exactly as supplied and still need opening/confirming.

| Artist | Song | Link on site | Status |
|---|---|---|---|
| Putuma Tiso | Uzuko | `https://www.youtube.com/watch?v=r3RBUyis6GE` (embed + link) | **Found on YouTube by search** (YouTube-first): an official "Provided to YouTube" upload — "Uzuko · Putuma Tiso · Worship Encounter · ℗ 2019 Putuma Productions · Released 2019-10-04" (distributor: Catapult Reservatory, LLC). Matches artist, album and date, but the page itself was **not opened**, so title, availability and embeddability are unconfirmed. Earlier fallback was the Deezer artist page. Other Putuma Tiso videos surfaced (not used): Worship Medley `Y_2ViGDM1ws` / `zfF4WgwRBa0`, "Qamata" `bSqy4a5WZNs`, "Bow Down And Worship Him" `O4lfvcVGhik`, and the artist's channel `@putumaproductionstiso535`. Remaining notes from the earlier search: Search results (Deezer, Amazon Music) list *Uzuko* as track 2 of *Worship Encounter* (Putuma Productions, 4 Oct 2019, ≈9:19; Amazon credits "feat. Takesure Zamar Ncube"). Apple Music also shows "Uzuko (Live)". No YouTube link was supplied and none was verified. Two different Apple Music artist IDs appear in results for this name (391470069, 1576935856), so the correct profile must be confirmed. |
| Monde Mgquba | If Not for You | `https://youtu.be/fKrQSv3ZEL0` (embed + link) | Supplied by the owner. **Not opened/verified** (title, channel and availability unconfirmed). |
| Exaltation Crew | You Are | `https://youtu.be/POnrX2EGcYE` (embed + link) | Link replaced by the owner on 25 Nov 2026 (previously `oiNhJH04Pj0`; song title and album details not re-confirmed). **Not opened/verified.** No independent source for this album was found. |
| Godson Zek | It Is Yours | `https://youtu.be/y7UDPku_NuY` (embed + link) | Supplied by the owner. **Not opened/verified** from the build environment. No biography, album, date or credit information was supplied, so none is shown. |
| Refilwe Tjatji | Full of Faith (Live) | `https://youtu.be/GJZEkhPYxds` (embed + link) | Supplied by the owner. **Not opened/verified.** |
| Tsholo Acts | Holy Spirit | `https://youtu.be/IQGOs8TWxq8` (embed + link) | Supplied by the owner (26 Nov 2026). **Not opened/verified.** No photograph supplied yet: a branded monogram placeholder is shown until one is provided. No biography or links. |
| Mlungu Mkhonza | Wavuk' e Calvary | `https://youtu.be/8DR5MzPoO14` (embed + link) | Supplied by the owner (26 Nov 2026). **Not opened/verified.** No photograph supplied yet: a branded monogram placeholder is shown until one is provided. No biography or links. |

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
3. Confirm permission to use the two supplied photographs (artist + photographer, esp. the cropped *African Moments Photography* image); confirm permission for the Exaltation Crew photograph; confirm permission to feature all four artists.
4. If profile pages are wanted later, supply/confirm biographies and release details with the artists.

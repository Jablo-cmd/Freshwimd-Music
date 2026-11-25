# Fresh Wind Music — SEO strategy

Status: prepared 23 Nov 2026 for owner review. **Not deployed.** The site is served from `https://freshwindmusic.aurisnexus.co.za`
and every canonical URL, sitemap entry and structured-data URL in the build uses that origin.

**Positioning.** An inclusive recording and music production studio in Johannesburg. Commercial priority: full albums and EPs.
Strong national interest in choir, school, university, church and worship-team recording. Single-song clients are always welcome.
Nothing on the site claims services, equipment, capacity, turnaround, mobile/on-location recording, awards, reviews or prices that are not confirmed.

## 1. What data this is built on (and what it is not)
- **No keyword volumes, difficulty scores or rankings were available.** The keyword tools connected to the session were out of credits, and
  Google Search Console is not connected for this site (see §7). Nothing below claims a search volume or a ranking.
- The clusters come from the owner's brief plus a review of live search results (23 Nov 2026) for choir, school-choir and Johannesburg
  album-studio queries. Findings: results for school/university choir recording were dominated by news items, university pages and
  music directories rather than studio landing pages; choir-capable studios that surfaced were in Durban, Cape Town and Pretoria
  (Music In Africa directory, studio sites); no Johannesburg studio showed a dedicated school/university/church choir or album page.
  That suggests an opening for dedicated pages — it is an observation, **not a measured ranking opportunity**.
- Validate with Google Keyword Planner (free with a Google Ads account) and, once indexed, Search Console.

## 2. Keyword clusters → pages
Each page targets one primary intent; related phrases are used naturally in headings and copy, not repeated.

| Cluster | Intent / scope | Primary page | Supporting |
|---|---|---|---|
| Recording studio (South Africa / Johannesburg) | national + local, general | `/studio/` (Johannesburg, local) and `/services/` (hub) | home `/` |
| **Album recording & production** (Tier 1) | national + Johannesburg | `/services/album-recording-production/` | guide `how-to-record-an-album`, `ep-vs-album-vs-single` |
| **EP recording & production** (Tier 1) | national + Johannesburg | `/services/ep-recording-production/` | guide `ep-vs-album-vs-single` |
| **Choir recording — national** (Tier 1) | national | `/services/choir-recording-south-africa/` | guide `prepare-a-choir-for-recording` |
| School choir recording | national, schools | `/services/school-choir-recording/` | guide `school-choir-recording-guide` |
| University / college choir recording | national, institutions | `/services/university-college-choir-recording/` | — |
| Church choir recording | national, churches | `/services/church-choir-recording/` | guide `church-and-worship-album-guide` |
| Praise & worship team recording | national, church music depts | `/services/worship-team-recording/` | same guide |
| Gospel recording / production | national, genre | `/services/gospel-recording-production/` | `/artists/` (proof of gospel music on site) |
| Jazz recording / production | national, genre | `/services/jazz-recording-production/` | — |
| Single song, demo, vocal recording (Tier 3) | national + local, entry-level | `/services/single-song-recording/` | guide `prepare-for-a-recording-session` |
| Mixing & mastering | national | `/services/mixing-mastering/` | guide `mixing-vs-mastering` |
| Music production | national | `/services/music-production/` | songwriting, artist development |
| Music lessons (secondary business) | local | `/music-lessons/` | — |

**Deliberately not built:** pages per city (Cape Town, Durban, Pretoria…), pages per genre beyond gospel and jazz (R&B, amapiano, hip-hop,
afro-soul, etc.) and separate "gospel choir" / "vocal recording" pages. They would be thin or would duplicate church-choir / single-song
content. Other genres are welcomed in copy ("every style welcome") and can get a page once there is genuine unique content (e.g. a portfolio example).
Podcast and advert pages drafted earlier were dropped: outside the brief's tiers.

## 3. National vs local
- **National:** the choir hub and its four sub-pages, album and EP pages, gospel/worship/jazz pages. Copy says plainly: *the studio is in
  Johannesburg; clients from across South Africa are welcome to enquire; recording takes place at the Johannesburg studio.* No page claims
  studios, mobile recording or on-location recording elsewhere, and none promises travel support.
- **Local (Johannesburg):** `/studio/` (title "Recording Studio Johannesburg"), address on every page (footer, contact, LocalBusiness data), directions link,
  Google Business Profile (see §6). Structured data `areaServed`: Johannesburg, Gauteng, South Africa.

## 4. On-page and technical implementation (summary)
- Unique title (≤ ~60 chars incl. brand, brand appears once) and description (70–160 chars) per page; verified by `npm run seo:audit`.
- One H1 per page; H2/H3 order verified. Canonical, Open Graph and Twitter tags on every indexable page.
- JSON-LD: site-wide `@graph` with `LocalBusiness`+`ProfessionalService` (an Organization) and `WebSite`; `Service` + `BreadcrumbList` (+ `FAQPage`
  where real FAQs exist) on service pages; `Article` + `BreadcrumbList` on guides. No reviews, ratings, prices, hours, coordinates or social profiles.
- Internal linking: home → flagship and choir pages; choir hub ↔ school/university/church/worship pages; every service page has "related recording services",
  guides and a context-aware WhatsApp enquiry (`lib/whatsapp.ts`: album, EP, choir, school, university, church, worship team, gospel, jazz, single, mixing).
- Sitemap and robots generated from the same data and origin (`NEXT_PUBLIC_SITE_URL` / repository variable `SITE_URL`). Placeholder/error pages are `noindex` and excluded.

## 5. Information needed from the owner (not invented)
1. Confirm every service described (album, EP, each choir/worship/gospel/jazz page, single-song, demos) is genuinely offered, and the wording about how groups are recorded.
2. Studio facts you want published: room/choir capacity, equipment list, accompaniment options (piano/band), typical project stages and timelines.
3. Whether any form of on-location, live-service or remote recording is offered (the site currently says recording takes place at the Johannesburg studio).
4. Real portfolio items (albums/EPs/choir projects) with permission, and genuine client testimonials/reviews.
5. Official social profiles (none are linked today), opening hours, and Google Business Profile access.
6. Whether physical CD/duplication or distribution help is offered (not claimed anywhere).

## 6. Google Business Profile and listings (recommended — requires owner access)
- Claim/verify a profile for 60 Goud St, City and Suburban, Johannesburg, 2094. Keep name, address and phone **exactly** as on the website (063 122 6552, WhatsApp).
- Category: choose the closest available "Recording studio"; add services (album recording, EP recording, choir recording, mixing and mastering, music lessons).
- Description in plain language (studio in Johannesburg; albums, EPs, choirs, single songs; clients welcome from across South Africa).
- Add real photographs (the control-room photos), the website link and the WhatsApp number. Post updates when new releases are published.
- **Reviews:** ask genuine clients after a completed project; never buy, fake, filter or incentivise reviews. Reply to every review.
- Directories to consider (verify each is current): Music In Africa directory (studios listing), Bing Places, Apple Business Connect, and relevant South African
  business directories. Keep details identical everywhere. Churches, schools, university music departments and choir associations are the natural referral/backlink sources.

## 7. Search Console and monitoring
- **Access status (23 Nov 2026):** the Search Console connection available to this session is bound to `https://aurisnexus.co.za/` (a URL-prefix property for the
  main site). Inspecting `freshwindmusic.aurisnexus.co.za` URLs was **denied** and performance for it returned nothing, so no indexing, impressions, clicks,
  CTR, position, query or country data could be reviewed.
- **Do now:** in Search Console add the property for the site you will actually use (a **Domain property** for the new domain once bought; until then a URL-prefix
  property for `https://freshwindmusic.aurisnexus.co.za/`), verify it, submit `sitemap.xml`, and use URL Inspection → Request indexing for: home, `/services/`,
  the album, EP and choir pages. Add the same site in Bing Webmaster Tools.
- **Check weekly for the first two months:** Pages → indexed vs excluded; Performance → queries containing album, EP, choir, school, university, church, worship,
  gospel, jazz, recording studio; compare pages by impressions and CTR; improve titles/descriptions of pages with impressions but low CTR; look for queries mapped to the wrong page.
- Track enquiries (WhatsApp clicks by topic are distinguishable by prefilled message). Privacy-respecting analytics can be added later; none is installed.

## 8. Content roadmap
- Publish real portfolio entries (album/EP/choir projects with permission) and link them from the matching service pages.
- With permission, add a case-study page per completed choir/album project (unique content beats generic copy).
- Guides to add next: "How to choose a recording studio", "What to bring to a choir recording", "How long does it take to record an album?" (only with confirmed information).
- Revisit R&B / amapiano / hip-hop / afro-soul pages only when there is real work to show.

## 9. Domain change (freshwindmusic.co.za or .com): see `docs/DOMAIN_SWITCH.md`.

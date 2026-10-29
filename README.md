# Fresh Wind Music — website

Premium website for **Fresh Wind Music**, a Johannesburg music production, audio engineering, songwriting,
artist development and music education business. Canonical domain: <https://freshwindmusic.co.za>.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · shadcn/ui-style components (Radix) · Framer Motion · Lucide.
No backend or database is required; content is typed local data (see `docs/CONTENT_GUIDE.md`).

## Run locally
```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck && npm run lint
npm run build && npm start
```
Optional: copy `.env.example` to `.env.local`. `FWM_SAMPLE_CONTENT=1` previews artist/portfolio layouts with
labelled sample data (development only).

## Structure
```
app/                 routes: /, /services(/[slug]), /portfolio(/[slug]), /artists(/[slug]), /studio,
                     /music-lessons, /recommended-equipment, /contact, sitemap, robots, error/404/loading
components/ui        button, badge, sheet (shadcn-style)
components/site      header, footer, cards, hero, forms, portfolio filter, CTA, JSON-LD …
components/media     single-playback manager + track player (hosted audio, Spotify, SoundCloud, YouTube)
content/             site details, services, lessons, equipment, artists, tracks, projects, image registry
lib/                 SEO metadata, WhatsApp links, embed validation, structured data
docs/                ASSET_INVENTORY.md, CONTENT_GUIDE.md
scripts/             prepare-images.py (derives web crops from original photographs)
```
Contact details are single-sourced in `content/site.ts` (email intentionally `info@freshwindmusic.coza`, as supplied).
WhatsApp prefilled messages live in `lib/whatsapp.ts`.

## Deploy to freshwindmusic.co.za (Vercel recommended; not deployed yet)
1. Import the GitHub repo into Vercel (framework preset: Next.js, defaults are correct).
2. Set `NEXT_PUBLIC_SITE_URL=https://freshwindmusic.co.za`. Do **not** set `FWM_SAMPLE_CONTENT`.
3. Project → Domains: add `freshwindmusic.co.za` and `www.freshwindmusic.co.za` (redirect www → apex).
4. At the `.co.za` registrar/DNS: `A  @  76.76.21.21` and `CNAME www cname.vercel-dns.com` (or the values Vercel shows).
5. After DNS propagates verify HTTPS, `/sitemap.xml` and `/robots.txt`, then submit the sitemap in Google Search Console
   and claim the Google Business Profile for 60 Goud St.
Any Node 20+ host works (`npm run build && npm start`).

# Switching to freshwindmusic.co.za (or .com)

The site is built so the domain is **one setting**. Nothing is hard-coded in the pages: canonicals, Open Graph URLs, JSON-LD, `sitemap.xml`,
`robots.txt` and the GitHub Pages `CNAME` all derive from `SITE_URL`.

## Recommendation
Use **`freshwindmusic.co.za` as the single canonical domain** (a South African ccTLD matches the South African audience). If you also buy
`freshwindmusic.com`, set it to **301-redirect** to the `.co.za` site — never serve the same site on both.
Decide whether the canonical host is the bare domain (`freshwindmusic.co.za`, recommended) or `www.`; GitHub Pages redirects the other automatically
when both DNS records exist.

## Steps (do in this order)
1. Buy the domain. Do not change anything in the repo yet.
2. DNS for the bare domain (GitHub Pages): four `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally the four `AAAA`
   records GitHub lists); for `www`: `CNAME www → jablo-cmd.github.io`. Check GitHub's current Pages DNS documentation before applying.
3. GitHub → repository **Settings → Variables → Actions**: add variable `SITE_URL` = `https://freshwindmusic.co.za`. (The workflow falls back to the current
   subdomain when it is unset; it writes `out/CNAME` from this value.)
4. GitHub → **Settings → Pages → Custom domain**: enter the new domain, wait for the DNS check, then tick **Enforce HTTPS**.
5. Run the **Deploy to GitHub Pages** workflow (Actions → Run workflow). Locally you can test: `NEXT_PUBLIC_SITE_URL=https://freshwindmusic.co.za npm run build:static`
   then `node scripts/seo-audit.mjs out https://freshwindmusic.co.za --forbid=aurisnexus.co.za` — it must report "No problems found".
6. **Old subdomain:** once the custom domain moves, `freshwindmusic.aurisnexus.co.za` stops serving this site. Preserve SEO value with a **301 redirect** from the old
   host to the new one at the `aurisnexus.co.za` DNS/hosting level (a URL-forwarding/redirect rule, path-preserving if available). Keep it in place for at least a year.
7. Search Console: add a **Domain property** for the new domain and verify via DNS; submit `https://freshwindmusic.co.za/sitemap.xml`; use the **Change of Address** tool
   if the old host was verified in Search Console; request indexing of the key pages. Add the site to Bing Webmaster Tools.
8. Update Google Business Profile, directory listings and any social profiles to the new URL. Update the email address if it moves to the new domain
   (`content/site.ts` → `email`); set up SPF/DKIM/DMARC for mail on the new domain.
9. Re-run the audit after DNS settles and fetch the live `robots.txt` and `sitemap.xml` to confirm they show the new origin.

## What the repository already guarantees
- `content/site.ts` → `site.url` reads `NEXT_PUBLIC_SITE_URL`; `lib/url.ts` builds every absolute URL (with the static export's trailing slash).
- `app/robots.ts`, `app/sitemap.ts`, `lib/seo.ts` (canonical / Open Graph), `lib/schema.ts` and the breadcrumb/service/article JSON-LD all use `site.url`.
- `.github/workflows/deploy.yml` → `SITE_URL` (repository variable, default `https://freshwindmusic.aurisnexus.co.za`) drives the build and the `CNAME` file.
- `scripts/seo-audit.mjs` (`npm run seo:audit`) verifies canonicals, sitemap, robots, titles, descriptions, JSON-LD and that no other domain leaks into the output.

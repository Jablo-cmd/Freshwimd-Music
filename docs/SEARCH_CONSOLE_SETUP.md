# Search Console, Bing and analytics — setup

The site is ready for all three, but **nothing is configured or verified yet and no IDs or tokens exist in the repository.**
Everything below is switched on by *repository variables* (GitHub → Settings → Secrets and variables → Actions → **Variables**) and a
redeploy. If a variable is not set, nothing is rendered. Never paste tokens into the code.

| What | What you must supply | Repository variable | Result in the page |
|---|---|---|---|
| Google Search Console (URL-prefix property) | the `content` value of Google's HTML-tag verification meta tag | `GOOGLE_SITE_VERIFICATION` | `<meta name="google-site-verification" content="…">` |
| Bing Webmaster Tools | the `msvalidate.01` token (or import the site from Search Console) | `BING_SITE_VERIFICATION` | `<meta name="msvalidate.01" content="…">` |
| Google Analytics 4 | the Measurement ID (`G-XXXXXXXXXX`) | `GA_MEASUREMENT_ID` | GA4 script (IP anonymised), loaded after the page is interactive |

## Google Search Console
1. search.google.com/search-console → **Add property**. Until a standalone domain exists, choose **URL prefix** and enter
   `https://freshwindmusic.aurisnexus.co.za/` (a Domain property for `aurisnexus.co.za` is a different property and would include the main site).
2. Pick **HTML tag** verification, copy only the `content="…"` value, save it as the `GOOGLE_SITE_VERIFICATION` variable, then run the
   **Deploy to GitHub Pages** workflow (Actions → Run workflow). Click **Verify**.
3. **Sitemaps** → submit `sitemap.xml` (full URL `https://freshwindmusic.aurisnexus.co.za/sitemap.xml`).
4. **URL Inspection** → request indexing for: `/`, `/services/`, `/services/album-recording-production/`, `/services/ep-recording-production/`,
   `/services/choir-recording-south-africa/`, `/artists/`.
5. Check **Pages** (indexed vs excluded) after a few days; the redirect stub `/services/audio-engineering/` is expected to be reported as a redirect.

## Bing Webmaster Tools
Sign in at bing.com/webmasters → **Add a site** (or **Import from Google Search Console**), verify with the `msvalidate.01` token
(`BING_SITE_VERIFICATION`), submit the same sitemap URL. Optional later: IndexNow (needs a key file; not added).

## Google Analytics 4 (optional)
Create a GA4 property and a Web data stream, copy the Measurement ID into `GA_MEASUREMENT_ID`, redeploy. **Before enabling, publish a short
privacy notice** (and consider a consent banner): GA4 sets cookies and processes personal data, which South Africa's POPIA applies to.
No analytics runs today, so there are no cookies or consent requirements on the live site.

## Monitoring (first two months)
Weekly in Search Console: Performance → queries (album, EP, choir, school, university, church, worship, gospel, jazz, recording studio), pages by impressions/CTR,
countries, mobile vs desktop; Pages → indexing problems; Sitemaps → "Success". Improve titles/descriptions of pages that have impressions but a low CTR.
After a domain change see `docs/DOMAIN_SWITCH.md`.

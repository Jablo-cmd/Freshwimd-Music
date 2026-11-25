#!/usr/bin/env node
/**
 * Static SEO audit for the exported site (`out/`). No dependencies.
 *   npm run build:static && node scripts/seo-audit.mjs out https://freshwindmusic.aurisnexus.co.za [--forbid=old-domain.example]
 * Checks: title / description length and uniqueness, single H1, heading order, canonical, Open Graph / Twitter tags, JSON-LD
 * validity, noindex only on error pages, internal links and images resolve, sitemap and robots point at the right origin,
 * and that no other domain appears where it should not. Exits 1 if any problem is found.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const [, , outDir = "out", siteArg = "https://freshwindmusic.aurisnexus.co.za", ...flags] = process.argv;
const SITE = siteArg.replace(/\/$/, "");
const forbid = flags.filter((f) => f.startsWith("--forbid=")).map((f) => f.slice(9));
const issues = [];
const note = (m) => issues.push(m);

const htmlFiles = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html" || f === "404.html") htmlFiles.push(p);
  }
})(outDir);

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => { const m = tag.match(new RegExp(`${name}="([^"]*)"`)); return m ? decode(m[1]) : null; };
const exists = (p) => { const clean = decodeURIComponent(p.split("#")[0].split("?")[0]); if (!clean || clean === "/") return true; const base = join(outDir, clean.replace(/^\//, "")); return existsSync(base) && (!statSync(base).isDirectory() || existsSync(join(base, "index.html"))); };

const titles = new Map(), descs = new Map();
const rows = [];
for (const file of htmlFiles.sort()) {
  const html = readFileSync(file, "utf8");
  const rel = "/" + relative(outDir, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const isError = /\/(404|_not-found)(\.html|\/)?$/.test(rel) || /\/_\/$/.test(rel);
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const metas = Object.fromEntries([...html.matchAll(/<meta\s[^>]*>/g)].map((m) => [attr(m[0], "name") || attr(m[0], "property"), attr(m[0], "content")]).filter(([k]) => k));
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const desc = metas.description || "";
  if (!isError) {
    if (title.length < 25 || title.length > 63) note(`${rel}: title length ${title.length} (${title})`);
    if (!desc) note(`${rel}: missing description`); else if (desc.length < 70 || desc.length > 160) note(`${rel}: description length ${desc.length}`);
    (titles.get(title) ?? titles.set(title, []).get(title)).push(rel);
    (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(rel);
    const exp = rel === "/" ? SITE : SITE + rel;
    if (canonical !== exp && canonical !== exp + "/") note(`${rel}: canonical ${canonical} (expected ${exp})`);
    for (const k of ["og:title", "og:description", "og:image", "og:url", "twitter:card", "viewport"]) if (!metas[k]) note(`${rel}: missing ${k}`);
    if (metas["og:url"] && !metas["og:url"].startsWith(SITE)) note(`${rel}: og:url ${metas["og:url"]}`);
    if ((metas.robots || "").includes("noindex")) note(`${rel}: unexpected noindex`);
    if ((title.match(/Fresh Wind Music/g) || []).length > 1) note(`${rel}: brand repeated in title`);
    if (!/<html[^>]*lang="en-ZA"/.test(html)) note(`${rel}: lang is not en-ZA`);
  } else if (!(metas.robots || "").includes("noindex") && !/_\/$/.test(rel) === false) {
    // error pages should not be indexable
  }
  const h = [...html.matchAll(/<h([1-4])[ >]/g)].map((m) => +m[1]);
  if (!isError) {
    if (h.filter((x) => x === 1).length !== 1) note(`${rel}: ${h.filter((x) => x === 1).length} h1`);
    let prev = 0; for (const x of h) { if (prev && x > prev + 1) note(`${rel}: heading jump h${prev}->h${x}`); prev = x; }
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)) { try { JSON.parse(m[1].replace(/\\u003c/g, "<")); } catch (e) { note(`${rel}: invalid JSON-LD (${e.message})`); } }
  for (const m of html.matchAll(/<img\s[^>]*>/g)) if (attr(m[0], "alt") === null) note(`${rel}: img without alt`);
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!exists(m[1])) note(`${rel}: broken internal reference ${m[1]}`);
  for (const bad of forbid) if (html.includes(bad)) note(`${rel}: contains forbidden "${bad}"`);
  rows.push({ rel, t: title.length, d: desc.length, h1: h.filter((x) => x === 1).length, error: isError });
}
for (const [t, rs] of titles) if (rs.length > 1) note(`duplicate title "${t}": ${rs.join(", ")}`);
for (const [d, rs] of descs) if (d && rs.length > 1) note(`duplicate description: ${rs.join(", ")}`);

// sitemap + robots
const sm = existsSync(join(outDir, "sitemap.xml")) ? readFileSync(join(outDir, "sitemap.xml"), "utf8") : "";
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!locs.length) note("sitemap.xml missing or empty");
const seen = new Set();
for (const l of locs) {
  if (!l.startsWith(SITE)) note(`sitemap URL on wrong origin: ${l}`);
  if (seen.has(l)) note(`duplicate sitemap URL: ${l}`); seen.add(l);
  if (!exists(l.replace(SITE, "") || "/")) note(`sitemap URL has no page: ${l}`);
  if (/\/_\/?$/.test(l)) note(`sitemap lists placeholder page: ${l}`);
}
const indexable = rows.filter((r) => !r.error).map((r) => (r.rel === "/" ? SITE : SITE + r.rel.replace(/\/$/, "")));
for (const u of indexable) if (!locs.some((l) => l.replace(/\/$/, "") === u)) note(`indexable page missing from sitemap: ${u}`);
const robots = existsSync(join(outDir, "robots.txt")) ? readFileSync(join(outDir, "robots.txt"), "utf8") : "";
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) note("robots.txt does not reference the sitemap on the right origin");
if (/Disallow:\s*\/\s*$/m.test(robots)) note("robots.txt blocks the whole site");

console.log(`Audited ${rows.length} HTML files against ${SITE}; sitemap lists ${locs.length} URLs.`);
for (const r of rows.filter((x) => !x.error)) console.log(`  ${r.rel.padEnd(52)} title ${String(r.t).padStart(2)}  desc ${String(r.d).padStart(3)}  h1 ${r.h1}`);
console.log(issues.length ? `\n${issues.length} problem(s):\n` + issues.map((i) => " - " + i).join("\n") : "\nNo problems found.");
process.exit(issues.length ? 1 : 0);

#!/usr/bin/env node
/**
 * Static SEO audit for the exported site (`out/`). No dependencies. Exits 1 if any problem is found.
 *
 *   npm run build:static && node scripts/seo-audit.mjs out [origin] [--forbid=text]
 *
 * `origin` defaults to the current production domain. Checks: title / description length and uniqueness, brand not repeated,
 * single H1 and heading order, canonical (correct origin, trailing slash, no duplicates), hreflang, robots meta, Open Graph and
 * Twitter tags (absolute image URL on the right origin), JSON-LD validity and expected types, accidental noindex, redirect stubs,
 * internal links and images (existence, trailing-slash policy, alt text), sitemap (origin, duplicates, lastmod quality, coverage),
 * robots.txt, and that no other freshwindmusic.* domain leaks into the output.
 */
import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const args = process.argv.slice(2);
const positional = args.filter((a) => !a.startsWith("--"));
const outDir = positional[0] ?? "out";
const SITE = (positional[1] ?? "https://freshwindmusic.aurisnexus.co.za").replace(/\/$/, "");
const forbid = args.filter((a) => a.startsWith("--forbid=")).map((a) => a.slice(9));
const siteHost = new URL(SITE).host;
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
const canonicalOf = (rel) => (rel === "/" ? `${SITE}/` : `${SITE}${rel}`);

const titles = new Map(), descs = new Map(), canonicals = new Map();
const rows = [], indexable = [], redirects = [];
const jsonLdSeen = {};

for (const file of htmlFiles.sort()) {
  const html = readFileSync(file, "utf8");
  const rel = "/" + relative(outDir, file).replace(/index\.html$/, "").replace(/\\/g, "/");
  const isRedirect = /<meta http-equiv="refresh"/i.test(html);
  const isError = /\/(404|_not-found)(\.html|\/)?$/.test(rel) || /\/_\/$/.test(rel);
  const title = decode((html.match(/<title>([^<]*)<\/title>/) || [])[1] || "");
  const metas = Object.fromEntries([...html.matchAll(/<meta\s[^>]*>/g)].map((m) => [attr(m[0], "name") || attr(m[0], "property"), attr(m[0], "content")]).filter(([k]) => k));
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1];
  const desc = metas.description || "";

  if (isRedirect) {
    const target = (html.match(/<meta http-equiv="refresh" content="0;\s*url=([^"]*)"/i) || [])[1];
    redirects.push(rel);
    if (!target) note(`${rel}: redirect stub without a 0-second target`);
    else {
      if (!target.startsWith(SITE)) note(`${rel}: redirect target on wrong origin ${target}`);
      if (!exists(target.replace(SITE, "") || "/")) note(`${rel}: redirect target does not exist ${target}`);
      if (canonical !== target) note(`${rel}: redirect stub canonical ${canonical} != target ${target}`);
    }
    rows.push({ rel, t: title.length, d: desc.length, h1: 1, kind: "redirect" });
    continue;
  }

  if (!isError) {
    indexable.push(rel);
    if (title.length < 25 || title.length > 63) note(`${rel}: title length ${title.length} (${title})`);
    if (!desc) note(`${rel}: missing description`); else if (desc.length < 70 || desc.length > 160) note(`${rel}: description length ${desc.length}`);
    (titles.get(title) ?? titles.set(title, []).get(title)).push(rel);
    (descs.get(desc) ?? descs.set(desc, []).get(desc)).push(rel);
    if (canonical !== canonicalOf(rel)) note(`${rel}: canonical ${canonical} (expected ${canonicalOf(rel)})`);
    (canonicals.get(canonical) ?? canonicals.set(canonical, []).get(canonical)).push(rel);
    for (const k of ["og:title", "og:description", "og:image", "og:url", "og:type", "og:locale", "twitter:card", "twitter:title", "twitter:description", "twitter:image", "viewport", "robots"]) if (!metas[k]) note(`${rel}: missing ${k}`);
    if (metas["og:url"] !== canonicalOf(rel)) note(`${rel}: og:url ${metas["og:url"]} != canonical`);
    if (metas["og:image"] && !metas["og:image"].startsWith(SITE)) note(`${rel}: og:image not absolute on ${SITE}: ${metas["og:image"]}`);
    if (/noindex/i.test(metas.robots || "")) note(`${rel}: unexpected noindex (${metas.robots})`);
    if (!/index/i.test(metas.robots || "")) note(`${rel}: robots meta does not say index`);
    const hl = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]*)" href="([^"]*)"/gi)].map((m) => [m[1], m[2]]);
    if (!hl.some(([l, h]) => l === "en-ZA" && h === canonicalOf(rel))) note(`${rel}: missing self-referencing hreflang en-ZA`);
    if (!hl.some(([l]) => l === "x-default")) note(`${rel}: missing hreflang x-default`);
    if ((title.match(/Fresh Wind Music/g) || []).length > 1) note(`${rel}: brand repeated in title`);
    if (!/<html[^>]*lang="en-ZA"/.test(html)) note(`${rel}: lang is not en-ZA`);
    const h = [...html.matchAll(/<h([1-4])[ >]/g)].map((m) => +m[1]);
    if (h.filter((x) => x === 1).length !== 1) note(`${rel}: ${h.filter((x) => x === 1).length} h1`);
    let prev = 0; for (const x of h) { if (prev && x > prev + 1) note(`${rel}: heading jump h${prev}->h${x}`); prev = x; }
  } else if (!/noindex/i.test(metas.robots || "")) {
    note(`${rel}: error/placeholder page should be noindex`);
  }

  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([^<]*)<\/script>/g)) {
    try {
      const j = JSON.parse(m[1].replace(/\\u003c/g, "<"));
      const collect = (v) => { if (Array.isArray(v)) v.forEach(collect); else if (v && typeof v === "object") { if (v["@type"]) types.push(...[].concat(v["@type"])); Object.values(v).forEach(collect); } };
      collect(j);
      const walk = (v) => { if (typeof v === "string" && /^https?:\/\//.test(v) && /freshwindmusic/.test(v) && !v.startsWith(SITE)) note(`${rel}: JSON-LD URL on wrong origin ${v}`); else if (v && typeof v === "object") Object.values(v).forEach(walk); };
      walk(j);
    } catch (e) { note(`${rel}: invalid JSON-LD (${e.message})`); }
  }
  jsonLdSeen[rel] = types;
  if (!isError) {
    if (rel === "/" && !(types.includes("LocalBusiness") && types.includes("WebSite") && types.includes("Organization"))) note(`${rel}: expected Organization + LocalBusiness + WebSite JSON-LD`);
    if (rel !== "/" && !types.includes("BreadcrumbList") && !/^\/(artists|music-lessons|contact|resources)\/$/.test(rel) === false && !types.includes("BreadcrumbList")) note(`${rel}: missing BreadcrumbList JSON-LD`);
    if (/^\/services\/[^/]+\/$/.test(rel) && !types.includes("Service")) note(`${rel}: service page without Service JSON-LD`);
    if (/^\/resources\/[^/]+\/$/.test(rel) && !types.includes("Article")) note(`${rel}: guide without Article JSON-LD`);
    if (rel === "/artists/" && !(types.includes("MusicGroup") && types.includes("MusicRecording"))) note(`${rel}: missing MusicGroup / MusicRecording JSON-LD`);
  }

  for (const m of html.matchAll(/<img\s[^>]*>/g)) {
    const alt = attr(m[0], "alt");
    if (alt === null) note(`${rel}: img without alt`);
    else if (alt && /\b(image|photo|picture) of\b/i.test(alt)) note(`${rel}: alt text starts with filler ("${alt.slice(0, 40)}")`);
    else if (alt.length > 140) note(`${rel}: alt text too long (${alt.length})`);
  }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) { const href = m[1]; const last = href.split("/").pop(); if (href !== "/" && !href.endsWith("/") && !last.includes(".")) note(`${rel}: internal link without trailing slash (301 on GitHub Pages): ${href}`); }
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) if (!exists(m[1])) note(`${rel}: broken internal reference ${m[1]}`);
  for (const bad of forbid) if (html.includes(bad)) note(`${rel}: contains forbidden "${bad}"`);
  for (const m of html.matchAll(/https?:\/\/(?:[a-z0-9-]+\.)*freshwindmusic[a-z0-9.-]*/gi)) if (new URL(m[0]).host !== siteHost) { note(`${rel}: another freshwindmusic domain appears (${m[0]})`); break; }
  rows.push({ rel, t: title.length, d: desc.length, h1: [...html.matchAll(/<h1[ >]/g)].length, kind: isError ? "error" : "page" });
}
for (const [t, rs] of titles) if (rs.length > 1) note(`duplicate title "${t}": ${rs.join(", ")}`);
for (const [d, rs] of descs) if (d && rs.length > 1) note(`duplicate description: ${rs.join(", ")}`);
for (const [c, rs] of canonicals) if (rs.length > 1) note(`duplicate canonical ${c}: ${rs.join(", ")}`);

// ---- sitemap
const sm = existsSync(join(outDir, "sitemap.xml")) ? readFileSync(join(outDir, "sitemap.xml"), "utf8") : "";
const entries = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({ loc: (m[1].match(/<loc>([^<]+)/) || [])[1], mod: (m[1].match(/<lastmod>([^<]+)/) || [])[1] }));
if (!entries.length) note("sitemap.xml missing or empty");
const seen = new Set();
for (const e of entries) {
  if (!e.loc.startsWith(SITE)) note(`sitemap URL on wrong origin: ${e.loc}`);
  if (seen.has(e.loc)) note(`duplicate sitemap URL: ${e.loc}`); seen.add(e.loc);
  if (e.loc !== SITE + "/" && !e.loc.endsWith("/")) note(`sitemap URL without trailing slash: ${e.loc}`);
  if (!exists(e.loc.replace(SITE, "") || "/")) note(`sitemap URL has no page: ${e.loc}`);
  if (/\/_\/?$/.test(e.loc)) note(`sitemap lists placeholder page: ${e.loc}`);
  if (e.mod && new Date(e.mod) > new Date(Date.now() + 864e5)) note(`sitemap lastmod in the future: ${e.loc} ${e.mod}`);
}
const mods = entries.map((e) => e.mod?.slice(0, 10)).filter(Boolean);
const distinct = new Set(mods);
if (entries.length > 5 && distinct.size === 1) note(`every sitemap lastmod is the same date (${[...distinct][0]}); lastmod should reflect real changes`);
const today = new Date().toISOString().slice(0, 10);
if (entries.length > 5 && mods.filter((m) => m === today).length / entries.length > 0.8) note("more than 80% of sitemap lastmod values are today's date");
for (const rel of indexable) { const u = canonicalOf(rel); if (!entries.some((e) => e.loc === u)) note(`indexable page missing from sitemap: ${u}`); }
for (const r of redirects) if (entries.some((e) => e.loc.endsWith(r))) note(`sitemap lists redirect stub ${r}`);

// ---- robots
const robots = existsSync(join(outDir, "robots.txt")) ? readFileSync(join(outDir, "robots.txt"), "utf8") : "";
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) note("robots.txt does not reference the sitemap on the right origin");
if (/Disallow:\s*\/\s*$/m.test(robots)) note("robots.txt blocks the whole site");
if (/Disallow:.*(_next|images)/i.test(robots)) note("robots.txt blocks assets");

console.log(`Audited ${rows.length} HTML files (${indexable.length} indexable, ${redirects.length} redirect stub(s)) against ${SITE}`);
console.log(`Sitemap: ${entries.length} URLs, ${distinct.size} distinct lastmod date(s): ${[...distinct].sort().join(", ") || "none"}`);
for (const r of rows.filter((x) => x.kind === "page")) console.log(`  ${r.rel.padEnd(54)} title ${String(r.t).padStart(2)}  desc ${String(r.d).padStart(3)}  h1 ${r.h1}`);
console.log(issues.length ? `\n${issues.length} problem(s):\n` + issues.map((i) => " - " + i).join("\n") : "\nNo problems found.");
process.exit(issues.length ? 1 : 0);

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { artists, getArtist, getArtistTracks, projects } from "@/content";
import { relationshipLabels } from "@/content/types";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/site/section";
import { TrackPlayer } from "@/components/media/track-player";
import { ProjectCard } from "@/components/site/project-card";
import { CtaBand } from "@/components/site/cta-band";

export const dynamicParams = false;
export const generateStaticParams = () => artists.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArtist((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: `${a.name} — Artist Profile`, description: a.shortBio, path: `/artists/${a.slug}`, image: a.coverImage ?? a.profileImage });
}

const linkClass = "inline-flex items-center gap-2 rounded-sm border border-line px-4 py-2 text-sm text-cream transition-colors hover:border-amber hover:text-amber";

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const artist = getArtist((await params).slug);
  if (!artist) notFound();
  const tracks = getArtistTracks(artist.id).sort((a, b) => Number(b.featured) - Number(a.featured));
  const artistProjects = projects.filter((p) => p.artistId === artist.id);
  const rel = relationshipLabels[artist.relationship];
  const links = [...artist.platformLinks, ...artist.socialLinks];

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line-soft">
        {artist.coverImage && (
          <div className="absolute inset-0 -z-10">
            <Image src={artist.coverImage} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
          </div>
        )}
        <div className="container-x flex flex-col gap-10 pb-16 pt-36 sm:pt-44 md:flex-row md:items-end">
          <div className="relative aspect-[4/5] w-48 shrink-0 overflow-hidden rounded-sm border border-line sm:w-60">
            <Image src={artist.profileImage} alt={`${artist.name} — profile photograph`} fill priority sizes="240px" className="object-cover" />
          </div>
          <div>
            <Link href="/artists" className="text-sm text-muted hover:text-amber">← All artists</Link>
            <Badge className="mt-6 block w-fit border-amber/40 bg-ink/60 text-amber">{rel.label}</Badge>
            <h1 className="display mt-4 text-5xl sm:text-7xl">{artist.name}</h1>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-amber">{artist.genres.join(" · ")}</p>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <h2 className="eyebrow mb-4">Biography</h2>
            <div className="prose-fw">{artist.biography.split("\n\n").map((p) => (<p key={p}>{p}</p>))}</div>
            {links.length > 0 && (
              <ul className="mt-8 flex flex-wrap gap-3">
                {links.map((l) => (
                  <li key={l.href}><a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{l.label} <ExternalLink className="size-3.5" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a></li>
                ))}
              </ul>
            )}
          </div>
          <aside className="h-fit rounded-sm border border-line bg-surface-soft p-7">
            <h2 className="eyebrow mb-4">Working relationship</h2>
            <p className="font-medium text-cream">{rel.label}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{rel.description}</p>
            {artist.contributionSummary && (<><h3 className="eyebrow mb-3 mt-6">Fresh Wind Music&apos;s contribution</h3><p className="text-sm leading-relaxed text-cream/90">{artist.contributionSummary}</p></>)}
          </aside>
        </div>
      </Section>

      <Section tone="soft">
        <h2 className="display text-4xl sm:text-5xl">Music</h2>
        {tracks.length === 0 ? (
          <p className="mt-6 text-muted">Releases for this artist have not been added yet.</p>
        ) : (
          <ul className="mt-10 grid gap-6 lg:grid-cols-2">
            {tracks.map((t) => (
              <li key={t.id}>
                <TrackPlayer id={`track-${t.id}`} title={t.title} subtitle={t.releaseYear ? String(t.releaseYear) : undefined} platform={t.platform} embedUrl={t.embedUrl} audioUrl={t.audioUrl} artwork={t.artwork} listenUrl={t.listenUrl} />
                {t.description && <p className="mt-3 text-sm text-muted">{t.description}</p>}
                {t.creditsConfirmed && t.credits.length > 0 && <p className="mt-2 text-xs uppercase tracking-[0.14em] text-amber">Fresh Wind Music: {t.credits.join(" · ")}</p>}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {artistProjects.length > 0 && (
        <Section>
          <h2 className="display text-4xl sm:text-5xl">Projects</h2>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{artistProjects.map((p) => (<li key={p.id}><ProjectCard project={p} /></li>))}</ul>
        </Section>
      )}
      <CtaBand topic="production" title="Create your own record." label="Discuss Your Project" text="Tell us about your music on WhatsApp and we will take it from there." />
    </>
  );
}

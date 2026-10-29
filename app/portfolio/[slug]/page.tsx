import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { getArtist, getProject, projects } from "@/content";
import { Section } from "@/components/site/section";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { TrackPlayer } from "@/components/media/track-player";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";

export const dynamicParams = false;
export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: `${p.title} — ${p.category}`, description: p.description, path: `/portfolio/${p.slug}`, image: p.artwork });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  const artist = project.artistId ? getArtist(project.artistId) : undefined;

  return (
    <>
      <section className="border-b border-line-soft pt-32 sm:pt-40">
        <div className="container-x grid items-end gap-12 pb-16 lg:grid-cols-2">
          <div>
            <Link href="/portfolio" className="text-sm text-muted hover:text-amber">← Back to portfolio</Link>
            <Badge className="mt-8 border-amber/40 text-amber">{project.category}</Badge>
            <h1 className="display mt-5 text-5xl sm:text-6xl">{project.title}</h1>
            {project.artistName && (
              <p className="mt-4 text-lg text-cream/80">
                {artist ? <Link href={`/artists/${artist.slug}`} className="hover:text-amber">{project.artistName}</Link> : project.artistName}
                {project.year ? ` · ${project.year}` : ""}
              </p>
            )}
            <p className="mt-6 max-w-xl leading-relaxed text-muted">{project.description}</p>
          </div>
          {project.artwork && (
            <div className="relative aspect-square overflow-hidden rounded-sm border border-line">
              <Image src={project.artwork} alt={`${project.title} — project artwork`} fill priority sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            {project.contributionConfirmed && project.contribution && (
              <>
                <h2 className="eyebrow mb-4">Fresh Wind Music&apos;s contribution</h2>
                <p className="leading-relaxed text-cream/90">{project.contribution}</p>
              </>
            )}
          </div>
          <div>
            <h2 className="eyebrow mb-4">Listen</h2>
            {project.platform ? (
              <TrackPlayer id={`project-${project.id}`} title={project.title} subtitle={project.artistName} platform={project.platform} embedUrl={project.embedUrl} audioUrl={project.audioUrl} artwork={project.artwork} listenUrl={project.listenUrl} />
            ) : project.listenUrl ? null : (
              <p className="text-muted">A preview for this project has not been published yet.</p>
            )}
            {!project.platform && project.listenUrl && (
              <a href={project.listenUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>Listen externally <ExternalLink aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
            )}
          </div>
        </div>
        <div className="mt-14"><WhatsAppButton topic="production">Start a similar project</WhatsAppButton></div>
      </Section>
      <CtaBand />
    </>
  );
}

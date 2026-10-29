import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Mic2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { lessonTypes } from "@/content/lessons";
import { equipmentCategories } from "@/content/equipment";
import { featuredArtists, featuredProjects, getArtistTracks, tracks } from "@/content";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeading } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { ServiceCard } from "@/components/site/service-card";
import { ArtistCard } from "@/components/site/artist-card";
import { ProjectCard } from "@/components/site/project-card";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { EmptyState } from "@/components/site/empty-state";

export const metadata = pageMetadata({
  title: "Fresh Wind Music | Music Production, Mixing & Mastering and Music Lessons in Johannesburg",
  description:
    "Johannesburg music production, audio mixing and mastering, songwriting, vocal coaching and piano, keyboard and music production lessons. Fresh Wind Music — where music finds its voice.",
  path: "/",
});

export default function HomePage() {
  const projects = featuredProjects().slice(0, 3);
  const artists = featuredArtists().slice(0, 4);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SiteImage name="controlRoomSession" sizes="100vw" priority alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/50" />
        </div>
        <div className="container-x pb-20 pt-40 sm:pb-28">
          <p className="eyebrow mb-6">Music production · Audio engineering · Music education</p>
          <h1 className="display max-w-4xl text-5xl sm:text-7xl lg:text-8xl">Where Music Finds Its Voice.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            From music production and professional audio engineering to artist development and music education, Fresh Wind Music helps musicians bring their creative vision to life.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <WhatsAppButton topic="production" size="lg">Discuss Your Project</WhatsAppButton>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>Explore Our Services</Link>
          </div>
          <p className="mt-10 text-sm tracking-wide text-muted">Based in {site.address.suburb}, {site.address.city}</p>
        </div>
      </section>

      {/* 2. Introduction */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Welcome to Fresh Wind Music" title={<>A music business for every stage of the journey.</>} />
            <div className="prose-fw mt-6">
              <p>Fresh Wind Music is a Johannesburg-based music production and education business. We work with musicians at different stages of their journey — from someone learning their first instrument to an artist developing and producing original music.</p>
              <p>That means two equally important sides to what we do: professional production and engineering for artists, and patient, practical music education for students.</p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Link href="/services" className="group rounded-sm border border-line bg-surface-soft p-6 transition-colors hover:border-amber/60">
                <Mic2 className="mb-4 size-6 text-amber" aria-hidden="true" />
                <h3 className="display text-2xl">For artists</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Production, recording, mixing and mastering, songwriting and artist development.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-amber">View services <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link href="/music-lessons" className="group rounded-sm border border-line bg-surface-soft p-6 transition-colors hover:border-amber/60">
                <GraduationCap className="mb-4 size-6 text-amber" aria-hidden="true" />
                <h3 className="display text-2xl">For students</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Piano, keyboard, theory and music production lessons for beginners and developing musicians.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-amber">Explore lessons <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line">
              <SiteImage name="consolePortrait" sizes="(min-width:1024px) 45vw, 100vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 3. Services */}
      <Section tone="soft">
        <Reveal><SectionHeading eyebrow="What we do" title="Services built around your music" text="Six areas of work, each with clear detail on what is involved and how to start an enquiry." /></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (<Reveal key={s.slug} delay={(i % 3) * 0.08}><ServiceCard service={s} /></Reveal>))}
        </div>
        <p className="mt-10 text-sm text-muted">Pricing depends on the nature, scope and requirements of each project — <Link href="/services" className="text-amber underline underline-offset-4 hover:text-amber-soft">see how quotations work</Link>.</p>
      </Section>

      {/* 4. Featured portfolio */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><SectionHeading eyebrow="Portfolio" title="Selected work" /></Reveal>
          <Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>View the portfolio</Link>
        </div>
        <div className="mt-12">
          {projects.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => (<li key={p.id}><ProjectCard project={p} /></li>))}</ul>
          ) : (
            <EmptyState title="Our portfolio is being curated" action={<Link href="/portfolio" className={buttonVariants({ variant: "outline" })}>See portfolio categories</Link>}>
              Selected productions, mixes, compositions and performances will be published here as they are confirmed and cleared for release.
            </EmptyState>
          )}
        </div>
      </Section>

      {/* 5. Artists */}
      <Section tone="soft">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><SectionHeading eyebrow="Artists we've worked with" title="The people behind the music" /></Reveal>
          <Link href="/artists" className={buttonVariants({ variant: "outline" })}>Browse all artists</Link>
        </div>
        <div className="mt-12">
          {artists.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {artists.map((a) => {
                const featured = tracks.find((t) => t.id === a.featuredTrackId) ?? getArtistTracks(a.id)[0];
                return (<li key={a.id}><ArtistCard artist={a} featuredTitle={featured?.title} /></li>);
              })}
            </ul>
          ) : (
            <EmptyState title="Artist profiles are on their way" action={<WhatsAppButton topic="featured" variant="outline">Discuss your project</WhatsAppButton>}>
              A curated catalogue of the artists Fresh Wind Music has worked with — with their music, credits and links — will appear here once each artist and credit is confirmed.
            </EmptyState>
          )}
        </div>
      </Section>

      {/* 6. Music education */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative order-last aspect-[4/3] overflow-hidden rounded-sm border border-line lg:order-first">
            <SiteImage name="liveRoomPiano" sizes="(min-width:1024px) 45vw, 100vw" />
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading eyebrow="Music education" title="Learn to play, write and produce." text="Lessons for beginners and developing musicians, arranged by enquiry so they fit the student." />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {lessonTypes.map((l) => (
                <li key={l.title} className="flex items-start gap-3 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />{l.title}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <WhatsAppButton topic="lessons" size="lg">Enquire About Lessons</WhatsAppButton>
              <Link href="/music-lessons" className={buttonVariants({ variant: "outline", size: "lg" })}>About the lessons</Link>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 7. Studio */}
      <Section tone="soft">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><SectionHeading eyebrow="Studio & equipment" title="Where the work happens" text="A look inside the control room — the mixing console, outboard processing and monitoring behind the sound." /></Reveal>
          <Link href="/studio" className={buttonVariants({ variant: "outline" })}>Explore the studio</Link>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-sm border border-line md:row-span-2 md:aspect-auto"><SiteImage name="controlRoomSession" sizes="(min-width:768px) 33vw, 100vw" /></Reveal>
          <Reveal delay={0.08} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line md:col-span-2"><SiteImage name="consoleWide" sizes="(min-width:768px) 66vw, 100vw" /></Reveal>
          <Reveal delay={0.16} className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line md:col-span-2"><SiteImage name="consolePortrait" sizes="(min-width:768px) 66vw, 100vw" /></Reveal>
        </div>
      </Section>

      {/* 8. Recommended equipment */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SectionHeading eyebrow="Recommended equipment" title="Gear we'd point you to." text={`Fresh Wind Music has partnered with ${site.partner.name}, our equipment retail partner, to share a curated selection of keyboards, interfaces, monitors, microphones and more.`} />
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">Fresh Wind Music does not sell or stock this equipment — products are purchased directly from {site.partner.name}.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/recommended-equipment" className={buttonVariants({ size: "lg" })}>View recommendations</Link>
              <WhatsAppButton topic="equipment" variant="outline" size="lg">Ask for advice</WhatsAppButton>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {equipmentCategories.slice(0, 6).map((c) => (<li key={c.title} className="rounded-sm border border-line bg-surface-soft p-4 text-sm text-cream/90">{c.title}</li>))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* 9. Final CTA */}
      <CtaBand />
    </>
  );
}

import Link from "next/link";
import { ArrowRight, Check, GraduationCap, Mic2 } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { getService, servicesInGroup } from "@/content/services";
import { lessonTypes } from "@/content/lessons";
import { featuredArtists, getArtistTracks, tracks } from "@/content";
import { site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/site/reveal";
import { Section, SectionHeading } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { ServiceCard } from "@/components/site/service-card";
import { ServiceIcon } from "@/components/site/service-icon";
import { ArtistCard } from "@/components/site/artist-card";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { EmptyState } from "@/components/site/empty-state";

export const metadata = pageMetadata({
  title: "Recording Studio South Africa | Fresh Wind Music",
  description:
    "Johannesburg recording studio for albums, EPs, choirs, gospel and single songs. Artists, churches, schools and universities welcome across South Africa.",
  path: "/",
});

export default function HomePage() {
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
          <p className="eyebrow mb-6">Recording studio · Johannesburg, South Africa</p>
          <h1 className="display max-w-4xl text-5xl sm:text-7xl lg:text-8xl">Where Music Finds Its Voice.</h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-cream/80 sm:text-xl">
            Fresh Wind Music is a recording and music production studio in Johannesburg. Record your album, EP or choir project — or just one song. Artists, choirs, churches and schools are welcome from across South Africa.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <WhatsAppButton topic="recordingProject" size="lg">Discuss Your Recording Project</WhatsAppButton>
            <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>Explore Our Services</Link>
          </div>
          <p className="mt-10 text-sm tracking-wide text-muted">Based in {site.address.suburb}, {site.address.city}</p>
        </div>
      </section>

      {/* 2. Introduction */}
      <Section>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Welcome to Fresh Wind Music" title={<>A recording studio for every kind of music.</>} />
            <div className="prose-fw mt-6">
              <p>We record and produce albums, EPs and single songs for artists of every style, and we work with choirs, churches, schools and universities from across the country. The studio is in Johannesburg.</p>
              <p>Whether you are a first-time artist with one song, a choir preserving its repertoire or an established musician planning an album, you are welcome. We also teach piano, keyboard, music theory and music production.</p>
            </div>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <Link href="/services" className="group rounded-sm border border-line bg-surface-soft p-6 transition-colors hover:border-amber/60">
                <Mic2 className="mb-4 size-6 text-amber" aria-hidden="true" />
                <h3 className="display text-2xl">Record with us</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">Albums, EPs, choirs, gospel, jazz and single songs, with mixing and mastering.</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-amber">View recording services <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
              <Link href="/music-lessons" className="group rounded-sm border border-line bg-surface-soft p-6 transition-colors hover:border-amber/60">
                <GraduationCap className="mb-4 size-6 text-amber" aria-hidden="true" />
                <h3 className="display text-2xl">Learn with us</h3>
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

      {/* 3. What we record: albums & EPs first, then choirs, genres, singles */}
      <Section tone="soft">
        <Reveal><SectionHeading eyebrow="What we record" title="Albums and EPs, choirs and more" text="Full album and EP recording are our flagship projects. We are equally glad to record a choir, a worship team or a single song." /></Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {servicesInGroup("albums-eps").map((s, i) => (<Reveal key={s.slug} delay={i * 0.08}><ServiceCard service={s} /></Reveal>))}
        </div>

        <h3 className="display mt-20 text-3xl sm:text-4xl">Choir recording across South Africa</h3>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted">Our studio is in Johannesburg, and choirs from across South Africa are welcome. Record an album, an EP or selected songs.</p>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["school-choir-recording", "university-college-choir-recording", "church-choir-recording", "worship-team-recording"].map((slug) => {
            const sv = getService(slug)!;
            return (
              <li key={slug}>
                <Link href={sv.href} className="group flex h-full flex-col rounded-sm border border-line bg-ink p-6 transition-colors hover:border-amber/60">
                  <ServiceIcon name={sv.icon} className="mb-4 size-6 text-amber" />
                  <span className="display text-2xl group-hover:text-amber">{sv.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{sv.short}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-6"><Link href="/services/choir-recording-south-africa" className="inline-flex items-center gap-2 text-sm text-amber underline-offset-4 hover:underline">Choir recording in South Africa <ArrowRight className="size-4" aria-hidden="true" /></Link></p>

        <h3 className="display mt-20 text-3xl sm:text-4xl">Every style welcome</h3>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {["gospel-recording-production", "jazz-recording-production", "single-song-recording", "mixing-mastering"].map((slug) => {
            const sv = getService(slug)!;
            return (
              <li key={slug}>
                <Link href={sv.href} className="group flex h-full flex-col rounded-sm border border-line bg-ink p-6 transition-colors hover:border-amber/60">
                  <ServiceIcon name={sv.icon} className="mb-4 size-6 text-amber" />
                  <span className="display text-2xl group-hover:text-amber">{sv.title}</span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{sv.short}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mt-10 text-sm text-muted">Only need one song recorded? That is always welcome. Pricing depends on the nature, scope and requirements of each project. <Link href="/services" className="text-amber underline underline-offset-4 hover:text-amber-soft">See all services</Link>, including music production, songwriting and artist development.</p>
      </Section>

      {/* 5. Artists */}
      <Section tone="soft">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal><SectionHeading eyebrow="Artists & Music" title="Gospel voices, worship you can hear" /></Reveal>
          <Link href="/artists" className={buttonVariants({ variant: "outline" })}>Explore Artists & Music</Link>
        </div>
        <div className="mt-12">
          {artists.length ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {artists.map((a) => {
                const featured = tracks.find((t) => t.id === a.featuredTrackId) ?? getArtistTracks(a.id)[0];
                return (<li key={a.id}><ArtistCard artist={a} songTitle={featured?.title} /></li>);
              })}
            </ul>
          ) : (
            <EmptyState title="Artist profiles are on their way" action={<WhatsAppButton topic="featured" variant="outline">Discuss your project</WhatsAppButton>}>
              A curated catalogue of gospel and worship artists — with their music and links — will appear here once each artist is confirmed.
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

      {/* 9. Final CTA */}
      <CtaBand />
    </>
  );
}

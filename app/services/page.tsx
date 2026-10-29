import Link from "next/link";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { services, visibleItems } from "@/content/services";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { ServiceIcon } from "@/components/site/service-icon";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { buttonVariants } from "@/components/ui/button";

export const metadata = pageMetadata({
  title: "Music Production, Mixing & Mastering, Songwriting and Vocal Coaching Services — Johannesburg",
  description:
    "The full Fresh Wind Music services catalogue in Johannesburg: music production, recording, mixing and mastering, songwriting, vocal coaching, artist development and music lessons.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything your music needs, in one place."
        text="Music production, audio engineering, songwriting, vocal development, artist development and music education — from a Johannesburg-based team."
        image="burgundyControlRoom"
      >
        <WhatsAppButton size="lg">Enquire on WhatsApp</WhatsAppButton>
      </PageHero>

      <nav aria-label="Service categories" className="sticky top-20 z-30 border-b border-line-soft bg-ink/90 backdrop-blur-md">
        <ul className="container-x flex gap-6 overflow-x-auto py-4 text-sm whitespace-nowrap">
          {services.map((s) => (<li key={s.slug}><a href={`#${s.slug}`} className="text-muted transition-colors hover:text-amber">{s.title}</a></li>))}
        </ul>
      </nav>

      {services.map((s, i) => (
        <Section key={s.slug} id={s.slug} tone={i % 2 ? "soft" : "ink"} className="py-16 sm:py-24">
          <div className={`grid items-start gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-sm border border-line lg:sticky lg:top-44">
              <SiteImage name={s.image} sizes="(min-width:1024px) 45vw, 100vw" />
            </Reveal>
            <Reveal delay={0.08}>
              <ServiceIcon name={s.icon} className="mb-5 size-7 text-amber" />
              <h2 className="display text-4xl sm:text-5xl">{s.title}</h2>
              <div className="prose-fw mt-5">{s.intro.map((p) => (<p key={p}>{p}</p>))}</div>
              <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {visibleItems(s).map((it) => (
                  <li key={it.label} className="flex items-start gap-3 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />{it.label}</li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <WhatsAppButton topic={s.topic}>Enquire about {s.title.toLowerCase()}</WhatsAppButton>
                <Link href={s.href} className={buttonVariants({ variant: "outline" })}>{s.slug === "music-education" ? "Music lessons" : "Full details"}</Link>
              </div>
            </Reveal>
          </div>
        </Section>
      ))}

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading align="center" eyebrow="Pricing" title="Quotations based on your project" />
          <p className="mt-6 leading-relaxed text-muted">We do not publish fixed prices because every project is different. Pricing depends on the nature, scope and requirements of the work — the number of songs, the stage you are at, the amount of recording, editing or mixing involved and the timeline. Message us on WhatsApp and we will provide a quotation.</p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}

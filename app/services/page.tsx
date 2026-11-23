import { pageMetadata } from "@/lib/seo";
import { serviceGroups, servicesInGroup } from "@/content/services";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ServiceCard } from "@/components/site/service-card";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { Reveal } from "@/components/site/reveal";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";

export const metadata = pageMetadata({
  title: "Recording Studio Services South Africa",
  description:
    "Album, EP, choir, gospel, worship and jazz recording, plus single songs, mixing and mastering. Johannesburg studio welcoming clients across South Africa.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Services", path: "/services" }]} />
      <PageHero
        eyebrow="Recording & production services"
        title="Record your music, your way."
        text="Albums and EPs are our flagship projects, and we are just as glad to record a choir, a worship team or a single song. Our recording studio is in Johannesburg, and clients are welcome from across South Africa."
        image="burgundyControlRoom"
      >
        <WhatsAppButton topic="recordingProject" size="lg">Discuss Your Recording Project</WhatsAppButton>
      </PageHero>

      <nav aria-label="Service categories" className="sticky top-20 z-30 border-b border-line-soft bg-ink/90 backdrop-blur-md">
        <ul className="container-x flex gap-6 overflow-x-auto whitespace-nowrap py-4 text-sm">
          {serviceGroups.map((g) => (<li key={g.id}><a href={`#${g.id}`} className="text-muted transition-colors hover:text-amber">{g.title}</a></li>))}
        </ul>
      </nav>

      {serviceGroups.map((g, i) => (
        <Section key={g.id} id={g.id} tone={i % 2 ? "soft" : "ink"} className="py-16 sm:py-24">
          <Reveal><SectionHeading eyebrow={`0${i + 1}`} title={g.title} text={g.text} /></Reveal>
          <ul className={`mt-12 grid gap-6 md:grid-cols-2 ${servicesInGroup(g.id).length === 2 ? "" : "lg:grid-cols-3"}`}>
            {servicesInGroup(g.id).map((s, j) => (<li key={s.slug}><Reveal delay={(j % 3) * 0.08}><ServiceCard service={s} /></Reveal></li>))}
          </ul>
        </Section>
      ))}

      <Section>
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading align="center" eyebrow="Pricing" title="Quotations based on your project" />
          <p className="mt-6 leading-relaxed text-muted">We do not publish fixed prices because every project is different. Pricing depends on the nature, scope and requirements of the work — the number of songs, the size of the group, the amount of recording, editing and mixing involved, and the timeline. Message us on WhatsApp and we will provide a quotation. Recording takes place at our Johannesburg studio.</p>
        </div>
      </Section>
      <CtaBand topic="recordingProject" />
    </>
  );
}

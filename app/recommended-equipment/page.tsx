import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { equipmentCategories, equipmentProducts } from "@/content/equipment";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { EmptyState } from "@/components/site/empty-state";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";

export const metadata = pageMetadata({
  title: "Recommended Music Equipment — Keyboards, Monitors, Microphones and Interfaces",
  description:
    "Equipment recommended by Fresh Wind Music in Johannesburg: keyboards, digital pianos, MIDI controllers, studio monitors, headphones, microphones and audio interfaces for artists, producers and students.",
  path: "/recommended-equipment",
});

export default function EquipmentPage() {
  const products = equipmentProducts.filter((p) => p.published);
  return (
    <>
      <PageHero
        eyebrow="Recommended equipment"
        title="The right tools make better music."
        text="A curated selection of equipment we recommend to artists, producers and students — and honest advice on what suits your music, your space and your stage of learning."
        image="outboardRack"
      >
        <WhatsAppButton topic="equipment" size="lg">Ask for advice</WhatsAppButton>
      </PageHero>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="How we recommend" title="Advice first, gear second." />
          <div className="prose-fw">
            <p>This page is a curated guide to the kinds of equipment we recommend — not a shop. The right keyboard, interface or monitors depend on what you are making, where you are making it and how far along you are.</p>
            <p>Fresh Wind Music does not sell or stock equipment, and no prices or availability are shown here. Message us and we will point you in the right direction.</p>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Categories" title="What we recommend" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentCategories.map((c) => (
            <li key={c.title} className="rounded-sm border border-line bg-ink p-6">
              <h3 className="display text-2xl text-amber">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow="Featured picks" title="Recommended products" />
        <div className="mt-12">
          {products.length === 0 ? (
            <EmptyState title="Product recommendations coming soon" action={<WhatsAppButton topic="equipment" variant="outline">Ask for advice</WhatsAppButton>}>
              Individual products, with their images and links, will be added here. In the meantime, message us and we will point you to the right equipment for your needs.
            </EmptyState>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <li key={p.id} className="overflow-hidden rounded-sm border border-line bg-surface-soft">
                  <div className="relative aspect-square bg-cream"><Image src={p.image} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-contain p-4" /></div>
                  <div className="p-5">
                    <p className="text-xs uppercase tracking-[0.14em] text-amber">{p.category}</p>
                    <h3 className="mt-2 font-medium">{p.name}</h3>
                    {p.note && <p className="mt-2 text-sm text-muted">{p.note}</p>}
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-amber hover:underline">View product <ExternalLink className="size-3.5" aria-hidden="true" /><span className="sr-only">(opens in a new tab)</span></a>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>
      <CtaBand topic="equipment" title="Not sure what you need?" text="Tell us what you are making or learning and we will recommend where to start." label="Ask on WhatsApp" />
    </>
  );
}

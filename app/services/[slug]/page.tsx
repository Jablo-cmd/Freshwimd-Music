import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { getService, services, visibleItems } from "@/content/services";
import { site } from "@/content/site";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { buttonVariants } from "@/components/ui/button";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.filter((s) => s.href.startsWith("/services/")).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.metaTitle, description: service.metaDescription, path: service.href });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          url: `${site.url}${service.href}`,
          provider: { "@id": `${site.url}/#business` },
          areaServed: { "@type": "City", name: "Johannesburg" },
        }}
      />
      <PageHero eyebrow="Service" title={service.title} text={service.short} image={service.image}>
        <WhatsAppButton topic={service.topic} size="lg">Enquire on WhatsApp</WhatsAppButton>
        <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>All services</Link>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div className="prose-fw">{service.intro.map((p) => (<p key={p}>{p}</p>))}</div>
          <div>
            <h2 className="eyebrow mb-5">What&apos;s included</h2>
            <ul className="space-y-3">
              {visibleItems(service).map((it) => (<li key={it.label} className="flex items-start gap-3 border-b border-line-soft pb-3 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />{it.label}</li>))}
            </ul>
          </div>
        </div>
      </Section>

      {service.callouts && (
        <Section tone="soft">
          <SectionHeading eyebrow="Understanding the process" title="Mixing, mastering and why finishing matters" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {service.callouts.map((c) => (
              <div key={c.title} className="rounded-sm border border-line bg-ink p-7">
                <h3 className="display text-3xl text-amber">{c.title}</h3>
                <p className="mt-4 leading-relaxed text-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone={service.callouts ? "ink" : "soft"}>
        <SectionHeading eyebrow="How it works" title="From first message to final delivery" />
        <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {service.process.map((step, i) => (
            <li key={step.title} className="rounded-sm border border-line p-6">
              <span className="display text-4xl text-amber">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted">Pricing is enquiry-based and depends on the nature, scope and requirements of your project. We will confirm a quotation before work begins.</p>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="More services" title="Explore the rest of Fresh Wind Music" />
        <ul className="mt-10 flex flex-wrap gap-3">
          {others.map((s) => (<li key={s.slug}><Link href={s.href} className={buttonVariants({ variant: "outline", size: "sm" })}>{s.title}</Link></li>))}
        </ul>
      </Section>
      <CtaBand topic={service.topic} />
    </>
  );
}

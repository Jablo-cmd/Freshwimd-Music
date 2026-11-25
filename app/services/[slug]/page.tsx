import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MapPin } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { getService, services, visibleItems } from "@/content/services";
import { site } from "@/content/site";
import { absUrl } from "@/lib/url";
import { articles } from "@/content/resources";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { RichText } from "@/components/site/rich-text";
import { ServiceIcon } from "@/components/site/service-icon";
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
  const related = (service.related ?? []).map((r) => getService(r)).filter(Boolean) as typeof services;
  const guides = (service.guides ?? []).map((g) => articles.find((a) => a.slug === g)).filter(Boolean) as typeof articles;

  // Alternate section backgrounds without ever repeating one twice in a row
  let flip = false;
  const tone = () => ((flip = !flip) ? "ink" : "soft") as "ink" | "soft";

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.metaDescription,
          url: absUrl(service.href),
          provider: { "@id": `${site.url}/#business` },
          areaServed: [{ "@type": "City", name: "Johannesburg" }, { "@type": "Country", name: "South Africa" }],
        }}
      />
      <BreadcrumbJsonLd items={[{ name: "Services", path: "/services" }, { name: service.title, path: service.href }]} />
      {service.faqs && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: service.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      )}

      <PageHero eyebrow={service.group === "choirs" ? "Choir recording" : "Recording & production"} title={service.title} text={service.short} image={service.image}>
        <WhatsAppButton topic={service.topic} size="lg">Enquire on WhatsApp</WhatsAppButton>
        <Link href="/services" className={buttonVariants({ variant: "outline", size: "lg" })}>All services</Link>
      </PageHero>

      <Section tone={tone()}>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <div className="prose-fw">{service.intro.map((p) => (<p key={p}>{p}</p>))}</div>
            {service.regionNote && (
              <p className="mt-8 flex items-start gap-3 rounded-sm border border-amber/30 bg-surface-soft p-5 text-sm leading-relaxed text-cream/90">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
                <span>{service.regionNote} Find the <Link href="/contact" className="text-amber underline underline-offset-4">recording studio in Johannesburg</Link>.</span>
              </p>
            )}
          </div>
          <div>
            <h2 className="eyebrow mb-5">What&apos;s included</h2>
            <ul className="space-y-3">
              {visibleItems(service).map((it) => (
                <li key={it.label} className="flex items-start gap-3 border-b border-line-soft pb-3 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />{it.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {service.sections?.map((sec) => (
        <Section key={sec.heading} tone={tone()} className="py-16 sm:py-20">
          <div className="max-w-3xl">
            <h2 className="display text-3xl sm:text-4xl">{sec.heading}</h2>
            {sec.paragraphs && <div className="prose-fw mt-5">{sec.paragraphs.map((p) => (<p key={p}><RichText text={p} /></p>))}</div>}
            {sec.list && (
              <ul className="mt-6 space-y-3">
                {sec.list.map((l) => (<li key={l} className="flex items-start gap-3 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" /><span><RichText text={l} /></span></li>))}
              </ul>
            )}
          </div>
        </Section>
      ))}

      {service.audience && (
        <Section tone={tone()}>
          <SectionHeading eyebrow="Who it's for" title={`Who ${service.title} suits`} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {service.audience.map((a) => (<li key={a} className="flex items-start gap-3 rounded-sm border border-line bg-ink p-5 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />{a}</li>))}
          </ul>
        </Section>
      )}

      {service.callouts && (
        <Section tone={tone()}>
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

      <Section tone={tone()}>
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

      {service.faqs && (
        <Section tone={tone()}>
          <SectionHeading eyebrow="Questions" title="Frequently asked questions" />
          <div className="mt-10 max-w-3xl divide-y divide-line-soft border-y border-line-soft">
            {service.faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                  {f.q}<span className="text-amber transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section tone={tone()}>
          <SectionHeading eyebrow="Related" title="Related recording services" />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={r.href} className="group flex h-full gap-4 rounded-sm border border-line bg-ink p-5 transition-colors hover:border-amber/50">
                  <ServiceIcon name={r.icon} className="mt-1 size-5 shrink-0 text-amber" />
                  <span><span className="display block text-2xl group-hover:text-amber">{r.title}</span><span className="mt-1 block text-sm leading-relaxed text-muted">{r.short}</span></span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {guides.length > 0 && (
        <Section tone={tone()}>
          <SectionHeading eyebrow="Guides" title="Helpful reading" />
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {guides.map((g) => (<li key={g.slug}><Link href={`/resources/${g.slug}`} className="block h-full rounded-sm border border-line bg-ink p-6 transition-colors hover:border-amber/50"><span className="display text-2xl">{g.title}</span><span className="mt-2 block text-sm text-muted">{g.description}</span></Link></li>))}
          </ul>
        </Section>
      )}

      <CtaBand topic={service.topic} title="Ready to start your project?" text="Message us on WhatsApp with a few details about your project and we will take it from there." label="Enquire on WhatsApp" />
    </>
  );
}

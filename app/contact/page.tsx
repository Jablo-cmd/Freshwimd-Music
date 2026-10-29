import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { fullAddress, mapsEmbed, mapsLink, site } from "@/content/site";
import { whatsappFor, whatsappMessages } from "@/lib/whatsapp";
import { services } from "@/content/services";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { EnquiryForm } from "@/components/site/enquiry-form";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { buttonVariants } from "@/components/ui/button";
import { JsonLd } from "@/components/site/json-ld";

export const metadata = pageMetadata({
  title: "Contact — Music Production & Lessons in Johannesburg",
  description:
    "Contact Fresh Wind Music at 60 Goud St, City and Suburban, Johannesburg. WhatsApp 063 122 6552 for music production, mixing and mastering, songwriting, vocal coaching and lessons.",
  path: "/contact",
});

const quick = [
  { label: "Music production", topic: "production" },
  { label: "Mixing & mastering", topic: "mixingMastering" },
  { label: "Songwriting", topic: "songwriting" },
  { label: "Vocal coaching", topic: "vocal" },
  { label: "Music lessons", topic: "lessons" },
  { label: "General enquiry", topic: "general" },
] as const;

const row = "flex gap-4";
const link = "text-cream transition-colors hover:text-amber";

export default function ContactPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: "Contact Fresh Wind Music", url: `${site.url}/contact`, about: { "@id": `${site.url}/#business` } }} />
      <PageHero eyebrow="Contact" title="Let's talk about your music." text="WhatsApp is the quickest way to enquire or book. Choose a topic below and your message is ready to send." image="consolePortrait">
        <WhatsAppButton size="lg" topic="general">Start a Conversation on WhatsApp</WhatsAppButton>
      </PageHero>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Get in touch" title="Fresh Wind Music" as="h2" />
            <ul className="mt-10 space-y-6">
              <li className={row}><MessageCircle className="mt-1 size-5 shrink-0 text-amber" aria-hidden="true" /><div><p className="eyebrow mb-1">WhatsApp</p><a href={whatsappFor("general")} target="_blank" rel="noopener noreferrer" className={link}>{site.phone.display}<span className="sr-only"> (opens WhatsApp in a new tab)</span></a></div></li>
              <li className={row}><Phone className="mt-1 size-5 shrink-0 text-amber" aria-hidden="true" /><div><p className="eyebrow mb-1">Telephone</p><a href={site.phone.href} className={link}>{site.phone.display}</a></div></li>
              <li className={row}><Mail className="mt-1 size-5 shrink-0 text-amber" aria-hidden="true" /><div><p className="eyebrow mb-1">Email</p><a href={`mailto:${site.email}`} className={`${link} break-all`}>{site.email}</a></div></li>
              <li className={row}><MapPin className="mt-1 size-5 shrink-0 text-amber" aria-hidden="true" /><div><p className="eyebrow mb-1">Address</p><address className="not-italic text-cream">{site.address.street}<br />{site.address.suburb}<br />{site.address.city}, {site.address.postalCode}</address><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm text-amber hover:underline">Get directions<span className="sr-only"> to {fullAddress} (opens in a new tab)</span></a></div></li>
              <li className={row}><Clock className="mt-1 size-5 shrink-0 text-amber" aria-hidden="true" /><div><p className="eyebrow mb-1">Visits</p><p className="text-muted">Please get in touch before visiting so we can arrange a time.</p></div></li>
            </ul>
            <div className="mt-12">
              <h2 className="eyebrow mb-4">Enquire about a service</h2>
              <ul className="flex flex-wrap gap-2">
                {quick.map((q) => (
                  <li key={q.topic}><a href={whatsappFor(q.topic)} target="_blank" rel="noopener noreferrer" title={whatsappMessages[q.topic]} className={buttonVariants({ variant: "outline", size: "sm" })}>{q.label}<span className="sr-only"> (opens WhatsApp in a new tab)</span></a></li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted">Pricing is enquiry-based. It depends on the nature, scope and requirements of each project, so we provide a quotation once we understand what you need. Services: {services.map((s) => s.title).join(", ")}.</p>
            </div>
          </div>
          <div>
            <h2 className="display mb-8 text-4xl">Send an enquiry</h2>
            <EnquiryForm />
          </div>
        </div>
      </Section>

      <section aria-label="Map" className="border-t border-line-soft">
        <iframe src={mapsEmbed} title={`Map showing ${fullAddress}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[380px] w-full border-0 grayscale invert-[0.92] contrast-[0.9]" />
      </section>
    </>
  );
}

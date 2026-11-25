import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { mapsLink, site } from "@/content/site";
import { buttonVariants } from "@/components/ui/button";
import type { ImageKey } from "@/content/images";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { Reveal } from "@/components/site/reveal";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";

export const metadata = pageMetadata({
  title: "Recording Studio Johannesburg",
  description:
    "Fresh Wind Music's recording studio in City and Suburban, Johannesburg: albums, EPs, choirs and single songs. Clients welcome from across South Africa.",
  path: "/studio",
});

const gallery: { image: ImageKey; caption: string; span: string; aspect: string; sizes: string }[] = [
  { image: "controlRoomSession", caption: "The control room: console, monitoring and DAW screens, with the live room visible through the glass.", span: "md:col-span-2", aspect: "aspect-[16/10]", sizes: "(min-width:768px) 66vw, 100vw" },
  { image: "consolePortrait", caption: "At the mixing console, with outboard processing racked behind.", span: "", aspect: "aspect-[4/5]", sizes: "(min-width:768px) 33vw, 100vw" },
  { image: "consoleWide", caption: "A wide view across the large-format console and acoustic treatment.", span: "md:col-span-3", aspect: "aspect-[16/9]", sizes: "100vw" },
];

const details = [
  { title: "Mixing console", text: "A large-format analogue mixing console at the heart of the control room." },
  { title: "Monitoring", text: "Studio monitors for critical listening while mixing, alongside a DAW workstation with display screens." },
  { title: "Outboard processing", text: "Racks of outboard audio processing equipment beside the console." },
  { title: "Acoustic treatment", text: "An acoustically treated, wood-panelled control room with a window into the live room." },
];

export default function StudioPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Studio & Equipment", path: "/studio" }]} />
      <PageHero
        eyebrow="Recording studio · Johannesburg"
        title="A recording studio in Johannesburg."
        text="Fresh Wind Music records albums, EPs, choirs and single songs at our studio in Johannesburg. A look inside the control room — the console, processing and monitoring behind our recording, mixing and mastering work."
        image="controlRoomSession"
      >
        <WhatsAppButton topic="production" size="lg">Discuss Your Project</WhatsAppButton>
      </PageHero>

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {gallery.map((g, i) => (
            <Reveal key={g.image} delay={i * 0.06} className={g.span}>
              <figure>
                <div className={`relative overflow-hidden rounded-sm border border-line ${g.aspect}`}>
                  <SiteImage name={g.image} sizes={g.sizes} />
                </div>
                <figcaption className="mt-3 text-sm text-muted">{g.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Visit the studio" title="Where to find us" />
            <address className="mt-6 not-italic leading-relaxed text-cream/90">
              {site.name}<br />{site.address.street}<br />{site.address.suburb}<br />{site.address.city}, {site.address.postalCode}
            </address>
            <p className="mt-5 max-w-md leading-relaxed text-muted">Our recording studio is in Johannesburg. Please get in touch before visiting so we can arrange a time.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mapsLink} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline" })}>Get directions<span className="sr-only"> (opens in a new tab)</span></a>
              <WhatsAppButton topic="recordingProject">Discuss Your Recording Project</WhatsAppButton>
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Who records here" title="Clients from across South Africa" />
            <p className="mt-6 leading-relaxed text-muted">The studio is in Johannesburg, and artists and groups from across South Africa are welcome to enquire. We record independent artists, choirs, churches, schools and universities, worship teams and bands.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[["album-recording-production", "Album recording"], ["ep-recording-production", "EP recording"], ["choir-recording-south-africa", "Choir recording"], ["gospel-recording-production", "Gospel recording"], ["jazz-recording-production", "Jazz recording"], ["single-song-recording", "Single song recording"], ["mixing-mastering", "Mixing and mastering"], ["music-production", "Music production"]].map(([slug, label]) => (
                <li key={slug}><Link href={`/services/${slug}`} className="text-amber underline underline-offset-4 hover:text-amber-soft">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="In the control room" title="What you can see in the photographs" />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {details.map((d) => (
            <li key={d.title} className="rounded-sm border border-line bg-ink p-6">
              <h3 className="display text-2xl text-amber">{d.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{d.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">The equipment and facilities used on a project depend on its requirements and are confirmed with you when you enquire. Photography of the live room, keyboards and instruments will be added to this page.</p>
      </Section>
      <CtaBand topic="recordingProject" title="Ready to step into the room?" text="Tell us about your project on WhatsApp and we will discuss how we can work together." label="Discuss Your Recording Project" />
    </>
  );
}

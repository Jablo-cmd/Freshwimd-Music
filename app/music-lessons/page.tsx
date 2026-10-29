import { Check } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { enquiryChecklist, howItWorks, lessonFaqs, lessonTypes, pathways } from "@/content/lessons";
import { whatsappMessages } from "@/lib/whatsapp";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { SiteImage } from "@/components/site/site-image";
import { Reveal } from "@/components/site/reveal";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";

export const metadata = pageMetadata({
  title: "Music Lessons Johannesburg — Piano, Keyboard and Music Production Lessons",
  description:
    "Piano lessons, keyboard lessons, music theory and music production lessons in Johannesburg for beginners and developing musicians. Lessons are arranged by enquiry.",
  path: "/music-lessons",
});

export default function LessonsPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: lessonFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <PageHero
        eyebrow="Music lessons"
        title="Learn to play. Learn to create."
        text="Piano, keyboard, music theory, practical musicianship, music production and DAW training — for beginners, parents enquiring for their children, and developing musicians in Johannesburg."
        image="liveRoomPiano"
      >
        <WhatsAppButton topic="lessons" size="lg">Enquire About Lessons</WhatsAppButton>
      </PageHero>

      <Section>
        <Reveal><SectionHeading eyebrow="What you can learn" title="Lessons for every musical interest" /></Reveal>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessonTypes.map((l) => (
            <li key={l.title} className="rounded-sm border border-line bg-surface-soft p-7">
              <h3 className="display text-3xl">{l.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{l.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Pathways" title="From first notes to original music" text="Lessons are shaped around where the student is today and where they want to go." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {pathways.map((p) => (
            <div key={p.title} className="rounded-sm border border-line bg-ink p-8">
              <h3 className="display text-3xl text-amber">{p.title}</h3>
              <p className="mt-3 text-muted">{p.audience}</p>
              <ul className="mt-6 space-y-3">{p.points.map((pt) => (<li key={pt} className="flex items-start gap-3 text-cream/90"><Check className="mt-1 size-4 shrink-0 text-amber" aria-hidden="true" />{pt}</li>))}</ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="How lessons work" title="Simple to start" />
            <ol className="mt-10 space-y-6">
              {howItWorks.map((s, i) => (
                <li key={s.title} className="flex gap-5"><span className="display text-4xl text-amber">{String(i + 1).padStart(2, "0")}</span><div><h3 className="text-lg font-medium">{s.title}</h3><p className="mt-1 text-muted">{s.text}</p></div></li>
              ))}
            </ol>
            <p className="mt-8 text-sm text-muted">Lessons are enquiry-based, so there are no fixed public prices. Pricing and arrangements are confirmed with you directly.</p>
          </div>
          <div className="space-y-8">
            <div className="relative aspect-[16/10] overflow-hidden rounded-sm border border-line"><SiteImage name="producerSuiteKeys" sizes="(min-width:1024px) 45vw, 100vw" /></div>
            <div className="rounded-sm border border-line bg-surface-soft p-7">
              <h3 className="display text-3xl">What to include in your message</h3>
              <ul className="mt-5 space-y-3">{enquiryChecklist.map((c) => (<li key={c} className="flex items-start gap-3 text-sm text-cream/90"><Check className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />{c}</li>))}</ul>
              <div className="mt-7"><WhatsAppButton topic="lessonsGeneral">Enquire on WhatsApp</WhatsAppButton></div>
              <p className="mt-4 text-xs text-muted">Opens WhatsApp with: “{whatsappMessages.lessonsGeneral}”</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="soft">
        <SectionHeading eyebrow="Questions" title="Good to know" />
        <div className="mt-10 max-w-3xl divide-y divide-line-soft border-y border-line-soft">
          {lessonFaqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}<span className="text-amber transition-transform group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand topic="lessons" title="Start your musical journey." text="Message us on WhatsApp to enquire about piano, keyboard, theory or music production lessons." label="Enquire About Lessons" />
    </>
  );
}

import { pageMetadata } from "@/lib/seo";
import { artists, getArtistTracks, tracks } from "@/content";
import { relationshipLabels, type Relationship } from "@/content/types";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { ArtistCard } from "@/components/site/artist-card";
import { EmptyState } from "@/components/site/empty-state";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";

export const metadata = pageMetadata({
  title: "Artists We've Worked With",
  description:
    "A curated catalogue of the artists Fresh Wind Music has produced, collaborated with and supported — with their music, credits and official links.",
  path: "/artists",
});

const order: Relationship[] = ["produced", "collaborated", "supported"];

export default function ArtistsPage() {
  return (
    <>
      <PageHero
        eyebrow="Artists we've worked with"
        title="A catalogue of voices."
        text="Meet the artists associated with Fresh Wind Music. Each profile shows exactly how we were involved — produced, collaborated or supported — and where to listen."
        image="controlRoomSession"
      />
      <Section>
        {artists.length === 0 ? (
          <EmptyState title="Artist profiles are being added" action={<WhatsAppButton topic="featured" variant="outline">Discuss your project</WhatsAppButton>}>
            Each artist is published only with their permission and a confirmed description of Fresh Wind Music&apos;s involvement. Profiles, releases and credits will appear here shortly.
          </EmptyState>
        ) : (
          <div className="space-y-20">
            {order.map((rel) => {
              const list = artists.filter((a) => a.relationship === rel);
              if (!list.length) return null;
              return (
                <div key={rel}>
                  <SectionHeading as="h2" title={relationshipLabels[rel].label} text={relationshipLabels[rel].description} className="mb-10" />
                  <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {list.map((a) => {
                      const featured = tracks.find((t) => t.id === a.featuredTrackId) ?? getArtistTracks(a.id)[0];
                      return (<li key={a.id}><ArtistCard artist={a} featuredTitle={featured?.title} /></li>);
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
        <p className="mt-16 max-w-3xl border-t border-line-soft pt-8 text-sm leading-relaxed text-muted">Appearing on this page does not mean an artist is signed to, or represented by, Fresh Wind Music. Credits describe confirmed contributions only.</p>
      </Section>
      <CtaBand topic="production" title="Your music could be next." text="Whether you are starting out or established, tell us about your project on WhatsApp." label="Discuss Your Project" />
    </>
  );
}

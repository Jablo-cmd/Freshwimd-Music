import { pageMetadata } from "@/lib/seo";
import { artists, tracks } from "@/content";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { ArtistListenCard } from "@/components/site/artist-listen-card";
import { EmptyState } from "@/components/site/empty-state";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";

export const metadata = pageMetadata({
  title: "Artists & Music",
  description: "Gospel and worship artists featured by Fresh Wind Music. Listen to their featured songs.",
  path: "/artists",
});

export default function ArtistsPage() {
  return (
    <>
      <PageHero eyebrow="Artists & Music" title="Gospel voices. Worship you can hear." image="controlRoomSession" />
      <Section className="pt-16 sm:pt-20">
        {artists.length === 0 ? (
          <EmptyState as="h2" title="Artists are being added" action={<WhatsAppButton topic="featured" variant="outline">Discuss your project</WhatsAppButton>}>
            Featured artists and their music will appear here shortly.
          </EmptyState>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {artists.map((a) => (
              <li key={a.id}><ArtistListenCard artist={a} track={tracks.find((t) => t.id === a.featuredTrackId) ?? tracks.find((t) => t.artistId === a.id)} /></li>
            ))}
          </ul>
        )}
        <p className="mt-12 text-xs leading-relaxed text-muted">Music plays from the artists&apos; official uploads. Featuring an artist does not imply a signing or a production credit.</p>
      </Section>
      <CtaBand topic="featured" title="Have music to share?" text="Talk to us on WhatsApp about your project, your music and being featured." label="Start a Conversation on WhatsApp" />
    </>
  );
}

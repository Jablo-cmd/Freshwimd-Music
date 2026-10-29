import { pageMetadata } from "@/lib/seo";
import { projects } from "@/content";
import { portfolioCategories } from "@/content/types";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { PortfolioGrid } from "@/components/site/portfolio-grid";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";

export const metadata = pageMetadata({
  title: "Portfolio — Music Production, Mixing and Mastering Projects",
  description:
    "Selected music production, mixing and mastering, songwriting, vocal production and performance projects from Fresh Wind Music, Johannesburg.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Listen to the work."
        text={`Productions, mixes, compositions and performances across ${portfolioCategories.length} categories. Every project listed here is real work, published with permission.`}
        image="vintageControlRoom"
      >
        <WhatsAppButton topic="production" size="lg">Discuss Your Project</WhatsAppButton>
      </PageHero>
      <Section>
        <PortfolioGrid projects={projects} />
      </Section>
      <CtaBand topic="production" title="Have a project in mind?" text="Tell us about it on WhatsApp and we will take it from there." label="Discuss Your Project" />
    </>
  );
}

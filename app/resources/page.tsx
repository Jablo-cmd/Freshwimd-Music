import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { articles } from "@/content/resources";
import { getService } from "@/content/services";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { CtaBand } from "@/components/site/cta-band";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";

export const metadata = pageMetadata({
  title: "Recording Guides & Resources",
  description: "Practical guides on recording an album or EP, preparing a choir, school and church recording projects, and mixing and mastering.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Guides & Resources", path: "/resources" }]} />
      <PageHero eyebrow="Guides & resources" title="Know before you record." text="Plain-language guides to recording an album or EP, preparing a choir, planning school and church projects, and mixing and mastering." image="vintageControlRoom" />
      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {articles.map((a) => {
            const service = getService(a.service);
            return (
              <li key={a.slug}>
                <article className="group relative h-full rounded-sm border border-line bg-surface-soft p-7 transition-colors hover:border-amber/50">
                  {service && <p className="eyebrow mb-3">{service.title}</p>}
                  <h2 className="display text-3xl">
                    <Link href={`/resources/${a.slug}`} className="after:absolute after:inset-0 hover:text-amber">{a.title}</Link>
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">{a.description}</p>
                  <p className="mt-5 inline-flex items-center gap-2 text-sm text-amber">{a.readMinutes} min read <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></p>
                </article>
              </li>
            );
          })}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}

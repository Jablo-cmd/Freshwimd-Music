import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { absUrl } from "@/lib/url";
import { articles, getArticle } from "@/content/resources";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { Section } from "@/components/site/section";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { CtaBand } from "@/components/site/cta-band";
import { JsonLd } from "@/components/site/json-ld";
import { BreadcrumbJsonLd } from "@/components/site/breadcrumb-json-ld";
import { buttonVariants } from "@/components/ui/button";

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const a = getArticle((await params).slug);
  if (!a) return {};
  return pageMetadata({ title: a.metaTitle ?? a.title, description: a.description, path: `/resources/${a.slug}`, type: "article", publishedTime: a.published, modifiedTime: a.updated });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const service = getService(article.service);
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Guides & Resources", path: "/resources" }, { name: article.title, path: `/resources/${article.slug}` }]} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.published,
          dateModified: article.updated,
          mainEntityOfPage: absUrl(`/resources/${article.slug}`),
          author: { "@type": "Organization", name: site.name, url: absUrl("/") },
          publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/site/logo-full.jpg` } },
          image: `${site.url}/og-image.jpg`,
        }}
      />
      <header className="border-b border-line-soft pt-32 sm:pt-40">
        <div className="container-x max-w-3xl pb-14">
          <Link href="/resources" className="text-sm text-muted hover:text-amber">← Guides &amp; resources</Link>
          <h1 className="display mt-6 text-4xl sm:text-6xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">{article.description}</p>
          <p className="mt-5 text-xs uppercase tracking-[0.16em] text-muted">{article.readMinutes} min read · Updated {new Date(article.updated).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </header>
      <Section>
        <article className="mx-auto max-w-3xl">
          {article.sections.map((s, i) => (
            <section key={i} className={i ? "mt-12" : ""}>
              {s.heading && <h2 className="display text-3xl sm:text-4xl">{s.heading}</h2>}
              <div className="prose-fw mt-4">{s.paragraphs?.map((p) => (<p key={p}>{p}</p>))}</div>
              {s.list && <ul className="mt-4 list-disc space-y-2 pl-6 text-[1.02rem] leading-relaxed text-muted marker:text-amber">{s.list.map((l) => (<li key={l}>{l}</li>))}</ul>}
            </section>
          ))}
          {service && (
            <aside className="mt-16 rounded-sm border border-line bg-surface-soft p-8">
              <p className="eyebrow mb-3">Need help?</p>
              <h2 className="display text-3xl">{service.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{service.short}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <WhatsAppButton topic={service.topic}>Enquire on WhatsApp</WhatsAppButton>
                <Link href={service.href} className={buttonVariants({ variant: "outline" })}>About this service</Link>
              </div>
            </aside>
          )}
        </article>
      </Section>
      <Section tone="soft">
        <h2 className="display text-3xl sm:text-4xl">More guides</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {more.map((a) => (<li key={a.slug}><Link href={`/resources/${a.slug}`} className="block h-full rounded-sm border border-line bg-ink p-5 transition-colors hover:border-amber/50 hover:text-amber">{a.title}</Link></li>))}
        </ul>
      </Section>
      <CtaBand />
    </>
  );
}

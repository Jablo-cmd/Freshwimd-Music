import { SiteImage } from "./site-image";
import type { ImageKey } from "@/content/images";

export function PageHero({ eyebrow, title, text, image, children }: { eyebrow: string; title: React.ReactNode; text?: React.ReactNode; image: ImageKey; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line-soft">
      <div className="absolute inset-0 -z-10">
        <SiteImage name={image} sizes="100vw" priority alt="" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/40" />
      </div>
      <div className="container-x pb-16 pt-36 sm:pb-24 sm:pt-44">
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h1 className="display max-w-4xl text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">{text}</p>}
        {children && <div className="mt-9 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

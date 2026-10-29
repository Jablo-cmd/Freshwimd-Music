import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/content/services";
import { SiteImage } from "./site-image";
import { ServiceIcon } from "./service-icon";
import { WhatsAppButton } from "./whatsapp-button";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-line bg-surface-soft transition-colors duration-300 hover:border-amber/50">
      <Link href={service.href} className="relative block aspect-[16/10] overflow-hidden" tabIndex={-1} aria-hidden="true">
        <SiteImage name={service.image} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" alt="" className="transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-soft via-ink/10 to-transparent" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <ServiceIcon name={service.icon} className="mb-4 size-6 text-amber" />
        <h3 className="display text-3xl">
          <Link href={service.href} className="hover:text-amber">{service.title}</Link>
        </h3>
        <p className="mt-3 flex-1 leading-relaxed text-muted">{service.short}</p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line-soft pt-5">
          <Link href={service.href} className="inline-flex items-center gap-2 text-sm text-cream transition-colors hover:text-amber">
            Service details <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <WhatsAppButton topic={service.topic} variant="ghost" size="sm" className="px-0">Enquire</WhatsAppButton>
        </div>
      </div>
    </article>
  );
}

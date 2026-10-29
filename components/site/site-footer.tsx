import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Globe } from "lucide-react";
import { fullAddress, mainNav, mapsLink, site } from "@/content/site";
import { services } from "@/content/services";
import { whatsappFor } from "@/lib/whatsapp";

const linkClass = "text-muted transition-colors hover:text-amber";

export function SiteFooter() {
  return (
    <footer className="border-t border-line-soft bg-ink-deep">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Image src="/images/site/logo-mark.png" alt="" width={80} height={56} className="h-12 w-auto" />
          <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-[0.12em]">
            FRESH <span className="text-amber">WIND</span> MUSIC
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A Johannesburg-based music production, audio engineering, songwriting, artist development and music education business.
          </p>
          {site.socials.length > 0 && (
            <ul className="mt-5 flex gap-4 text-sm">
              {site.socials.map((s) => (
                <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{s.label}</a></li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow mb-5">Explore</h2>
          <ul className="space-y-3 text-sm">
            {mainNav.map((n) => (<li key={n.href}><Link href={n.href} className={linkClass}>{n.label}</Link></li>))}
          </ul>
        </nav>

        <nav aria-label="Services">
          <h2 className="eyebrow mb-5">Services</h2>
          <ul className="space-y-3 text-sm">
            {services.map((s) => (<li key={s.slug}><Link href={s.href} className={linkClass}>{s.title}</Link></li>))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow mb-5">Contact</h2>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3"><Phone className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" /><a href={site.phone.href} className={linkClass}>{site.phone.display}</a></li>
            <li className="flex gap-3"><MessageCircle className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" /><a href={whatsappFor("general")} target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp us<span className="sr-only"> (opens in a new tab)</span></a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" /><a href={`mailto:${site.email}`} className={`${linkClass} break-all`}>{site.email}</a></li>
            <li className="flex gap-3"><Globe className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" /><a href={site.url} className={linkClass}>{site.url.replace("https://", "")}</a></li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber" aria-hidden="true" />
              <address className="not-italic text-muted">
                {site.address.street}<br />{site.address.suburb}<br />{site.address.city}, {site.address.postalCode}
                <br /><a href={mapsLink} target="_blank" rel="noopener noreferrer" className="text-amber hover:underline" aria-label={`Get directions to ${fullAddress}`}>Get directions<span className="sr-only"> (opens in a new tab)</span></a>
              </address>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line-soft">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Music production, mixing &amp; mastering and music lessons in Johannesburg, South Africa.</p>
        </div>
      </div>
    </footer>
  );
}

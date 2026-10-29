import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { JsonLd } from "@/components/site/json-ld";
import { MediaProvider } from "@/components/media/media-provider";
import { localBusinessSchema } from "@/lib/schema";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Fresh Wind Music | Music Production, Mixing & Mastering and Music Lessons in Johannesburg",
    template: "%s | Fresh Wind Music",
  },
  description:
    "Fresh Wind Music is a Johannesburg music production and education business: music production, audio mixing and mastering, songwriting, vocal coaching and piano, keyboard and music production lessons.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_ZA", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }] },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false },
};

export const viewport: Viewport = { themeColor: "#101216", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        {/* Reveal animations start at opacity 0; make sure content is never hidden without JavaScript. */}
        <noscript><style>{`[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style></noscript>
        <a href="#main" className="sr-only z-[100] bg-amber px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <MediaProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <WhatsAppFloat />
        </MediaProvider>
        <JsonLd data={localBusinessSchema()} />
      </body>
    </html>
  );
}

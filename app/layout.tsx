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
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const BING_VERIFICATION = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

// Only the weights the design uses (no italic, no 700): fewer font files to download and preload.
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-cormorant", display: "swap" });
const sans = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Recording Studio South Africa | Fresh Wind Music",
    template: "%s | Fresh Wind Music",
  },
  description:
    "Johannesburg recording studio for albums, EPs, choirs, gospel and single songs. Artists, churches, schools and universities welcome across South Africa.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, locale: "en_ZA", images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }] },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: false, email: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  // Verification tokens come from environment variables and are only rendered when supplied (docs/SEARCH_CONSOLE_SETUP.md).
  ...((GOOGLE_VERIFICATION || BING_VERIFICATION) && {
    verification: { ...(GOOGLE_VERIFICATION && { google: GOOGLE_VERIFICATION }), ...(BING_VERIFICATION && { other: { "msvalidate.01": BING_VERIFICATION } }) },
  }),
};

export const viewport: Viewport = { themeColor: "#101216", colorScheme: "dark" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen antialiased">
        {/* Reveal animations start at opacity 0; make sure content is never hidden without JavaScript. */}
        <noscript><style>{`[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style></noscript>
        <a href="#main" className="sr-only z-[100] bg-amber px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
        <MediaProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <WhatsAppFloat />
        </MediaProvider>
        <JsonLd data={localBusinessSchema()} />
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}</Script>
          </>
        )}
      </body>
    </html>
  );
}

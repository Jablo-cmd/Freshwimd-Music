import { site } from "@/content/site";
import { absUrl } from "@/lib/url";
import { services } from "@/content/services";

/**
 * Site-wide structured data: the studio (LocalBusiness, which is also an Organization) and the WebSite.
 * Only confirmed facts: no coordinates, opening hours, ratings, reviews, prices or social profiles.
 */
export function localBusinessSchema() {
  const business = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    slogan: site.tagline,
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    description: site.description,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/images/site/logo-full.jpg`,
    telephone: site.phone.e164,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.suburb}`,
      addressLocality: site.address.city,
      postalCode: site.address.postalCode,
      addressCountry: site.address.countryCode,
    },
    areaServed: [{ "@type": "City", name: "Johannesburg" }, { "@type": "AdministrativeArea", name: "Gauteng" }, { "@type": "Country", name: "South Africa" }],
    knowsAbout: ["Album recording", "EP recording", "Choir recording", "School choir recording", "University choir recording", "Church choir recording", "Praise and worship team recording", "Gospel recording", "Jazz recording", "Music production", "Audio mixing and mastering", "Songwriting", "Vocal coaching", "Piano lessons", "Keyboard lessons"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fresh Wind Music services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: absUrl(s.href) } })),
    },
    ...(site.socials.length > 0 && { sameAs: site.socials.map((s) => s.href) }),
    contactPoint: [{ "@type": "ContactPoint", telephone: site.phone.e164, email: site.email, contactType: "customer service", areaServed: "ZA" }],
  };
  const website = {
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: "en-ZA",
    publisher: { "@id": `${site.url}/#business` },
  };
  return { "@context": "https://schema.org", "@graph": [business, website] };
}

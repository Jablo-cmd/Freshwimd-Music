import { site } from "@/content/site";
import { services } from "@/content/services";

/** LocalBusiness structured data. Only confirmed facts: no coordinates, hours, ratings or prices. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
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
    areaServed: [{ "@type": "City", name: "Johannesburg" }, { "@type": "Country", name: "South Africa" }],
    knowsAbout: ["Music production", "Audio mixing and mastering", "Songwriting", "Vocal coaching", "Piano lessons", "Keyboard lessons", "Music production lessons"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Fresh Wind Music services",
      itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, url: `${site.url}${s.href}` } })),
    },
    sameAs: site.socials.map((s) => s.href),
    contactPoint: [{ "@type": "ContactPoint", telephone: site.phone.e164, email: site.email, contactType: "customer service", areaServed: "ZA" }],
  };
}

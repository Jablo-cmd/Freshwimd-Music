import { site } from "@/content/site";
import { absUrl } from "@/lib/url";
import { services } from "@/content/services";
import type { Artist, Track } from "@/content/types";

/**
 * Site-wide structured data: the studio (LocalBusiness, which is also an Organization) and the WebSite.
 * Only confirmed facts: no coordinates, opening hours, ratings, reviews, prices or social profiles.
 */
export function localBusinessSchema() {
  const business = {
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    slogan: site.tagline,
    "@id": `${site.url}/#business`,
    name: site.name,
    url: absUrl("/"),
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
    url: absUrl("/"),
    name: site.name,
    description: site.description,
    inLanguage: "en-ZA",
    publisher: { "@id": `${site.url}/#business` },
  };
  return { "@context": "https://schema.org", "@graph": [business, website] };
}

/**
 * Music structured data for the Artists & Music page. Only facts that are visible on the page are used:
 * the artist's name, their photograph, and the featured song with its YouTube address. No genres, albums, dates,
 * credits or biographies are asserted because none are shown.
 */
export function artistsSchema(artists: Artist[], tracks: Track[]) {
  const items = artists.map((a, i) => {
    const t = tracks.find((x) => x.id === a.featuredTrackId) ?? tracks.find((x) => x.artistId === a.id);
    const id = `${absUrl("/artists")}#${a.slug}`;
    return {
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MusicGroup",
        "@id": id,
        name: a.name,
        url: id,
        ...(a.profileImage && { image: `${site.url}${a.profileImage}` }),
        ...(t && {
          track: {
            "@type": "MusicRecording",
            name: t.title,
            byArtist: { "@id": id },
            ...(t.listenUrl && { url: t.listenUrl }),
          },
        }),
      },
    };
  });
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Artists & Music",
    url: absUrl("/artists"),
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: { "@type": "ItemList", itemListElement: items },
  };
}

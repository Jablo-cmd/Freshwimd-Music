/** Confirmed business details. Keep these exactly as supplied. */
export const site = {
  name: "Fresh Wind Music",
  tagline: "Where Music Finds Its Voice.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://freshwindmusic.co.za").replace(/\/$/, ""),
  description:
    "Fresh Wind Music is a recording and music production studio in Johannesburg, South Africa, recording albums, EPs, choirs and single songs for artists, churches, schools and universities, and teaching music.",
  phone: { display: "063 122 6552", href: "tel:+27631226552", e164: "+27631226552" },
  whatsappNumber: "27631226552",
  email: "freshwindmusic@aurisnexus.co.za",
  address: {
    street: "60 Goud St",
    suburb: "City and Suburban",
    city: "Johannesburg",
    postalCode: "2094",
    country: "South Africa",
    countryCode: "ZA",
  },
  /** Only add profiles that genuinely exist: { label: "Instagram", href: "https://…" } */
  socials: [] as { label: string; href: string }[],
} as const;

export const fullAddress = `${site.address.street}, ${site.address.suburb}, ${site.address.city}, ${site.address.postalCode}`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Artists & Music", href: "/artists" },
  { label: "Studio & Equipment", href: "/studio" },
  { label: "Music Lessons", href: "/music-lessons" },
  { label: "Recommended Equipment", href: "/recommended-equipment" },
  { label: "Contact", href: "/contact" },
] as const;

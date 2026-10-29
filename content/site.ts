/** Confirmed business details. Keep these exactly as supplied — do not "correct" the email domain. */
export const site = {
  name: "Fresh Wind Music",
  tagline: "Where Music Finds Its Voice.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://freshwindmusic.co.za").replace(/\/$/, ""),
  description:
    "Fresh Wind Music is a Johannesburg-based music production, audio engineering, songwriting, artist development and music education business.",
  phone: { display: "063 122 6552", href: "tel:+27631226552", e164: "+27631226552" },
  whatsappNumber: "27631226552",
  email: "info@freshwindmusic.coza", // exactly as supplied (".coza")
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
  { label: "Artists We've Worked With", href: "/artists" },
  { label: "Studio & Equipment", href: "/studio" },
  { label: "Music Lessons", href: "/music-lessons" },
  { label: "Recommended Equipment", href: "/recommended-equipment" },
  { label: "Contact", href: "/contact" },
] as const;

import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: "Fresh Wind",
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#101216",
    theme_color: "#101216",
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}

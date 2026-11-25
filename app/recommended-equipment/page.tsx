import type { Metadata } from "next";
import { RedirectPage } from "@/components/site/redirect-page";

/** The Recommended Equipment page was removed; its address now forwards to the home page. */
export const metadata: Metadata = {
  title: "Moved: Home",
  description: "This page has moved to the home page.",
  alternates: { canonical: "/" },
};

export default function RecommendedEquipmentRedirect() {
  return <RedirectPage to="/" heading="This page has moved" text="Take a look at what we record and teach on our home page." label="Go to the home page" />;
}

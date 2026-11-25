import type { Metadata } from "next";
import { RedirectPage } from "@/components/site/redirect-page";

/** Renamed to "Mixing & Mastering"; the old address forwards permanently. */
export const metadata: Metadata = {
  title: "Moved: Mixing & Mastering",
  description: "This page has moved to Mixing & Mastering.",
  alternates: { canonical: "/services/mixing-mastering" },
};

export default function AudioEngineeringRedirect() {
  return <RedirectPage to="/services/mixing-mastering" heading="This page has moved" text="Audio engineering is now part of our Mixing & Mastering page." label="Go to Mixing & Mastering" />;
}

import type { Metadata } from "next";
import { RedirectPage } from "@/components/site/redirect-page";

/** The Studio & Equipment page was removed; its address, directions and service area now live on the Contact page. */
export const metadata: Metadata = {
  title: "Moved: Contact",
  description: "This page has moved to Contact.",
  alternates: { canonical: "/contact" },
};

export default function StudioRedirect() {
  return <RedirectPage to="/contact" heading="This page has moved" text="You can find the studio's address, directions and enquiry options on our Contact page." label="Go to Contact" />;
}

import type { Metadata } from "next";
import { RedirectPage } from "@/components/site/redirect-page";

/** The Portfolio section was removed; its address now forwards to Artists & Music (a permanent move). */
export const metadata: Metadata = {
  title: "Moved: Artists & Music",
  description: "This page has moved to Artists & Music.",
  alternates: { canonical: "/artists" },
};

export default function PortfolioRedirect() {
  return <RedirectPage to="/artists" heading="This page has moved" text="Our portfolio is now part of Artists & Music." label="Go to Artists & Music" />;
}

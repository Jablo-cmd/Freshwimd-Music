"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, MessageCircle, Phone } from "lucide-react";
import { mainNav, site } from "@/content/site";
import { whatsappFor } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

function Brand() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name} — home`}>
      <Image src="/images/site/logo-mark.png" alt="" width={56} height={39} className="h-9 w-auto" priority />
      <span className="whitespace-nowrap leading-none">
        <span className="block font-[family-name:var(--font-display)] text-xl font-semibold tracking-[0.12em] text-cream">
          FRESH <span className="text-amber">WIND</span>
        </span>
        <span className="mt-1 block text-[0.6rem] uppercase tracking-[0.5em] text-muted">Music</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-300", scrolled || open ? "border-b border-line-soft bg-ink/90 backdrop-blur-md" : "bg-gradient-to-b from-ink/80 to-transparent")}>
      <div className="mx-auto flex h-20 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-4 2xl:gap-6">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn("whitespace-nowrap text-[0.78rem] tracking-wide transition-colors 2xl:text-[0.84rem] hover:text-amber", isActive(item.href) ? "text-amber" : "text-cream/85")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={whatsappFor("general")} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: "sm" }), "hidden sm:inline-flex")}>
            <MessageCircle aria-hidden="true" /> WhatsApp Us<span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="rounded-sm p-2 text-cream transition-colors hover:text-amber xl:hidden" aria-label="Open menu">
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">Site menu</SheetTitle>
              <SheetDescription className="sr-only">Navigate Fresh Wind Music</SheetDescription>
              <nav aria-label="Mobile" className="mt-10 flex-1 overflow-y-auto">
                <ul className="divide-y divide-line-soft">
                  {mainNav.map((item) => (
                    <li key={item.href}>
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={cn("block py-4 font-[family-name:var(--font-display)] text-3xl transition-colors hover:text-amber", isActive(item.href) ? "text-amber" : "text-cream")}
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-6 grid gap-3">
                <a href={whatsappFor("general")} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "lg" })}>
                  <MessageCircle aria-hidden="true" /> WhatsApp Us<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <a href={site.phone.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
                  <Phone aria-hidden="true" /> {site.phone.display}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

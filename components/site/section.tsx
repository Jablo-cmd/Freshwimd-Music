import { cn } from "@/lib/utils";

export function Section({ children, className, tone = "ink", id }: { children: React.ReactNode; className?: string; tone?: "ink" | "soft"; id?: string }) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", tone === "soft" && "bg-surface-soft", className)}>
      <div className="container-x">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow, title, text, align = "left", as: Tag = "h2", className,
}: { eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; align?: "left" | "center"; as?: "h1" | "h2" | "h3"; className?: string }) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <Tag className="display text-4xl sm:text-5xl">{title}</Tag>
      {text && <p className="mt-5 text-lg leading-relaxed text-muted">{text}</p>}
    </div>
  );
}

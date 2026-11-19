import { cn } from "@/lib/utils";

export function EmptyState({ title, children, className, action, as: Tag = "h3" }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode; as?: "h2" | "h3" }) {
  return (
    <div className={cn("rounded-sm border border-dashed border-line bg-surface-soft/60 px-6 py-14 text-center sm:px-12", className)}>
      <Tag className="display text-3xl">{title}</Tag>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{children}</p>
      {action && <div className="mt-8 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}

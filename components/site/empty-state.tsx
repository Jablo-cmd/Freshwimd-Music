import { cn } from "@/lib/utils";

export function EmptyState({ title, children, className, action }: { title: string; children: React.ReactNode; className?: string; action?: React.ReactNode }) {
  return (
    <div className={cn("rounded-sm border border-dashed border-line bg-surface-soft/60 px-6 py-14 text-center sm:px-12", className)}>
      <h3 className="display text-3xl">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted">{children}</p>
      {action && <div className="mt-8 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border border-line px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted", className)}
      {...props}
    />
  );
}

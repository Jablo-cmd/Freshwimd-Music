"use client";

import { useState } from "react";
import type { Project, PortfolioCategory } from "@/content/types";
import { portfolioCategories } from "@/content/types";
import { ProjectCard } from "./project-card";
import { EmptyState } from "./empty-state";
import { cn } from "@/lib/utils";

export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [category, setCategory] = useState<PortfolioCategory | "All">("All");
  const shown = projects
    .filter((p) => category === "All" || p.category === category)
    .sort((a, b) => Number(b.featured) - Number(a.featured));
  const count = (c: PortfolioCategory) => projects.filter((p) => p.category === c).length;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {(["All", ...portfolioCategories] as const).map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors",
                active ? "border-amber bg-amber text-ink" : "border-line text-muted hover:border-amber/60 hover:text-cream",
              )}
            >
              {c}
              <span className={cn("ml-2", active ? "text-ink/70" : "text-muted/60")}>{c === "All" ? projects.length : count(c)}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-10" aria-live="polite">
        {shown.length === 0 ? (
          <EmptyState title={projects.length === 0 ? "The portfolio is being curated" : "Nothing in this category yet"}>
            {projects.length === 0
              ? "Selected productions, mixes and performances will appear here as they are confirmed and cleared for publication."
              : "There are no published projects in this category yet. Try another category."}
          </EmptyState>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((p) => (<li key={p.id}><ProjectCard project={p} /></li>))}
          </ul>
        )}
      </div>
    </div>
  );
}

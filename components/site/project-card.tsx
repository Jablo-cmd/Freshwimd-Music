import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/types";
import { SiteImage } from "./site-image";
import { Badge } from "@/components/ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative overflow-hidden rounded-sm border border-line bg-surface-soft transition-colors hover:border-amber/50">
      <div className="relative aspect-square overflow-hidden bg-surface">
        {project.artwork ? (
          <Image src={project.artwork} alt={`${project.title} — project artwork`} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <SiteImage name="logoMark" sizes="33vw" className="object-contain p-12 opacity-40" alt="" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        {project.featured && <Badge className="absolute left-4 top-4 border-amber/50 bg-ink/70 text-amber">Featured</Badge>}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.16em] text-amber">{project.category}</p>
        <h3 className="display mt-2 text-2xl">
          <Link href={`/portfolio/${project.slug}`} className="after:absolute after:inset-0 hover:text-amber">{project.title}</Link>
        </h3>
        {project.artistName && <p className="mt-1 text-sm text-cream/70">{project.artistName}</p>}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">{project.description}</p>
      </div>
    </article>
  );
}

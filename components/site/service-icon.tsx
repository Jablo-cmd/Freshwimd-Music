import { Compass, GraduationCap, Mic, Music, PenLine, SlidersHorizontal, type LucideProps } from "lucide-react";
import type { Service } from "@/content/services";

const map = { music: Music, sliders: SlidersHorizontal, pen: PenLine, mic: Mic, compass: Compass, graduation: GraduationCap };

export function ServiceIcon({ name, ...props }: { name: Service["icon"] } & LucideProps) {
  const Icon = map[name];
  return <Icon aria-hidden="true" {...props} />;
}

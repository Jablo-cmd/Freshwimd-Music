import Image from "next/image";
import { images, type ImageKey } from "@/content/images";
import { cn } from "@/lib/utils";

interface Props {
  name: ImageKey;
  sizes: string;
  priority?: boolean;
  className?: string;
  alt?: string;
  /** Decorative duplicates should pass alt="" */
}

/** next/image wrapper that fills its (relatively positioned) parent using the registry's alt text and focal point. */
export function SiteImage({ name, sizes, priority, className, alt }: Props) {
  const img = images[name];
  const position = "position" in img ? img.position : undefined;
  return (
    <Image
      src={img.src}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
      style={{ objectPosition: position }}
    />
  );
}

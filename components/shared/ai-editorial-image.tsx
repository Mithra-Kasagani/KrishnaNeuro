import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiEditorialImage({ src, alt, className, imageClassName, priority = false, label = "Editorial visual", sizes = "(max-width: 1024px) 100vw, 42vw", showLabel = false }: { src: string; alt: string; className?: string; imageClassName?: string; priority?: boolean; label?: string; sizes?: string; showLabel?: boolean }) {
  return (
    <figure className={cn("relative overflow-hidden rounded-[1.8rem] border border-border bg-muted shadow-card", className)}>
      <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={cn("object-cover", imageClassName)} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" aria-hidden="true" />
      {showLabel && <figcaption className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-slate-950/55 px-2.5 py-1 text-[0.62rem] font-bold text-white backdrop-blur-md"><Sparkles className="size-3" aria-hidden="true" />{label}</figcaption>}
    </figure>
  );
}

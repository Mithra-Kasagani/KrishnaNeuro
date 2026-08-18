import type { ReactNode } from "react";
import { AiEditorialImage } from "@/components/shared/ai-editorial-image";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/shared/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PageHero({ badge, title, description, breadcrumbs, actions, aside, image = "/images/ai/wellbeing-overview.webp", imageAlt = "Mental healthcare editorial photograph", imageLabel = "Editorial photograph", className }: { badge?: string; title: ReactNode; description: ReactNode; breadcrumbs?: BreadcrumbItem[]; actions?: ReactNode; aside?: ReactNode; image?: string; imageAlt?: string; imageLabel?: string; className?: string }) {
  const hasVisual = Boolean(aside || image);
  return <section className={cn("relative overflow-hidden border-b border-border bg-card", className)}><div className="absolute inset-0 surface-grid opacity-65" aria-hidden="true"/><div className="absolute -right-36 -top-40 size-[30rem] rounded-full bg-accent/10 blur-3xl" aria-hidden="true"/><div className="absolute -bottom-48 left-[12%] size-[24rem] rounded-full bg-secondary/8 blur-3xl" aria-hidden="true"/><div className="container-page relative py-12 md:py-18">{breadcrumbs&&<Breadcrumbs items={breadcrumbs}/>}<div className={cn("mt-9 grid items-center gap-10",hasVisual&&"lg:grid-cols-[1.12fr_.88fr]")}><div>{badge&&<Badge>{badge}</Badge>}<h1 className="mt-5 max-w-4xl text-balance text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.055em] text-foreground">{title}</h1><div className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">{description}</div>{actions&&<div className="mt-8 flex flex-wrap gap-3">{actions}</div>}</div>{hasVisual&&<div className="grid gap-4">{image&&<AiEditorialImage src={image} alt={imageAlt} label={imageLabel} className="aspect-[16/10] min-h-64"/>}{aside&&<div>{aside}</div>}</div>}</div></div></section>;
}

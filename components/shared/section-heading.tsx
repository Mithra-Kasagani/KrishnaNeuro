import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, description, align = "left", className }: { eyebrow?: string; title: React.ReactNode; description?: React.ReactNode; align?: "left" | "center"; className?: string }) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <p className={cn("eyebrow", align === "center" && "justify-center before:hidden")}>{eyebrow}</p>}
      <h2 className="section-title mt-4 text-balance text-foreground">{title}</h2>
      {description && <p className="mt-5 text-pretty text-base leading-7 text-muted-foreground md:text-lg">{description}</p>}
    </div>
  );
}

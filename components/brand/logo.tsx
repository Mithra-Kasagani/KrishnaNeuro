import Image from "next/image";
import { BiText } from "@/components/i18n/bilingual-text";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <Image
      src="/images/brand/krishna-neuro-logo.webp"
      alt=""
      width={512}
      height={512}
      sizes="48px"
      className={cn("size-12 rounded-xl object-cover shadow-sm ring-1 ring-border/70", className)}
      aria-hidden="true"
    />
  );
}

export function BrandLogo({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <a href="/" data-i18n-link className={cn("group inline-flex items-center gap-3 rounded-lg", className)} aria-label={compact ? "Krishna Neuro Psychiatric Centre home" : undefined}>
      <LogoMark className="shrink-0 transition-transform duration-300 group-hover:rotate-[-3deg] group-hover:scale-[1.03]" />
      {!compact && (
        <span className="leading-none">
          <span className="block text-[0.98rem] font-extrabold tracking-[-0.035em] text-foreground">Krishna Neuro</span>
          <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.1em] text-muted-foreground"><BiText en="Psychiatric Centre" te="సైకియాట్రిక్ సెంటర్" /></span>
        </span>
      )}
    </a>
  );
}

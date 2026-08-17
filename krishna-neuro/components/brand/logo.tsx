import { BiText } from "@/components/i18n/bilingual-text";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={cn("size-11", className)} viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="logo-leaf" x1="9" y1="10" x2="53" y2="54"><stop stopColor="#4A90E2"/><stop offset="1" stopColor="#2E8B57"/></linearGradient></defs>
      <rect width="64" height="64" rx="19" fill="#0F4C81"/>
      <path d="M17 33c0-11 6-19 15-19s15 8 15 19c0 9-6 16-15 18-9-2-15-9-15-18Z" fill="none" stroke="white" strokeWidth="3"/>
      <path d="M23 34c6-1 9-5 9-12 0 7 3 11 9 12M32 22v23" fill="none" stroke="url(#logo-leaf)" strokeLinecap="round" strokeWidth="4"/>
      <path d="M24 42c3-1 6 0 8 3 2-3 5-4 8-3" fill="none" stroke="white" strokeLinecap="round" strokeWidth="3"/>
    </svg>
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

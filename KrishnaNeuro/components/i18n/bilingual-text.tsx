import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";

export function BiText({ en, te, className }: { en: string; te: string; className?: string }) {
  return (
    <span className={cn(className)}>
      <span className="lang-en">{en}</span>
      <span className="lang-te" lang="te">{te}</span>
    </span>
  );
}

export function LanguageToggle({ className }: { className?: string }) {
  return (
    <a id="language-toggle" href="/te" className={cn("inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border bg-card/70 px-3 text-xs font-extrabold text-foreground transition hover:border-primary/35 hover:text-primary", className)} aria-label="Change website language">
      <Languages className="size-4" aria-hidden="true" />
      <span className="sm:hidden"><span className="lang-en" lang="te">తె</span><span className="lang-te">EN</span></span>
      <span className="hidden sm:inline"><span className="lang-en" lang="te">తెలుగు</span><span className="lang-te">English</span></span>
    </a>
  );
}

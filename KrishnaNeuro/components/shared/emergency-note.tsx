import { ArrowRight, ShieldAlert } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function EmergencyNote({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <aside className={cn("rounded-2xl border border-amber-300/45 bg-amber-50 p-5 text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100", className)} aria-label="Emergency guidance">
      <div className="flex gap-3">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-amber-700 dark:text-amber-300" aria-hidden="true"/>
        <div>
          <p className="font-extrabold">Immediate danger needs emergency care.</p>
          {!compact && <p className="mt-1 text-sm leading-6 opacity-85">For a suicide attempt or plan, overdose, seizure, severe violence or inability to stay safe, call <a className="font-bold underline underline-offset-2" href={`tel:${siteConfig.emergency.india}`}>{siteConfig.emergency.india}</a> or go to the nearest emergency department. Tele-MANAS: <a className="font-bold underline underline-offset-2" href={`tel:${siteConfig.emergency.teleManas}`}>{siteConfig.emergency.teleManas}</a>.</p>}
          <a href="/emergency" className="mt-2 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wide">View crisis guidance <ArrowRight className="size-3.5" aria-hidden="true"/></a>
        </div>
      </div>
    </aside>
  );
}

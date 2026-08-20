import { BookOpenCheck, CalendarDays, ExternalLink } from "lucide-react";
import type { MedicalReference } from "@/data/medical-references";
import { formatDate } from "@/lib/utils";

function teluguDate(value: string) {
  return new Intl.DateTimeFormat("te-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function MedicalReferences({ references, updatedAt, language = "en" }: { references: MedicalReference[]; updatedAt: string; language?: "en" | "te" }) {
  const telugu = language === "te";
  return (
    <section className="rounded-[1.7rem] border border-border bg-card p-6 shadow-card md:p-8" aria-labelledby={`sources-${language}`}>
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/8 text-primary"><BookOpenCheck className="size-5" aria-hidden="true" /></span>
        <div>
          <h2 id={`sources-${language}`} className="text-2xl font-extrabold tracking-[-0.03em]">{telugu ? "ఆధారాలు మరియు మరింత సమాచారం" : "Sources and further reading"}</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{telugu ? "ఈ అధికారిక వనరులు సాధారణ అవగాహనకు తోడ్పడతాయి. వ్యక్తిగత అంచనా లేదా చికిత్స సలహాను భర్తీ చేయవు." : "These authoritative resources support general education. They do not replace an individual assessment or treatment recommendation."}</p>
        </div>
      </div>
      <ul className="mt-6 grid gap-3">
        {references.map((reference) => (
          <li key={reference.href}>
            <a href={reference.href} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 rounded-xl border border-border p-4 transition hover:border-accent/40 hover:bg-muted/45">
              <span><span className="block text-sm font-extrabold text-foreground group-hover:text-primary">{reference.label}</span><span className="mt-1 block text-xs text-muted-foreground">{reference.organization}</span></span>
              <ExternalLink className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><CalendarDays className="size-3.5" aria-hidden="true" />{telugu ? `కంటెంట్ నవీకరణ: ${teluguDate(updatedAt)}` : `Content updated: ${formatDate(updatedAt)}`}</p>
    </section>
  );
}

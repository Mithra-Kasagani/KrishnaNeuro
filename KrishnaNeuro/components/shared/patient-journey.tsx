import { CalendarCheck, ClipboardCheck, HeartPulse, MessagesSquare, Route, SearchCheck, Sprout } from "lucide-react";

export const journeySteps = [
  { title: "Book appointment", text: "Choose call, WhatsApp or the short request form.", icon: CalendarCheck },
  { title: "Initial consultation", text: "Tell the story in your own words, with a family member if you wish.", icon: MessagesSquare },
  { title: "Assessment", text: "Review symptoms, health, medicines, sleep, context and safety.", icon: SearchCheck },
  { title: "Working diagnosis", text: "Understand what fits, what remains uncertain and what may need testing.", icon: ClipboardCheck },
  { title: "Personalised plan", text: "Agree on practical, psychological and medical options.", icon: Route },
  { title: "Regular follow-up", text: "Review progress, side effects, barriers and changing goals.", icon: HeartPulse },
  { title: "Long-term wellbeing", text: "Build independence, relapse awareness and meaningful daily life.", icon: Sprout },
] as const;

export function PatientJourney({ compact = false }: { compact?: boolean }) {
  return (
    <ol className={compact ? "grid gap-4 md:grid-cols-2 lg:grid-cols-4" : "relative grid gap-4 lg:grid-cols-7"}>
      {journeySteps.map((step, index) => {
        const Icon = step.icon;
        return (
          <li key={step.title} className="group relative">
            {!compact && index < journeySteps.length - 1 && <div className="absolute left-[calc(50%+2rem)] top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-accent/60 to-secondary/40 lg:block" aria-hidden="true"/>}
            <div className="relative h-full rounded-2xl border border-border bg-card p-4 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-card">
              <div className="flex items-center justify-between">
                {compact ? <span className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary"><Icon className="size-4.5" aria-hidden="true"/></span> : <span className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-xs font-black text-primary">0{index + 1}</span>}
                {compact && <span className="text-[0.65rem] font-extrabold tabular-nums text-muted-foreground">0{index + 1}</span>}
              </div>
              <h3 className="mt-4 text-sm font-extrabold tracking-[-0.02em] text-foreground">{step.title}</h3>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{step.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

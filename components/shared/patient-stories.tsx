import { patientStories } from "@/data/testimonials";

export function PatientStories({ limit = 3 }: { limit?: number }) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {patientStories.slice(0, limit).map((story) => (
        <figure key={story.quote} className="rounded-[1.6rem] border border-border bg-card p-6 shadow-card">
          <span className="font-serif text-4xl leading-none text-accent" aria-hidden="true">“</span>
          <blockquote className="mt-3 text-pretty text-base font-semibold leading-7 tracking-[-0.015em] text-foreground">“{story.quote}”</blockquote>
          <figcaption className="mt-6 border-t border-border pt-4">
            <p className="text-xs font-extrabold text-foreground">{story.perspective}</p>
            <p className="mt-1 text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">{story.context}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

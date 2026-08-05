import { ArrowRight, CalendarDays, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function AppointmentCTA({ title = "A clearer next step can begin with one conversation.", description = "Request a preferred time with Dr. Pamarthi Krishna Das. The clinic will contact you to confirm availability.", className }: { title?: string; description?: string; className?: string }) {
  return (
    <section className={cn("container-page py-12 md:py-18", className)} aria-label="Book an appointment">
      <div className="relative overflow-hidden rounded-[2.2rem] bg-[#0b3b64] p-7 text-white shadow-[0_30px_70px_-30px_rgb(15_76_129/.7)] md:p-12 lg:p-14">
        <div className="absolute -right-20 -top-28 size-80 rounded-full border-[48px] border-white/5" aria-hidden="true" />
        <div className="absolute -bottom-28 left-[40%] size-64 rounded-full bg-emerald-400/12 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-emerald-300"><Sparkles className="size-4" aria-hidden="true"/>Recovery is possible</p>
            <h2 className="mt-4 text-balance text-3xl font-extrabold leading-tight tracking-[-0.04em] md:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 md:text-base">{description}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:max-w-60 lg:flex-col">
            <Button asChild variant="white" size="lg" className="flex-1 lg:w-full"><a href="/appointment"><CalendarDays aria-hidden="true"/>Request appointment<ArrowRight aria-hidden="true"/></a></Button>
            <Button asChild variant="outline" size="lg" className="flex-1 border-white/20 bg-white/5 text-white hover:border-white/35 hover:bg-white/10 lg:w-full"><a href={`tel:${siteConfig.phones[0]}`}><Phone aria-hidden="true"/>Call clinic</a></Button>
          </div>
        </div>
        <p className="relative mt-7 border-t border-white/12 pt-5 text-xs leading-5 text-slate-300">A request is not a confirmed appointment until the clinic replies. This form is not monitored for emergencies.</p>
      </div>
    </section>
  );
}

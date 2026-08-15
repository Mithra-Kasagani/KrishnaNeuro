import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { Button } from "@/components/ui/button";
import { conditions } from "@/data/conditions";
import { coreSeoPages } from "@/data/seo-pages";
import { services } from "@/data/services";
import { createMetadataFromModel } from "@/lib/metadata";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.services, ["psychiatric services Vijayawada", "counselling Vijayawada", "de addiction psychiatrist", "sleep clinic Vijayawada"]);

const linkedConditions = ["depression", "anxiety", "panic-disorder", "ocd", "bipolar-disorder", "schizophrenia", "sleep-disorders", "alcohol-addiction"].map((slug) => conditions.find((item) => item.slug === slug)).filter((item): item is NonNullable<typeof item> => Boolean(item));

export default function ServicesPage() {
  return (
    <>
      <PageHero badge={`${services.length} care pathways`} title="Psychiatric & Mental Health Services in Vijayawada" description="Begin with a careful assessment. The recommended pathway may involve one service or several, with clear reasons and regular review." breadcrumbs={[{label:"Services"}]} actions={<Button asChild><Link prefetch={false} href="/appointment"><CalendarDays/>Book an Appointment</Link></Button>} />
      <section className="container-page py-16 md:py-22"><div className="grid gap-5 md:grid-cols-2">{services.map((service,index)=>{const Icon=service.icon;return <Link key={service.slug} href={`/services/${service.slug}`} className="group grid gap-5 rounded-[1.65rem] border border-border bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-soft sm:grid-cols-[auto_1fr_auto]"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/8 text-primary"><Icon className="size-5"/></span><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">Service {String(index+1).padStart(2,"0")}</p><h2 className="mt-2 text-xl font-extrabold tracking-[-0.03em] group-hover:text-primary">{service.name}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{service.short}</p></div><ArrowRight className="hidden size-5 self-center text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary sm:block"/></Link>})}</div><section className="mt-12"><h2 className="text-2xl font-extrabold tracking-[-0.03em]">Conditions we help with</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">These educational pages explain common concerns. A consultation is required to assess an individual.</p><div className="mt-5 flex flex-wrap gap-2">{linkedConditions.map((condition)=><Link key={condition.slug} href={`/conditions/${condition.slug}`} className="rounded-full bg-muted px-4 py-2 text-sm font-bold transition hover:bg-primary hover:text-primary-foreground">{condition.name}</Link>)}</div></section><div className="mt-8 rounded-2xl border border-amber-300/45 bg-amber-50 p-5 text-sm leading-7 text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100"><strong>About urgent consultations:</strong> the clinic is not a 24-hour emergency department. Same-day availability must be confirmed. Immediate danger requires 112 or the nearest emergency department.</div></section>
      <AppointmentCTA />
    </>
  );
}

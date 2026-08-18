import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Brain, Check, ClipboardCheck, HeartHandshake, Leaf, Pill, RefreshCcw, Scale, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { pageImage } from "@/lib/page-images";

export const metadata: Metadata = createMetadata({ title: "Psychiatric Treatment Approach", description: "Learn how assessment, counselling, medication management, family support, lifestyle care and follow-up are personalised at Krishna Neuro Psychiatric Centre.", path: "/treatments", keywords: ["psychiatric treatment Vijayawada", "medication management psychiatrist", "mental health treatment approach"] });

const layers = [
  { title: "Comprehensive assessment", text: "Build a timeline, understand function and safety, review physical health, medicines, sleep and context.", icon: ClipboardCheck },
  { title: "Psychological treatment", text: "Use counselling or structured therapy to build insight, coping, behaviour change and relapse skills.", icon: Brain },
  { title: "Medication management", text: "Prescribe when the expected benefit justifies it, with a target, monitoring and regular review.", icon: Pill },
  { title: "Family partnership", text: "With consent, help relatives communicate, notice warning signs and support without over-control.", icon: HeartHandshake },
  { title: "Daily-life foundations", text: "Sleep, routine, activity, nutrition, substance use and meaningful roles affect clinical outcomes.", icon: Leaf },
  { title: "Follow-up and prevention", text: "Track response, side effects, barriers and early warning signs; adjust rather than continue automatically.", icon: RefreshCcw },
];

export default function TreatmentsPage() {
  return (
    <>
      <PageHero badge="Personalised care" image={pageImage("treatments")} imageAlt="Editorial photograph of psychiatric treatment and recovery" title="The right treatment is a shared decision—not a standard package." description="Psychiatric care may include education, therapy, practical support, family work, medication or referral. The mix depends on the person, condition, severity and goals." breadcrumbs={[{ label: "Treatments" }]} actions={<><Button asChild><Link prefetch={false} href="/appointment">Start with an assessment<ArrowRight/></Link></Button><Button asChild variant="outline"><Link href="/services">View services</Link></Button></>} />
      <section className="container-page py-18 md:py-26">
        <Reveal><SectionHeading eyebrow="Six connected layers" title="Treatment should make sense as a whole." description="Each layer has a role. Not everyone needs every layer, and priorities can change through recovery." align="center" /></Reveal>
        <div className="mt-11 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{layers.map((item, index)=>{const Icon=item.icon;return <Card key={item.title} className="card-lift relative overflow-hidden p-6"><span className="absolute right-5 top-3 text-5xl font-black tracking-[-0.08em] text-primary/6">0{index+1}</span><span className="flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary"><Icon className="size-5"/></span><h2 className="mt-5 text-xl font-extrabold tracking-[-0.03em]">{item.title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></Card>})}</div>
      </section>
      <section className="border-y border-border bg-muted/55 py-18 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2 lg:gap-18">
          <Reveal><SectionHeading eyebrow="Thoughtful medication" title="Neither over-medication nor under-treatment." description="Responsible prescribing balances symptom severity, safety, prior response, physical health, pregnancy considerations, daily routine, side effects and patient preference."/><div className="mt-7 rounded-2xl border border-secondary/25 bg-secondary/7 p-6"><div className="flex gap-4"><Scale className="size-6 shrink-0 text-secondary"/><div><h3 className="font-extrabold">Lowest effective treatment burden</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">This means enough treatment to meet agreed clinical goals with acceptable risk—not the smallest dose at any cost. Too little treatment can also cause serious harm.</p></div></div></div></Reveal>
          <Reveal delay={0.08}><div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-card"><h3 className="text-xl font-extrabold tracking-[-0.03em]">A good medicine plan answers:</h3><ul className="mt-6 grid gap-4">{["What symptom or risk are we targeting?", "How will we know whether it is helping?", "Which side effects and interactions matter?", "What physical-health monitoring is needed?", "When will we review dose and duration?", "If stopping becomes appropriate, how will it be done safely?"].map(item=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary"><Check className="size-3" strokeWidth={3}/></span>{item}</li>)}</ul><p className="mt-6 border-t border-border pt-5 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Safety:</strong> never stop, reduce, share or restart psychiatric medication without individual medical advice.</p></div></Reveal>
        </div>
      </section>
      <section className="container-page py-18 md:py-24"><div className="grid gap-5 md:grid-cols-3">{[{title:"Your voice matters",text:"Preferences, culture, finances, work, caregiving and pregnancy plans can change what is feasible.",icon:HeartHandshake},{title:"Safety sets the pace",text:"Severe withdrawal, psychosis, mania or suicide risk may require urgent or more intensive care.",icon:ShieldCheck},{title:"Progress is reviewed",text:"Treatment should continue because it is helping—not simply because it was once started.",icon:RefreshCcw}].map(x=>{const Icon=x.icon;return <div key={x.title} className="rounded-2xl border border-border bg-card p-6"><Icon className="size-5 text-secondary"/><h3 className="mt-4 text-lg font-extrabold">{x.title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{x.text}</p></div>})}</div></section>
      <AppointmentCTA />
    </>
  );
}

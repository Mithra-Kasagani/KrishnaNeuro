import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpenCheck, Brain, Check, GraduationCap, HeartHandshake, Languages, Scale, ShieldCheck, Stethoscope } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({ title: "Dr. Pamarthi Krishna Das — Consultant Psychiatrist", description: "Meet Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry), Consultant Psychiatrist at Krishna Neuro Psychiatric Centre in Suryaraopet, Vijayawada.", path: "/about-doctor", keywords: ["Dr Pamarthi Krishna Das", "psychiatrist Vijayawada", "MD Psychiatry Vijayawada"] });

const principles = [
  { title: "Dignity before diagnosis", text: "A diagnosis can guide treatment, but it should never become the whole identity of a person.", icon: HeartHandshake },
  { title: "Evidence before promises", text: "Discuss benefits, limits and uncertainty honestly. Never market a guaranteed cure.", icon: BookOpenCheck },
  { title: "Thoughtful prescribing", text: "Use medication for a clear clinical purpose, monitor it and avoid unnecessary treatment burden.", icon: Scale },
  { title: "Recovery in real life", text: "Measure progress in sleep, relationships, work, study, independence and quality of life.", icon: Brain },
];

const scope = ["Depression, anxiety, panic and OCD", "Bipolar disorder, psychosis and schizophrenia", "Alcohol, tobacco and other substance-use disorders", "Sleep, stress and adjustment concerns", "Child, adolescent and family mental health", "Memory, dementia and later-life psychiatry", "Women's mental health and postpartum concerns", "Relationship, grief and family guidance"];

export default function AboutDoctorPage() {
  return (
    <>
      <PageHero badge="About the doctor" title="Clinical clarity. Human warmth. A plan you can understand." description="Dr. Pamarthi Krishna Das is an MBBS, MD (Psychiatry) Consultant Psychiatrist in Vijayawada, supporting patients and families with respectful, evidence-based care." breadcrumbs={[{ label: "About Dr. Krishna Das" }]} actions={<><Button asChild><Link prefetch={false} href="/appointment">Request an appointment<ArrowRight aria-hidden="true"/></Link></Button><Button asChild variant="outline"><Link href="/patient-journey">What to expect</Link></Button></>} aside={<div className="mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-border bg-muted shadow-soft"><Image src="/images/doctor-portrait.webp" alt="Portrait of Dr. Pamarthi Krishna Das in his Vijayawada clinic" width={960} height={1160} priority sizes="(max-width: 1024px) 90vw, 32vw" className="aspect-[4/4.8] w-full object-cover object-top"/></div>} />

      <section className="container-page py-18 md:py-26">
        <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-18">
          <Reveal>
            <div className="sticky top-30 rounded-[1.7rem] border border-border bg-card p-6 shadow-card">
              <p className="text-xs font-extrabold uppercase tracking-[0.13em] text-primary">Credentials</p>
              <dl className="mt-5 grid gap-5">
                <div className="flex gap-3"><GraduationCap className="mt-0.5 size-5 shrink-0 text-secondary"/><div><dt className="text-xs font-bold text-muted-foreground">Medical qualifications</dt><dd className="mt-1 font-extrabold">MBBS, MD (Psychiatry)</dd></div></div>
                <div className="flex gap-3"><Stethoscope className="mt-0.5 size-5 shrink-0 text-secondary"/><div><dt className="text-xs font-bold text-muted-foreground">Role</dt><dd className="mt-1 font-extrabold">Consultant Psychiatrist</dd></div></div>
                <div className="flex gap-3"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-secondary"/><div><dt className="text-xs font-bold text-muted-foreground">Practice</dt><dd className="mt-1 font-extrabold">Krishna Neuro Psychiatric Centre</dd></div></div>
                <div className="flex gap-3"><Languages className="mt-0.5 size-5 shrink-0 text-secondary"/><div><dt className="text-xs font-bold text-muted-foreground">Communication</dt><dd className="mt-1 font-extrabold">Call to confirm preferred language</dd></div></div>
              </dl>
              <p className="mt-6 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Credentials are based on the supplied clinic material and public professional listings. Registration and language details should be confirmed before launch if displayed more specifically.</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">A considered approach</p>
            <h2 className="section-title mt-5">The first responsibility is to understand what is actually happening.</h2>
            <div className="prose-clinic mt-7">
              <p>Mental-health symptoms rarely arrive alone. Sleep, physical health, medicines, work, family, substances, development and stressful experiences may all shape the picture. A careful assessment brings those pieces together before major decisions are made.</p>
              <p>Some concerns need psychological treatment and practical change. Some need medical treatment. Many need a combination that evolves over time. The aim is neither to avoid medication at all costs nor to continue it automatically; the aim is the most appropriate effective care for that person, reviewed responsibly.</p>
              <p>Patients deserve explanations in clear language. Families can be valuable partners when the patient agrees, while privacy and autonomy remain central. In severe illness, care also includes safety, physical health, rehabilitation and support for meaningful roles.</p>
            </div>
            <div className="mt-9 rounded-2xl border-l-4 border-secondary bg-secondary/6 p-6"><p className="text-lg font-extrabold tracking-[-0.025em]">“Recovery is not just fewer symptoms. It is more life.”</p><p className="mt-2 text-sm leading-6 text-muted-foreground">A guiding brand philosophy—not a promise of a particular outcome.</p></div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-muted/55 py-18 md:py-24">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Care principles" title="Medical ethics should be visible in every decision." /></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{principles.map((item) => { const Icon = item.icon; return <Card key={item.title} className="card-lift p-6"><span className="flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary"><Icon className="size-5"/></span><h3 className="mt-5 text-lg font-extrabold tracking-[-0.025em]">{item.title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></Card>; })}</div>
        </div>
      </section>

      <section className="container-page py-18 md:py-26">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-18">
          <Reveal><Image src="/images/doctor-consultation.webp" alt="Dr. Pamarthi Krishna Das at Krishna Neuro Psychiatric Centre" width={1600} height={1200} sizes="(max-width: 1024px) 100vw, 48vw" className="aspect-[4/3] rounded-[2rem] border border-border object-cover shadow-soft"/></Reveal>
          <Reveal delay={0.08}><SectionHeading eyebrow="Clinical scope" title="Care across life stages and levels of need." description="You do not need to identify the condition yourself. Bring the change you have noticed; assessment helps determine the next step."/><ul className="mt-7 grid gap-3 sm:grid-cols-2">{scope.map((item)=><li key={item} className="flex gap-2.5 text-sm leading-6 text-muted-foreground"><span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary"><Check className="size-2.5" strokeWidth={3}/></span>{item}</li>)}</ul><Button asChild variant="soft" className="mt-8"><Link href="/conditions">Explore condition guides<ArrowRight/></Link></Button></Reveal>
        </div>
      </section>
      <AppointmentCTA title="Meet a psychiatrist who makes room for the whole story." />
    </>
  );
}

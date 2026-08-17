import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  BadgeCheck,
  Brain,
  CalendarDays,
  Clock3,
  HeartHandshake,
  Leaf,
  MapPin,
  MessageCircleHeart,
  Phone,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { GallerySection } from "@/components/gallery/gallery-section";
import { BiText } from "@/components/i18n/bilingual-text";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { EmergencyNote } from "@/components/shared/emergency-note";
import { FAQList } from "@/components/shared/faq-list";
import { MapCard } from "@/components/shared/map-card";
import { PatientJourney } from "@/components/shared/patient-journey";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { conditions } from "@/data/conditions";
import { coreSeoPages } from "@/data/seo-pages";
import { services } from "@/data/services";
import { faqs } from "@/data/faqs";
import { createMetadataFromModel } from "@/lib/metadata";
import { conditionImage } from "@/lib/page-images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.home, ["psychiatrist in Vijayawada", "Dr Pamarthi Krishna Das", "Krishna Neuro Psychiatric Centre", "mental health clinic Vijayawada", "psychiatrist Suryaraopet"]);

const featuredConditions = ["depression", "anxiety", "panic-disorder", "ocd", "bipolar-disorder", "sleep-disorders", "alcohol-addiction", "child-psychiatry"]
  .map((slug) => conditions.find((condition) => condition.slug === slug))
  .filter((condition): condition is NonNullable<typeof condition> => Boolean(condition));

const trustItems = [
  { label: "Medical specialist", value: "MBBS · MD Psychiatry", icon: Stethoscope },
  { label: "Privacy first", value: "Confidential care", icon: ShieldCheck },
  { label: "Whole-person plan", value: "Individual + family", icon: Users },
  { label: "Easy to reach", value: "Central Vijayawada", icon: MapPin },
];

const approach = [
  { title: "Listen before labelling", text: "Your symptoms, health, relationships, responsibilities and goals belong in the same conversation.", icon: MessageCircleHeart },
  { title: "Explain the ‘why’", text: "Understand the working diagnosis, options, expected benefits, uncertainties and warning signs in simple language.", icon: Brain },
  { title: "Treat thoughtfully", text: "Use evidence-based psychological, practical and medical care—medication only when clinically appropriate.", icon: Pill },
  { title: "Build life beyond symptoms", text: "Recovery includes independence, connection, study, work, sleep, physical health and relapse awareness.", icon: Leaf },
];

const reasons = [
  "Consultant-led assessment with medical and mental-health context",
  "Respectful care without shame, fear or moral judgement",
  "Medication reviewed for clear goals, benefit and side effects",
  "Families involved with the patient’s consent and privacy",
  "Care across adulthood, childhood, later life and addiction",
  "Same clinic for assessment, planning and continuity",
];

export default function HomePage() {
  return (
    <>
      <section className="hero-ambient relative overflow-hidden border-b border-border bg-card">
        <div className="absolute inset-0 surface-grid opacity-75" aria-hidden="true" />
        <div className="absolute -left-32 top-20 hidden size-96 rounded-full bg-accent/10 blur-3xl md:block" aria-hidden="true" />
        <div className="absolute -right-40 bottom-0 hidden size-[32rem] rounded-full bg-secondary/10 blur-3xl md:block" aria-hidden="true" />
        <div className="container-page relative grid min-h-[calc(100svh-7.25rem)] items-center gap-12 py-10 lg:grid-cols-[1.08fr_.92fr] lg:py-16">
          <div className="relative z-10 max-w-3xl">
            <div>
              <Badge className="gap-2 border-secondary/20 bg-secondary/8 text-secondary"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-40"/><span className="relative inline-flex size-2 rounded-full bg-success"/></span>Appointments · Monday–Saturday</Badge>
              <p className="mt-7 text-sm font-bold tracking-wide text-secondary"><BiText en="Support for the mind. Hope for recovery." te="మనసుకు తోడు. కోలుకునే దారిలో ఆశ." /></p>
              <h1 className="display-title mt-4 max-w-3xl text-foreground">Psychiatric &amp; Mental Health Care in <span className="text-primary">Vijayawada</span></h1>
              <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl"><strong className="font-bold text-foreground">Krishna Neuro Psychiatric Centre</strong> offers professional, compassionate and confidential care with <strong className="font-bold text-foreground">Dr. Pamarthi Krishna Das</strong>.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg"><a href="/appointment"><CalendarDays aria-hidden="true"/>Book an Appointment<ArrowRight aria-hidden="true"/></a></Button>
                <Button asChild variant="outline" size="lg"><a href={`tel:${siteConfig.phones[0]}`}><Phone aria-hidden="true"/>Call the Clinic</a></Button>
                <Button asChild variant="ghost" size="lg"><a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer"><MapPin aria-hidden="true"/>Get Directions</a></Button>
              </div>
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="size-4 text-secondary" aria-hidden="true"/>Private and respectful</span>
                <span className="inline-flex items-center gap-1.5"><Clock3 className="size-4 text-secondary" aria-hidden="true"/>{siteConfig.hours.short}</span>
                <span className="inline-flex items-center gap-1.5"><MapPin className="size-4 text-secondary" aria-hidden="true"/>Suryaraopet</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:relative lg:mr-0 lg:block lg:w-full lg:max-w-[35rem]">
            <div className="absolute -inset-6 hidden rounded-[3rem] bg-gradient-to-br from-accent/14 via-transparent to-secondary/18 blur-2xl lg:block" aria-hidden="true" />
            <div className="relative h-full overflow-hidden bg-slate-100 lg:h-auto lg:rounded-[2.2rem] lg:border lg:border-white/50 lg:shadow-[0_32px_75px_-34px_rgb(15_76_129/.48)] dark:border-white/10 dark:bg-slate-800">
              <Image src="/images/doctor-portrait.webp" alt="Dr. Pamarthi Krishna Das, Consultant Psychiatrist, at Krishna Neuro Psychiatric Centre in Vijayawada" width={960} height={1160} sizes="(max-width: 1024px) 90vw, 42vw" className="h-full w-full object-cover object-top lg:aspect-[4/4.7] lg:h-auto" />
              <div className="absolute inset-x-4 bottom-4 hidden rounded-2xl border border-white/45 bg-white/86 p-4 text-slate-900 shadow-xl backdrop-blur-xl dark:border-white/15 dark:bg-slate-950/78 dark:text-white lg:block sm:inset-x-5 sm:bottom-5 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div><p className="text-base font-extrabold tracking-[-0.025em]">Dr. Pamarthi Krishna Das</p><p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">{siteConfig.credentials} · {siteConfig.role}</p></div>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><BadgeCheck className="size-5" aria-hidden="true"/></span>
                </div>
              </div>
            </div>
            <div className="absolute -left-5 top-[18%] hidden rounded-2xl border border-border bg-card/88 p-3.5 shadow-xl backdrop-blur-xl lg:block">
              <div className="flex items-center gap-3"><span className="flex size-9 items-center justify-center rounded-xl bg-secondary/10 text-secondary"><HeartHandshake className="size-4.5" aria-hidden="true"/></span><div><p className="text-[0.66rem] font-bold uppercase tracking-wider text-muted-foreground">Care philosophy</p><p className="mt-0.5 text-xs font-extrabold text-foreground">Dignity. Clarity. Hope.</p></div></div>
            </div>
          </div>
        </div>

        <div className="container-page relative -mb-px">
          <Stagger className="grid overflow-hidden rounded-t-[1.7rem] border border-border bg-card shadow-[0_-10px_35px_-28px_rgb(15_76_129/.45)] sm:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return <StaggerItem key={item.label} className={`flex items-center gap-3.5 p-4.5 md:p-5 ${index > 0 ? "border-t border-border sm:border-l sm:border-t-0" : ""} ${index === 2 ? "sm:border-l-0 lg:border-l" : ""}`}><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/7 text-primary"><Icon className="size-4.5" aria-hidden="true"/></span><div><p className="text-[0.65rem] font-extrabold uppercase tracking-[0.11em] text-muted-foreground">{item.label}</p><p className="mt-1 text-sm font-extrabold text-foreground">{item.value}</p></div></StaggerItem>;
            })}
          </Stagger>
        </div>
      </section>

      <section className="container-page py-14 md:py-18">
        <div className="grid items-end gap-8 rounded-[1.8rem] bg-muted/55 p-7 md:grid-cols-[1fr_auto] md:p-10">
          <SectionHeading eyebrow="Krishna Neuro Psychiatric Centre" title="Professional mental-health care, delivered with respect." description="The clinic provides psychiatric assessment, treatment planning and follow-up in Vijayawada. Recommendations are individualized and do not replace emergency medical care." />
          <Button asChild variant="soft"><a href="/services">Explore clinic services<ArrowRight/></a></Button>
        </div>
      </section>

      <section className="cv-auto container-page py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-18">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-border bg-muted shadow-soft"><Image src="/images/doctor-office.webp" alt="Dr. Pamarthi Krishna Das seated in his consultation office" width={1600} height={1200} sizes="(max-width: 1024px) 100vw, 42vw" className="aspect-[4/3] w-full object-cover" /></div>
            <div className="absolute -bottom-5 -right-2 max-w-[15rem] rounded-2xl border border-border bg-card p-4 shadow-xl sm:right-5"><p className="text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-primary">Care principle</p><p className="mt-2 text-sm font-bold leading-6 text-foreground">Every patient deserves dignity, hope and a plan they can understand.</p></div>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="eyebrow">Meet your psychiatrist</p>
            <h2 className="section-title mt-5 text-balance">Meet Dr. Pamarthi Krishna Das</h2>
            <p className="mt-6 text-base leading-8 text-muted-foreground md:text-lg">Dr. Pamarthi Krishna Das is an MBBS, MD (Psychiatry) Consultant Psychiatrist at Krishna Neuro Psychiatric Centre, Vijayawada. The clinic supports people across life stages with mood, anxiety, psychosis, addiction, sleep, behavioural and memory concerns.</p>
            <p className="mt-4 text-base leading-8 text-muted-foreground">The approach is collaborative: clarify the problem, rule out relevant medical causes, discuss options and review what is actually helping. When medication is useful, it should have a clear purpose and regular review.</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild variant="soft"><a href="/doctor/pamarthi-krishna-das">About Dr. Pamarthi Krishna Das<ArrowRight aria-hidden="true"/></a></Button><Button asChild variant="ghost"><a href="/treatments">Our treatment approach</a></Button></div>
          </Reveal>
        </div>
      </section>

      <section className="cv-auto border-y border-border bg-card py-20 md:py-24">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Psychiatric & mental health services" title="Clear care pathways, explained before decisions are made." description="Start with an assessment. The appropriate next step may include education, psychological support, medication review, family guidance or referral." /></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0,6).map((service) => { const Icon=service.icon; return <a key={service.slug} href={`/services/${service.slug}`} className="group rounded-2xl bg-muted/55 p-5 transition hover:-translate-y-1 hover:bg-muted"><Icon className="size-5 text-primary"/><h3 className="mt-4 text-lg font-extrabold group-hover:text-primary">{service.name}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{service.short}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">Service details<ArrowRight className="size-3.5"/></span></a> })}
          </div>
          <Button asChild variant="outline" className="mt-8"><a href="/services">View all verified services<ArrowRight/></a></Button>
        </div>
      </section>

      <section className="cv-auto border-y border-border bg-muted/55 py-20 md:py-28">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Conditions we help with" title={<>From the first difficult symptom to a clearer way forward.</>} description="Explore plain-language guides to common concerns. These pages educate; an individual diagnosis still requires a consultation." /></Reveal>
          <Stagger className="mt-11 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredConditions.map((condition, index) => (
              <StaggerItem key={condition.slug}>
                <a href={`/conditions/${condition.slug}`} className="group block h-full overflow-hidden rounded-[1.45rem] border border-border bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-soft">
                  <div className="relative -mx-5 -mt-5 mb-5 aspect-[16/8]"><Image src={conditionImage(condition.slug)} alt={`Editorial photograph illustrating ${condition.name}`} fill sizes="(max-width: 768px) 100vw, 25vw" className="object-cover transition duration-500 group-hover:scale-[1.03]"/></div>
                  <div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-secondary/12 text-xs font-black text-primary">0{index + 1}</span><span className="size-2 rounded-full bg-secondary/55" aria-hidden="true" /></div>
                  <h3 className="mt-5 text-lg font-extrabold tracking-[-0.025em] text-foreground group-hover:text-primary">{condition.name}</h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">{condition.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-primary">Understand the signs <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true"/></span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
          <div className="mt-8 text-center"><Button asChild variant="outline"><a href="/conditions">View all {conditions.length} care guides<ArrowRight aria-hidden="true"/></a></Button></div>
        </div>
      </section>

      <section className="cv-auto container-page py-20 md:py-28">
        <Reveal><SectionHeading eyebrow="Our treatment approach" title="Scientific care, delivered with humanity." description="Treatment is not a standard package. It is a sequence of careful decisions, made together and adjusted with evidence from your real life." align="center" /></Reveal>
        <Stagger className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {approach.map((item, index) => {
            const Icon = item.icon;
            return <StaggerItem key={item.title}><Card className="card-lift h-full p-6"><div className="flex items-center justify-between"><span className="flex size-12 items-center justify-center rounded-2xl bg-primary/8 text-primary"><Icon className="size-5" aria-hidden="true"/></span><span className="text-4xl font-black tracking-[-0.08em] text-primary/8">{index + 1}</span></div><h3 className="mt-6 text-xl font-extrabold tracking-[-0.03em]">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></Card></StaggerItem>;
          })}
        </Stagger>
        <Reveal className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/6 p-5 text-center text-sm leading-6 text-foreground"><strong>Thoughtful medication principle:</strong> when medication is clinically appropriate, aim for the lowest effective treatment burden consistent with safety and recovery—never stop or reduce a prescribed medicine without medical advice.</Reveal>
      </section>

      <section className="cv-auto relative overflow-hidden bg-[#0b365c] py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-20 surface-grid" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
          <Reveal>
            <p className="eyebrow !text-emerald-300">Why choose us</p>
            <h2 className="section-title mt-5 max-w-2xl text-balance !text-white">Serious clinical care should still feel safe, clear and human.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200">Trust is built through how you are heard, how options are explained and whether treatment serves a meaningful life—not through dramatic promises.</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason) => <li key={reason} className="flex gap-3 text-sm leading-6 text-slate-100"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-300" aria-hidden="true" />{reason}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/5 shadow-2xl"><Image src="/images/family-support.webp" alt="A supportive multigenerational Indian family together at home" width={1536} height={1024} sizes="(max-width: 1024px) 100vw, 42vw" className="aspect-[4/3.5] w-full object-cover object-right"/><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#071a2b] via-[#071a2b]/78 to-transparent p-6 pt-24"><p className="text-lg font-extrabold">Care for the person. Guidance for the family.</p><p className="mt-2 text-sm text-slate-300">Because recovery happens in everyday life.</p></div></Reveal>
        </div>
      </section>

      <section className="cv-auto container-page py-20 md:py-28">
        <Reveal><SectionHeading eyebrow="Your patient journey" title="No mystery. No rushed decisions. One clear step at a time." description="A predictable journey can make the first appointment feel less overwhelming." align="center" /></Reveal>
        <Reveal delay={0.08} className="mt-12"><PatientJourney /></Reveal>
        <div className="mt-8 text-center"><Button asChild variant="soft"><a href="/patient-journey">See what to expect<ArrowRight aria-hidden="true"/></a></Button></div>
      </section>



      <GallerySection compact className="cv-auto bg-muted/45" />

      <section className="cv-auto border-y border-border bg-muted/55 py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal><SectionHeading eyebrow="Questions before the first visit" title="Clear answers can reduce uncertainty." description="Start with the questions patients and families ask most often." /><Button asChild variant="outline" className="mt-7"><a href="/faq">View all FAQs<ArrowRight aria-hidden="true"/></a></Button></Reveal>
          <Reveal delay={0.08} className="rounded-[1.7rem] border border-border bg-card px-6 shadow-card md:px-8"><FAQList faqs={faqs.slice(0, 7)} /></Reveal>
        </div>
      </section>


      <section className="cv-auto border-y border-border bg-card py-20 md:py-28">
        <div className="container-page"><MapCard /></div>
      </section>

      <section className="cv-auto container-page py-12 md:py-16"><EmergencyNote /></section>

      <AppointmentCTA />
    </>
  );
}

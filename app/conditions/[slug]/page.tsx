import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, Brain, CalendarDays, Check, CircleAlert, ClipboardCheck, HeartHandshake, HeartPulse, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { ContentAttribution } from "@/components/medical/content-attribution";
import { MedicalReferences } from "@/components/medical/medical-references";
import { Reveal } from "@/components/motion/reveal";
import { MedicalWebPageJsonLd } from "@/components/seo/json-ld";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { EmergencyNote } from "@/components/shared/emergency-note";
import { FAQList } from "@/components/shared/faq-list";
import { PageHero } from "@/components/shared/page-hero";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { articles } from "@/data/articles";
import { conditions, getCondition, getRelatedConditions } from "@/data/conditions";
import { getMedicalReferences } from "@/data/medical-references";
import { createMetadata } from "@/lib/metadata";
import { aiImageAlt, conditionImage } from "@/lib/page-images";

function seoConditionName(slug: string, name: string) {
  return slug === "ocd" ? "OCD" : name;
}

function conditionMetaDescription(summary: string) {
  const firstSentence = summary.split(".")[0].trim();
  const concise = firstSentence.length > 90 ? `${firstSentence.slice(0, 87).trimEnd()}…` : firstSentence;
  return `${concise}. Learn about assessment and treatment options at Krishna Neuro, Vijayawada.`;
}

export function generateStaticParams() {
  return conditions.map((condition) => ({ slug: condition.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) return {};
  const seoName = seoConditionName(condition.slug, condition.name);
  return createMetadata({
    title: `${seoName} Treatment in Vijayawada | Krishna Neuro`,
    description: conditionMetaDescription(condition.summary),
    path: `/conditions/${condition.slug}`,
    image: conditionImage(condition.slug),
    keywords: [`${condition.name} treatment Vijayawada`, `${condition.name} psychiatrist`, `psychiatrist in Vijayawada`, condition.category],
  });
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const condition = getCondition(slug);
  if (!condition) notFound();
  const seoName = seoConditionName(condition.slug, condition.name);
  const related = getRelatedConditions(condition);
  const references = getMedicalReferences(condition.slug);
  const relatedArticles = articles.filter((article) => article.internalLinks.some((link) => link.href === `/conditions/${condition.slug}`)).slice(0, 3);
  const fallbackArticles = relatedArticles.length ? relatedArticles : articles.slice(0, 3);

  return (
    <>
      <MedicalWebPageJsonLd name={`${seoName} Treatment in Vijayawada`} description={condition.summary} path={`/conditions/${condition.slug}`} about={condition.name} dateModified={condition.updatedAt} review={condition.medicalReview} citations={references.map((reference) => reference.href)} />
      <PageHero
        badge={condition.category}
        image={conditionImage(condition.slug)}
        imageAlt={aiImageAlt(condition.name)}
        title={`${seoName} Treatment in Vijayawada`}
        description={<><p className="font-semibold text-foreground">Understanding {condition.name.toLowerCase()}, its symptoms, diagnosis and treatment options with compassionate psychiatric care.</p><p className="mt-4">{condition.summary}</p>{condition.ageNote && <p className="mt-4 text-sm font-semibold text-foreground">{condition.ageNote}</p>}</>}
        breadcrumbs={[{ label: "Conditions", href: "/conditions" }, { label: condition.name }]}
        actions={<><Button asChild><Link prefetch={false} href="/appointment"><CalendarDays/>Request consultation</Link></Button><Button asChild variant="outline"><a href="#symptoms">Explore symptoms</a></Button></>}
        aside={<div className="rounded-[2rem] border border-border bg-card/80 p-6 shadow-soft backdrop-blur-xl"><div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/12 to-secondary/12 text-primary"><Brain className="size-5"/></div><h2 className="mt-5 text-xl font-extrabold tracking-[-0.025em] text-foreground">What Is {condition.name}?</h2><p className="mt-3 text-base leading-7 text-muted-foreground">{condition.overview}</p></div>}
      />

      <div className="container-page pt-8"><ContentAttribution updatedAt={condition.updatedAt} review={condition.medicalReview} /></div>
      {condition.urgent && <div className="container-page pt-8"><EmergencyNote /></div>}

      <section id="symptoms" className="container-page py-16 md:py-22">
        <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-18">
          <Reveal><div className="sticky top-30"><SectionHeading eyebrow="Symptoms" title={`Symptoms of ${condition.name}`} description="One sign alone does not establish a diagnosis. Pattern, duration, severity, context and impact all matter."/></div></Reveal>
          <Reveal delay={0.08}><div className="grid gap-3 sm:grid-cols-2">{condition.symptoms.map((symptom)=><div key={symptom} className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-card"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary"><Check className="size-3" strokeWidth={3}/></span><p className="text-sm font-semibold leading-6 text-foreground">{symptom}</p></div>)}</div></Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-muted/55 py-16 md:py-22">
        <div className="container-page"><h2 className="text-3xl font-extrabold tracking-[-0.04em]">Causes and Risk Factors</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">Causes and risk factors can overlap. Having a risk factor does not mean a condition is inevitable.</p><div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Reveal><Card className="h-full p-7"><span className="flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary"><SearchCheck className="size-5"/></span><h3 className="mt-5 text-2xl font-extrabold tracking-[-0.035em]">Common causes and contributors</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">Usually there is no single cause and no one deserves blame.</p><ul className="mt-6 grid gap-3">{condition.causes.map((item)=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"/>{item}</li>)}</ul></Card></Reveal>
          <Reveal delay={0.08}><Card className="h-full p-7"><span className="flex size-11 items-center justify-center rounded-2xl bg-secondary/10 text-secondary"><ShieldCheck className="size-5"/></span><h3 className="mt-5 text-2xl font-extrabold tracking-[-0.035em]">Risk factors</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">A risk factor raises likelihood; it does not make an outcome inevitable.</p><ul className="mt-6 grid gap-3">{condition.riskFactors.map((item)=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary"/>{item}</li>)}</ul></Card></Reveal>
        </div></div>
      </section>

      <section className="container-page py-16 md:py-22">
        <div className="grid items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-18">
          <Reveal><div className="rounded-[1.8rem] bg-[#0b3b64] p-7 text-white shadow-soft"><ClipboardCheck className="size-7 text-emerald-300"/><h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">{`How Is ${condition.name} Diagnosed?`}</h2><p className="mt-5 text-sm leading-7 text-slate-200">{condition.diagnosis}</p><p className="mt-5 border-t border-white/15 pt-5 text-xs leading-6 text-slate-300">Online tests may support reflection but cannot replace a clinical history, risk assessment and relevant medical evaluation.</p></div></Reveal>
          <Reveal delay={0.08}><SectionHeading eyebrow="Treatment options" title={`${condition.name} Treatment Options`} description="Recommendations depend on severity, physical health, previous response, preferences, access and safety."/><div className="mt-8 grid gap-4">{condition.treatments.map((treatment,index)=><div key={treatment.title} className="grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-card sm:grid-cols-[auto_1fr]"><span className="flex size-9 items-center justify-center rounded-xl bg-primary/8 text-xs font-extrabold text-primary">0{index+1}</span><div><h3 className="font-extrabold text-foreground">{treatment.title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{treatment.description}</p></div></div>)}</div></Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-muted/55 py-16 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
          <div><HeartHandshake className="size-7 text-secondary"/><h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">How family and caregivers can help</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Support works best when it protects dignity, consent and safety rather than using blame, secrecy or force.</p></div>
          <ul className="grid gap-3 sm:grid-cols-2">{condition.familyGuidance.map((item)=><li key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-5 text-sm leading-7 text-muted-foreground shadow-card"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary"><Check className="size-3" strokeWidth={3}/></span>{item}</li>)}</ul>
        </div>
      </section>

      <section className="border-b border-border bg-card py-16 md:py-22">
        <div className="container-page grid gap-8 lg:grid-cols-2">
          <Reveal><div className="h-full rounded-[1.8rem] border border-border bg-muted/55 p-7"><CircleAlert className="size-6 text-primary"/><h2 className="mt-5 text-2xl font-extrabold tracking-[-0.035em]">When Should You Consult a Psychiatrist?</h2><ul className="mt-6 grid gap-4">{condition.whenToConsult.map((item)=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary"><ArrowRight className="size-3"/></span>{item}</li>)}</ul></div></Reveal>
          <Reveal delay={0.08}><div className="h-full rounded-[1.8rem] border border-secondary/20 bg-secondary/7 p-7"><Sparkles className="size-6 text-secondary"/><h2 className="mt-5 text-2xl font-extrabold tracking-[-0.035em]">Why early treatment matters</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">{condition.earlyTreatment}</p><Button asChild variant="secondary" className="mt-7"><Link prefetch={false} href="/appointment">Take a first step<ArrowRight/></Link></Button></div></Reveal>
        </div>
      </section>

      <section className="container-page py-16 md:py-22">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-18"><Reveal><SectionHeading eyebrow={`Questions about ${condition.name}`} title="Frequently Asked Questions" description="General answers can orient you; your own plan requires an individual assessment."/></Reveal><Reveal delay={0.08} className="rounded-[1.7rem] border border-border bg-card px-6 shadow-card md:px-8"><FAQList faqs={condition.faqs}/></Reveal></div>
        <div className="mt-12"><MedicalReferences references={references} updatedAt={condition.updatedAt} /></div>
      </section>

      <section className="border-y border-border bg-muted/55 py-16 md:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Keep learning" title="Related conditions and care guides" />
          <div className="mt-9 grid gap-5 lg:grid-cols-2">
            <div className="rounded-[1.7rem] border border-border bg-card p-6 shadow-card"><h3 className="flex items-center gap-2 text-lg font-extrabold"><HeartPulse className="size-5 text-secondary"/>Related conditions</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">{related.map((item)=><Link key={item.slug} href={`/conditions/${item.slug}`} className="group flex items-center justify-between rounded-xl border border-border p-3.5 text-sm font-bold transition hover:border-accent/35 hover:text-primary">{item.name}<ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></Link>)}</div></div>
            <div className="rounded-[1.7rem] border border-border bg-card p-6 shadow-card"><h3 className="flex items-center gap-2 text-lg font-extrabold"><BookOpen className="size-5 text-primary"/>Related articles</h3><div className="mt-5 grid gap-3">{fallbackArticles.map((article)=><Link key={article.slug} href={`/blog/${article.slug}`} className="group flex items-center justify-between gap-4 rounded-xl border border-border p-3.5 transition hover:border-accent/35"><div><p className="text-sm font-bold group-hover:text-primary">{article.title}</p><p className="mt-1 text-xs text-muted-foreground">{article.readingMinutes} min read</p></div><ArrowRight className="size-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-primary"/></Link>)}</div></div>
          </div>
          <div className="mt-8 rounded-2xl bg-primary/6 p-6"><h2 className="text-xl font-extrabold">Professional psychiatric care in Vijayawada</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Learn about <Link href="/services/psychiatric-consultation" className="font-bold text-primary underline underline-offset-4">psychiatric consultation</Link>, review the profile of <Link href="/doctor/pamarthi-krishna-das" className="font-bold text-primary underline underline-offset-4">Dr. Pamarthi Krishna Das, Psychiatrist in Vijayawada</Link>, or <Link prefetch={false} href="/appointment" className="font-bold text-primary underline underline-offset-4">book an appointment</Link>.</p></div>
        </div>
      </section>
      <AppointmentCTA title={`You are more than ${condition.name.toLowerCase()}.`} description="A consultation can turn a confusing pattern into a clearer, individual plan without absolute outcome promises or one-size-fits-all treatment." />
    </>
  );
}

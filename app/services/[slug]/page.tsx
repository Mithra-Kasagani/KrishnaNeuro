import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Check, CircleCheck, Info, Phone, ShieldCheck } from "lucide-react";
import { LocalServiceJsonLd } from "@/components/seo/json-ld";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { FAQList } from "@/components/shared/faq-list";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { conditions } from "@/data/conditions";
import { services, getService } from "@/data/services";
import { createMetadata } from "@/lib/metadata";
import { aiImageAlt, serviceImage } from "@/lib/page-images";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() { return services.map((service) => ({ slug: service.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const service = getService(slug); if (!service) return {};
  return createMetadata({ title: `${service.name} in Vijayawada`, description: `${service.short} Learn what ${service.name.toLowerCase()} includes at Krishna Neuro Psychiatric Centre in Vijayawada.`, path: `/services/${service.slug}`, image: serviceImage(service.slug), keywords: [`${service.name} Vijayawada`, "psychiatrist Vijayawada", "Krishna Neuro Psychiatric Centre"] });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const Icon = service.icon;
  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const relatedConditions = service.relatedConditions.map((conditionSlug) => conditions.find((condition) => condition.slug === conditionSlug)).filter((condition): condition is NonNullable<typeof condition> => Boolean(condition));
  return (
    <>
      <LocalServiceJsonLd name={service.name} description={service.description} path={`/services/${service.slug}`} area="Vijayawada, Andhra Pradesh" />
      <PageHero badge="Clinical service" image={serviceImage(service.slug)} imageAlt={aiImageAlt(service.name)} title={service.name} description={service.short} breadcrumbs={[{label:"Services",href:"/services"},{label:service.name}]} actions={<><Button asChild><Link prefetch={false} href="/appointment"><CalendarDays/>Request appointment</Link></Button><Button asChild variant="outline"><a href={`tel:${siteConfig.phones[0]}`}><Phone/>Call clinic</a></Button></>} aside={<div className="rounded-[2rem] border border-border bg-card/80 p-7 shadow-soft"><span className="flex size-14 items-center justify-center rounded-2xl bg-primary/8 text-primary"><Icon className="size-6"/></span><p className="mt-5 text-base leading-7 text-foreground">{service.description}</p></div>} />
      <section className="container-page py-16 md:py-22">
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="rounded-[1.8rem] border border-border bg-card p-7 shadow-card"><h2 className="text-2xl font-extrabold tracking-[-0.035em]">What this service can include</h2><ul className="mt-6 grid gap-4">{service.includes.map((item)=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary"><Check className="size-3" strokeWidth={3}/></span>{item}</li>)}</ul></div>
          <div className="rounded-[1.8rem] border border-border bg-muted/55 p-7"><h2 className="text-2xl font-extrabold tracking-[-0.035em]">May be suitable for</h2><ul className="mt-6 grid gap-4">{service.suitableFor.map((item)=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><CircleCheck className="mt-0.5 size-5 shrink-0 text-primary"/>{item}</li>)}</ul></div>
        </div>
        <div className="mt-7 flex gap-4 rounded-2xl border border-amber-300/45 bg-amber-50 p-5 text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100"><Info className="mt-0.5 size-5 shrink-0"/><p className="text-sm leading-7"><strong>Important:</strong> {service.note}</p></div>
      </section>
      <section className="border-y border-border bg-muted/55 py-16 md:py-22"><div className="container-page"><p className="eyebrow">How it works</p><h2 className="section-title mt-5">Care begins with the right level of assessment.</h2><div className="mt-10 grid gap-4 md:grid-cols-4">{[{t:"Request",d:"Share only essential booking details."},{t:"Clarify",d:"The clinic confirms time and visit format."},{t:"Assess",d:"Clinical needs and safety guide recommendations."},{t:"Review",d:"Progress and next steps stay transparent."}].map((step,index)=><div key={step.t} className="rounded-2xl border border-border bg-card p-5"><span className="text-xs font-black text-primary">0{index+1}</span><h3 className="mt-3 font-extrabold">{step.t}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{step.d}</p></div>)}</div></div></section>
      <section className="container-page py-16 md:py-20"><div className="grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><p className="eyebrow">Related care guides</p><h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">Conditions related to this service</h2><div className="mt-7 grid gap-3">{relatedConditions.map((condition)=><Link key={condition.slug} href={`/conditions/${condition.slug}`} className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 text-sm font-extrabold shadow-card transition hover:border-accent/35 hover:text-primary">{condition.name}<ArrowRight className="size-4 transition group-hover:translate-x-1"/></Link>)}</div></div><div><p className="eyebrow">Service questions</p><h2 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">Frequently asked questions</h2><div className="mt-7 rounded-[1.7rem] border border-border bg-card px-6 shadow-card"><FAQList faqs={service.faqs}/></div></div></div></section>
      <section className="border-y border-border bg-muted/55 py-16 md:py-20"><div className="container-page"><h2 className="text-2xl font-extrabold tracking-[-0.035em]">Explore related services</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{others.map((item)=><Link key={item.slug} href={`/services/${item.slug}`} className="group rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-accent/35"><p className="font-extrabold group-hover:text-primary">{item.name}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.short}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-primary">Learn more<ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></span></Link>)}</div><div className="mt-7 flex items-center gap-3 rounded-2xl border border-border bg-card p-5 text-sm leading-6 text-muted-foreground"><ShieldCheck className="size-5 shrink-0 text-secondary"/>Information is educational. A service is recommended only after assessing individual need and safety.</div><div className="mt-7 rounded-2xl bg-primary/6 p-5 text-sm leading-7 text-muted-foreground">Explore the <Link href="/conditions" className="font-extrabold text-primary underline underline-offset-4">condition and care guides</Link>, learn about <Link href="/doctor/pamarthi-krishna-das" className="font-extrabold text-primary underline underline-offset-4">Dr. Pamarthi Krishna Das</Link>, or review the <Link href="/clinic-vijayawada" className="font-extrabold text-primary underline underline-offset-4">Vijayawada clinic visit information</Link>.</div></div></section>
      <AppointmentCTA title={`Ask whether ${service.name.toLowerCase()} fits your needs.`} />
    </>
  );
}

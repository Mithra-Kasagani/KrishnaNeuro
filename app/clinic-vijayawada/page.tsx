import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, FileText, MapPin, MessageCircle, Phone, Stethoscope, Users } from "lucide-react";
import { FAQJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { EmergencyNote } from "@/components/shared/emergency-note";
import { FAQList } from "@/components/shared/faq-list";
import { MapCard } from "@/components/shared/map-card";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { coreSeoPages } from "@/data/seo-pages";
import { createMetadataFromModel } from "@/lib/metadata";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.clinic);

const visitSteps = [
  { icon: CalendarDays, title: "Confirm the appointment", text: "Request a preferred time and wait for the clinic to confirm availability before travelling." },
  { icon: FileText, title: "Bring useful information", text: "A current medicine list, relevant reports and a short symptom timeline can make the first conversation clearer." },
  { icon: Users, title: "Choose family involvement", text: "You may bring a trusted person if you wish. Private conversation and patient consent remain important." },
  { icon: Stethoscope, title: "Start with assessment", text: "A first consultation clarifies the concern and options; it does not automatically mean medication." },
];

const faqs = [
  {
    question: "Where is Krishna Neuro Psychiatric Centre?",
    answer: `The clinic is at ${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.locality}, ${siteConfig.address.city} ${siteConfig.address.postalCode}.`,
  },
  {
    question: "What are the clinic hours?",
    answer: `${siteConfig.hours.summary}. ${siteConfig.hours.closed}. Call before travelling to confirm the doctor's availability and any holiday changes.`,
  },
  {
    question: "How do I request an appointment?",
    answer: `Call ${siteConfig.displayPhones[0]}, send a WhatsApp request to ${siteConfig.whatsappDisplay}, or use the website appointment form. A request is confirmed only after the clinic replies.`,
  },
  {
    question: "Is parking or step-free access available?",
    answer: "Parking and step-free access details have not yet been verified for publication. Please call the clinic before travelling if you need specific accessibility support.",
  },
  {
    question: "What should I bring to a psychiatric consultation?",
    answer: "If available, bring a current medicine list, relevant medical reports and a brief timeline of the changes you want to discuss. Do not delay urgent care while collecting documents.",
  },
];

export default function ClinicVijayawadaPage() {
  return (
    <>
      <WebPageJsonLd
        name={coreSeoPages.clinic.h1}
        description={coreSeoPages.clinic.metaDescription}
        path={coreSeoPages.clinic.canonicalUrl}
        aboutId="#clinic"
        mainEntityId="#clinic"
        dateModified={coreSeoPages.clinic.lastUpdated}
      />
      <FAQJsonLd faqs={faqs} />
      <PageHero
        badge="Clinic location · Suryaraopet"
        image="/images/doctor-office.webp"
        imageAlt="Consultation office at Krishna Neuro Psychiatric Centre in Vijayawada"
        title={coreSeoPages.clinic.h1}
        description="Verified clinic contact details, opening hours, visit planning and live directions for Krishna Neuro Psychiatric Centre in Suryaraopet."
        breadcrumbs={[{ label: "Vijayawada clinic" }]}
        actions={
          <>
            <Button asChild><a href={`tel:${siteConfig.phones[0]}`}><Phone />Call {siteConfig.displayPhones[0]}</a></Button>
            <Button asChild variant="secondary"><a href={whatsappHref()} target="_blank" rel="noopener noreferrer"><MessageCircle />WhatsApp</a></Button>
            <Button asChild variant="outline"><a href={siteConfig.googleMapsUrl} target="_blank" rel="noopener noreferrer"><MapPin />Directions</a></Button>
          </>
        }
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card"><MapPin className="size-5 text-primary" /><h2 className="mt-4 text-xl font-extrabold">Official address</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{siteConfig.address.line1}<br />{siteConfig.address.line2}<br />{siteConfig.address.locality}, {siteConfig.address.city} – {siteConfig.address.postalCode}<br />{siteConfig.address.region}, {siteConfig.address.country}</p></div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card"><Clock3 className="size-5 text-primary" /><h2 className="mt-4 text-xl font-extrabold">Clinic hours</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{siteConfig.hours.summary}<br />{siteConfig.hours.closed}<br />Call before travel to confirm availability.</p></div>
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card"><Stethoscope className="size-5 text-primary" /><h2 className="mt-4 text-xl font-extrabold">Consultant psychiatrist</h2><p className="mt-3 text-sm leading-7 text-muted-foreground"><strong className="text-foreground">{siteConfig.doctor}</strong><br />{siteConfig.credentials}<br />{siteConfig.role}</p><Link href="/doctor/pamarthi-krishna-das" className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-primary">View doctor profile<ArrowRight className="size-3.5" /></Link></div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/55 py-14 md:py-20">
        <div className="container-page">
          <p className="eyebrow">Before your visit</p>
          <h2 className="section-title mt-5">A few practical steps can make the visit easier.</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {visitSteps.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card"><Icon className="size-5 text-primary" /><h3 className="mt-4 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>)}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild><Link href="/appointment">Request appointment<ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link href="/services">Explore services</Link></Button>
            <Button asChild variant="outline"><Link href="/conditions">Browse condition guides</Link></Button>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <Image src="/images/doctor-consultation.webp" alt="Consultation setting at Krishna Neuro Psychiatric Centre" width={1600} height={1200} sizes="(max-width: 1024px) 100vw, 48vw" className="aspect-[4/3] rounded-[2rem] border border-border object-cover shadow-soft" />
          <div><p className="eyebrow">Clinic environment</p><h2 className="section-title mt-5">A professional setting for clear, respectful conversations.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Consultations may include assessment, education, treatment planning, medication review when clinically indicated and family guidance with the patient’s consent. Website information cannot determine which option is right for one person.</p><Button asChild variant="soft" className="mt-7"><Link href="/gallery">View clinic archive and activities<ArrowRight /></Link></Button></div>
        </div>
        <div className="mt-12"><MapCard /></div>
      </section>

      <section className="border-y border-border bg-card py-14 md:py-20">
        <div className="container-page grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><div><p className="eyebrow">Visit questions</p><h2 className="section-title mt-5">Plan before you travel.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Parking and physical-access details are intentionally not claimed until the clinic verifies them for publication.</p></div><div className="rounded-[1.7rem] border border-border bg-card px-6 shadow-card"><FAQList faqs={faqs} schema={false} /></div></div>
      </section>

      <section className="container-page py-12"><EmergencyNote /></section>
      <AppointmentCTA title="Ready to plan a clinic visit?" description="Request a preferred time with Dr. Pamarthi Krishna Das. The clinic will reply to confirm availability before you travel." />
    </>
  );
}

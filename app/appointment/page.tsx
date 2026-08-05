import type { Metadata } from "next";
import { Clock3, LockKeyhole, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { AppointmentForm } from "@/components/appointment/appointment-form";
import { EmergencyNote } from "@/components/shared/emergency-note";
import { PageHero } from "@/components/shared/page-hero";
import { createMetadata } from "@/lib/metadata";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "Book Psychiatrist Appointment in Vijayawada", description: "Request an appointment with Dr. Pamarthi Krishna Das at Krishna Neuro Psychiatric Centre, Suryaraopet, Vijayawada. Call, WhatsApp or use the short form.", path: "/appointment", keywords: ["book psychiatrist Vijayawada", "Dr Krishna Das appointment", "psychiatrist appointment Suryaraopet"] });

export default function AppointmentPage() {
  return (
    <>
      <PageHero badge="Appointment request" title="You do not need the perfect words to begin." description="Share only the essential booking details. The clinic will reply to confirm availability and practical next steps." breadcrumbs={[{label:"Appointment"}]} />
      <section className="container-page py-12 md:py-18">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <AppointmentForm />
          <aside className="space-y-5 lg:sticky lg:top-28">
            <div className="rounded-[1.6rem] border border-border bg-card p-6 shadow-card"><h2 className="text-lg font-extrabold tracking-[-0.025em]">Prefer direct contact?</h2><div className="mt-5 grid gap-3"><a href={`tel:${siteConfig.phones[0]}`} className="flex items-center gap-3 rounded-xl border border-border p-3.5 text-sm font-bold transition hover:border-primary/35 hover:text-primary"><Phone className="size-4.5 text-primary"/>Call {siteConfig.displayPhones[0]}</a><a href={whatsappHref()} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl border border-border p-3.5 text-sm font-bold transition hover:border-secondary/35 hover:text-secondary"><MessageCircle className="size-4.5 text-secondary"/>Open WhatsApp</a></div></div>
            <div className="rounded-[1.6rem] border border-border bg-muted/55 p-6"><h2 className="text-sm font-extrabold uppercase tracking-[0.11em] text-muted-foreground">Clinic details</h2><ul className="mt-5 grid gap-4 text-sm leading-6 text-muted-foreground"><li className="flex gap-3"><Clock3 className="mt-0.5 size-4.5 shrink-0 text-secondary"/>{siteConfig.hours.summary}<br/>{siteConfig.hours.closed}</li><li className="flex gap-3"><MapPin className="mt-0.5 size-4.5 shrink-0 text-secondary"/>{siteConfig.address.locality}, {siteConfig.address.city}</li><li className="flex gap-3"><LockKeyhole className="mt-0.5 size-4.5 shrink-0 text-secondary"/>Minimal booking information only</li></ul></div>
            <div className="flex gap-3 rounded-2xl border border-primary/15 bg-primary/6 p-5"><ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary"/><p className="text-xs leading-6 text-muted-foreground">A request is not confirmed until the clinic replies. Do not include detailed medical records in this form or WhatsApp message unless the clinic gives secure instructions.</p></div>
          </aside>
        </div>
        <EmergencyNote className="mt-8" />
      </section>
    </>
  );
}

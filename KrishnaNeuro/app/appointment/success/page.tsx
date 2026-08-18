import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Home, Phone, ShieldCheck } from "lucide-react";
import { AiEditorialImage } from "@/components/shared/ai-editorial-image";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { aiImageAlt, pageImage } from "@/lib/page-images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({ title: "Appointment Request Prepared", description: "Next steps after an appointment request to Krishna Neuro Psychiatric Centre.", path: "/appointment/success", noIndex: true });

export default async function AppointmentSuccessPage({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference } = await searchParams;
  return (
    <section className="container-page flex min-h-[72vh] items-center py-14">
      <div className="mx-auto w-full max-w-2xl rounded-[2.2rem] border border-border bg-card p-7 text-center shadow-soft md:p-12">
        <AiEditorialImage src={pageImage("appointment")} alt={aiImageAlt("taking the next step in mental healthcare")} className="mb-8 aspect-[16/7]" sizes="(max-width: 768px) 100vw, 42rem" />
        <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-secondary/12 text-secondary"><CheckCircle2 className="size-8"/></span>
        <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.13em] text-secondary">Request step completed</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.045em]">Thank you for reaching out.</h1>
        {reference && <p className="mt-4 text-sm font-bold text-foreground">Reference: <span className="rounded-md bg-muted px-2 py-1 font-mono">{reference}</span></p>}
        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-muted-foreground">If you used WhatsApp, make sure you pressed <strong className="text-foreground">Send</strong>. If the secure clinic webhook was configured, the request has been delivered. In either case, the appointment is confirmed only after the clinic replies.</p>
        <div className="mt-8 grid gap-3 rounded-2xl bg-muted/55 p-5 text-left text-sm text-muted-foreground sm:grid-cols-2"><div className="flex gap-3"><Clock3 className="size-5 shrink-0 text-secondary"/><span>Keep your phone available for scheduling.</span></div><div className="flex gap-3"><ShieldCheck className="size-5 shrink-0 text-secondary"/><span>Do not send sensitive reports until instructed.</span></div></div>
        <div className="mt-8 flex flex-wrap justify-center gap-3"><Button asChild><a href={`tel:${siteConfig.phones[0]}`}><Phone/>Call clinic</a></Button><Button asChild variant="outline"><Link href="/"><Home/>Return home</Link></Button></div>
        <Link href="/patient-journey" className="mt-7 inline-flex items-center gap-1 text-xs font-extrabold text-primary">Prepare for the visit<ArrowRight className="size-3.5"/></Link>
        <p className="mt-7 border-t border-border pt-5 text-xs leading-5 text-muted-foreground">Symptoms getting urgent? Do not wait for a reply. Call 112 or go to the nearest emergency department.</p>
      </div>
    </section>
  );
}

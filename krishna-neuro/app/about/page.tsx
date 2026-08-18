import type { Metadata } from "next";
import { ArrowRight, CalendarDays, Clock3, MapPin, ShieldCheck, Stethoscope } from "lucide-react";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "About Krishna Neuro Psychiatric Centre | Vijayawada",
  description: "Learn about Krishna Neuro Psychiatric Centre, its patient-focused approach, Dr. Pamarthi Krishna Das and consultation access in Suryaraopet, Vijayawada.",
  path: "/about",
  keywords: ["Krishna Neuro Psychiatric Centre", "psychiatric clinic Vijayawada", "mental health clinic Vijayawada"],
});

export default function AboutPage() {
  return <><PageHero badge="About the clinic" title="Krishna Neuro Psychiatric Centre" description="Professional, compassionate and confidential psychiatric and mental-health care in Suryaraopet, Vijayawada." breadcrumbs={[{label:"About"}]} actions={<><Button asChild><a href="/appointment"><CalendarDays/>Book an Appointment</a></Button><Button asChild variant="outline"><a href="/doctor/pamarthi-krishna-das">Meet Dr. Pamarthi Krishna Das<ArrowRight/></a></Button></>} />
  <section className="container-page py-16 md:py-22"><div className="grid gap-5 md:grid-cols-3"><Card className="p-6"><Stethoscope className="size-5 text-primary"/><h2 className="mt-4 text-xl font-extrabold">Professional care</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">Assessment and treatment planning are led by Dr. Pamarthi Krishna Das. Recommendations depend on each person’s clinical needs and circumstances.</p></Card><Card className="p-6"><ShieldCheck className="size-5 text-primary"/><h2 className="mt-4 text-xl font-extrabold">Confidential and respectful</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">The clinic aims to provide a non-stigmatizing environment. Confidentiality is maintained within professional, safety and legal limits.</p></Card><Card className="p-6"><MapPin className="size-5 text-primary"/><h2 className="mt-4 text-xl font-extrabold">Located in Vijayawada</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{siteConfig.address.line1}, {siteConfig.address.line2}, {siteConfig.address.locality}, {siteConfig.address.city} – {siteConfig.address.postalCode}.</p></Card></div><div className="mt-10 flex gap-4 rounded-2xl bg-muted/55 p-6"><Clock3 className="mt-1 size-5 shrink-0 text-secondary"/><div><h2 className="text-lg font-extrabold">Consultation information</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Listed clinic hours: {siteConfig.hours.summary}; {siteConfig.hours.closed}. Please call before travelling because schedules can change.</p></div></div></section><AppointmentCTA/></>;
}

import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { GoogleReviews } from "@/components/shared/google-reviews";
import { PageHero } from "@/components/shared/page-hero";
import { PatientStories } from "@/components/shared/patient-stories";
import { createMetadata } from "@/lib/metadata";
import { pageImage } from "@/lib/page-images";

export const metadata: Metadata = createMetadata({ title: "Patient Experience & Care Values", description: "See what respectful psychiatric care can feel like and visit the clinic's independent public profile for current reviews.", path: "/testimonials" });

export default function TestimonialsPage() {
  return (
    <>
      <PageHero badge="Patient experience" image={pageImage("testimonials")} imageAlt="Editorial photograph of a supportive Indian family care experience" title="Trust should come from transparent care—not manufactured praise." description="The stories below are composite scenarios that illustrate the clinic’s intended care values. They are not presented as real reviews, ratings or guaranteed outcomes." breadcrumbs={[{label:"Patient experience"}]} />
      <section className="container-page py-16 md:py-22"><div className="mb-8 flex gap-4 rounded-2xl border border-primary/15 bg-primary/6 p-5"><ShieldCheck className="size-5 shrink-0 text-primary"/><p className="text-sm leading-6 text-muted-foreground"><strong className="text-foreground">Ethical review policy:</strong> no invented rating, outcome claim or patient identity is used. Before publishing real feedback, obtain appropriate consent, preserve privacy and avoid selectively implying guaranteed recovery.</p></div><PatientStories limit={6}/><div className="mt-10"><GoogleReviews/></div></section>
      <AppointmentCTA title="Your care should be understandable, respectful and your own." />
    </>
  );
}

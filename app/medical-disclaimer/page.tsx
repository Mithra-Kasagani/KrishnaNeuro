import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, BookOpenCheck, HeartPulse, Pill, ShieldAlert } from "lucide-react";
import { WebPageJsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { coreSeoPages } from "@/data/seo-pages";
import { createMetadataFromModel } from "@/lib/metadata";
import { pageImage } from "@/lib/page-images";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.medicalDisclaimer);

const sections = [
  {
    icon: BookOpenCheck,
    title: "Educational information, not an individual diagnosis",
    body: "Website content explains general mental-health patterns and care options. It cannot assess your complete history, examination, current medicines, physical health, age, pregnancy, substance use, risk or personal preferences. Reading a page does not establish a diagnosis or create a doctor–patient relationship.",
  },
  {
    icon: Pill,
    title: "Medication safety",
    body: "Do not start, share, reduce or abruptly stop prescription medicine based on this website. Benefits, side effects, interactions and withdrawal risks differ. Discuss medication changes with the prescribing clinician; seek urgent medical care for severe reactions or immediate danger.",
  },
  {
    icon: ShieldAlert,
    title: "This website is not an emergency service",
    body: `Website forms and routine messages may not be read immediately. For a suicide attempt or current plan, overdose, seizure, severe confusion, violence or inability to stay safe in India, call ${siteConfig.emergency.india} or go to the nearest emergency department. Tele-MANAS: ${siteConfig.emergency.teleManas}.`,
  },
  {
    icon: HeartPulse,
    title: "Outcomes and treatment choices vary",
    body: "No page guarantees a cure, recovery timeline, medicine response or treatment outcome. Recommendations depend on individual assessment and may change as symptoms, evidence, health and circumstances change.",
  },
  {
    icon: AlertTriangle,
    title: "External information and changing guidance",
    body: "Links to public-health or professional sources are provided for further reading. External websites control their own content. Clinical guidance evolves, so an older page should not override current advice from a qualified professional who knows your situation.",
  },
];

export default function MedicalDisclaimerPage() {
  return (
    <>
      <WebPageJsonLd name={coreSeoPages.medicalDisclaimer.h1} description={coreSeoPages.medicalDisclaimer.metaDescription} path={coreSeoPages.medicalDisclaimer.canonicalUrl} aboutId="#clinic" dateModified={coreSeoPages.medicalDisclaimer.lastUpdated} />
      <PageHero
        badge="Important safety information"
        image={pageImage("medical-disclaimer")}
        imageAlt="Calm editorial photograph representing responsible mental-health information"
        title={coreSeoPages.medicalDisclaimer.h1}
        description="The website is designed to support understanding and preparation. It does not replace an individual medical or psychiatric assessment."
        breadcrumbs={[{ label: "Medical disclaimer" }]}
      />
      <article className="container-page py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-semibold leading-7 text-foreground">Effective date: 20 August 2026</p>
          <div className="mt-8 grid gap-5">
            {sections.map(({ icon: Icon, title, body }) => <section key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-7"><Icon className="size-5 text-primary" aria-hidden="true" /><h2 className="mt-4 text-2xl font-extrabold tracking-[-0.03em]">{title}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></section>)}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild><Link href="/appointment">Request a routine appointment<ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link href="/emergency">Read emergency guidance</Link></Button>
            <Button asChild variant="outline"><Link href="/privacy-policy">Privacy policy</Link></Button>
          </div>
        </div>
      </article>
    </>
  );
}

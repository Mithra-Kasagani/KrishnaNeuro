import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { FAQJsonLd, LocalServiceJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { FAQList } from "@/components/shared/faq-list";
import { MapCard } from "@/components/shared/map-card";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/metadata";
import { locationImage } from "@/lib/page-images";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Psychiatrist in Vijayawada — Dr. Pamarthi Krishna Das",
  description:
    "Consult Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry), for compassionate psychiatric care at Krishna Neuro Psychiatric Centre, Suryaraopet, Vijayawada.",
  path: "/psychiatrist-in-vijayawada",
  keywords: [
    "psychiatrist in Vijayawada",
    "psychiatric doctor Vijayawada",
    "mental health clinic Vijayawada",
    "Dr Pamarthi Krishna Das",
  ],
});

const faqs = [
  {
    question: "Where is Krishna Neuro Psychiatric Centre in Vijayawada?",
    answer:
      "The clinic is at D.No. 29-10-31, Narasimha Rao Naidu Street, 3rd left from Vijaya Talkies towards Nakkala Road, Suryaraopet, Vijayawada 520002.",
  },
  {
    question: "What conditions does a psychiatrist assess?",
    answer:
      "Psychiatrists assess mood, anxiety, psychosis, addiction, sleep, behaviour, attention, child and adolescent concerns, memory changes, postpartum symptoms and other mental-health problems.",
  },
  {
    question: "Do I need to know my diagnosis before booking?",
    answer:
      "No. Describe what has changed. Assessment helps clarify the condition, urgency and suitable next steps.",
  },
  {
    question: "What are the clinic timings?",
    answer:
      "The supplied clinic brochure lists Monday to Saturday, 9:00 AM to 9:00 PM, with Sunday closed. Call to confirm the doctor's availability before travel.",
  },
  {
    question: "How should I plan a visit from outside Vijayawada?",
    answer:
      "Confirm the appointment before leaving, open live directions on the day of travel and allow for changing traffic. Bring a current medicine list and relevant medical reports if available. Ask the clinic separately whether teleconsultation is suitable and available.",
  },
];

const carePoints = [
  "MBBS and MD (Psychiatry) qualifications",
  "Assessment for adults, children and older adults",
  "Addiction, sleep, mood, thought and memory care",
  "Family guidance with patient consent",
  "Medication selected and reviewed for a clear purpose",
  "Central Suryaraopet clinic location",
];

const trustCards = [
  { icon: Stethoscope, title: "Consultant-led", description: "A medical and psychiatric view of symptoms." },
  { icon: ShieldCheck, title: "Ethical", description: "No absolute outcome promises or fear-based marketing." },
  { icon: MapPin, title: "Local", description: "Suryaraopet, near Nakkala Road." },
  { icon: CalendarDays, title: "Accessible", description: "Call, WhatsApp or use the short request form." },
];

const travelSteps = [
  {
    icon: CalendarDays,
    title: "Confirm before travelling",
    description: "Request a preferred time and wait for the clinic to confirm availability before leaving.",
  },
  {
    icon: Navigation,
    title: "Use live directions",
    description: "Routes and traffic can change, so use the current map rather than a fixed journey-time estimate.",
  },
  {
    icon: ClipboardList,
    title: "Prepare useful details",
    description: "Bring a medicine list, relevant reports and a short timeline of the changes you want to discuss.",
  },
  {
    icon: MessageCircle,
    title: "Ask about visit options",
    description: "If travel is difficult, ask whether teleconsultation is available and clinically appropriate for the situation.",
  },
];

export default function VijayawadaPage() {
  return (
    <>
      <LocalServiceJsonLd
        name="Psychiatrist in Vijayawada"
        description="Consultant psychiatric care in Suryaraopet, Vijayawada."
        path="/psychiatrist-in-vijayawada"
        area="Vijayawada"
      />
      <WebPageJsonLd name="Psychiatric care in Vijayawada, grounded in dignity and evidence" description="Meet Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry), at Krishna Neuro Psychiatric Centre in Suryaraopet." path="/psychiatrist-in-vijayawada" aboutId="#physician" mainEntityId="#physician" dateModified="2026-08-20" />
      <FAQJsonLd faqs={faqs} />
      <PageHero
        badge="Consultant Psychiatrist · Vijayawada"
        image={locationImage()}
        imageAlt="Editorial mental healthcare photograph for Vijayawada"
        title="Psychiatric care in Vijayawada, grounded in dignity and evidence."
        description="Meet Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry), at Krishna Neuro Psychiatric Centre in Suryaraopet."
        breadcrumbs={[{ label: "Psychiatrist in Vijayawada" }]}
        actions={
          <>
            <Button asChild>
              <Link prefetch={false} href="/appointment"><CalendarDays />Request appointment</Link>
            </Button>
            <Button asChild variant="outline">
              <a href={`tel:${siteConfig.phones[0]}`}><Phone />Call {siteConfig.displayPhones[0]}</a>
            </Button>
          </>
        }
        aside={
          <Image
            src="/images/doctor-portrait.webp"
            alt="Dr. Pamarthi Krishna Das, psychiatrist in Vijayawada"
            width={960}
            height={1160}
            sizes="(max-width: 1024px) 90vw, 34vw"
            className="mx-auto aspect-[4/4.8] max-w-sm rounded-[2rem] border border-border object-cover object-top shadow-soft"
          />
        }
      />

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Why consult a psychiatrist</p>
            <h2 className="section-title mt-5">Medical assessment with a whole-person view.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              A psychiatrist is a medical doctor trained to assess mental-health symptoms, physical contributors,
              medicine effects and safety. Consultation does not automatically mean medication; the next step may
              be education, monitoring, therapy, practical change, tests, medicine or referral.
            </p>
            <ul className="mt-7 grid gap-3">
              {carePoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {trustCards.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-4 font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12"><MapCard /></div>
      </section>

      <section className="border-y border-border bg-muted/55 py-14 md:py-20">
        <div className="container-page">
          <div className="max-w-3xl">
            <p className="eyebrow">Travelling for a consultation</p>
            <h2 className="section-title mt-5">Plan the visit before starting your journey.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              If you are arranging travel from Mangalagiri, Guntur, Amaravati, Tenali, Gudivada, Eluru or another
              nearby area, confirm the appointment first. The clinic does not publish fixed journey times because
              routes and traffic conditions can change.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {travelSteps.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                <Icon className="size-5 text-primary" />
                <h3 className="mt-4 font-extrabold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <a href={whatsappHref("Hello Krishna Neuro Psychiatric Centre. I am planning a visit from outside Vijayawada and would like to confirm appointment availability.")} target="_blank" rel="noreferrer">
                <MessageCircle />Ask on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer"><Navigation />Open live directions</a>
            </Button>
            <Button asChild variant="soft">
              <Link href="/conditions">Explore care guides<ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="eyebrow">Questions</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.04em]">Planning a visit in Vijayawada</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Review the <Link href="/services" className="font-bold text-primary underline underline-offset-4">clinic services</Link>,
              learn about <Link href="/doctor/pamarthi-krishna-das" className="font-bold text-primary underline underline-offset-4">Dr. Pamarthi Krishna Das</Link>,
              use the <Link href="/clinic-vijayawada" className="font-bold text-primary underline underline-offset-4">clinic visit guide</Link>,
              or request a time when you are ready.
            </p>
            <Link href="/locations" className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-primary">
              Explore nearby-area travel guides<ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="rounded-[1.7rem] border border-border bg-card px-6 shadow-card">
            <FAQList faqs={faqs} schema={false} />
          </div>
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}

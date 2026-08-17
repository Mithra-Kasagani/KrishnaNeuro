import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircleQuestion } from "lucide-react";
import { FAQJsonLd } from "@/components/seo/json-ld";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { FAQList } from "@/components/shared/faq-list";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { faqs } from "@/data/faqs";
import { createMetadata } from "@/lib/metadata";
import { pageImage } from "@/lib/page-images";

export const metadata: Metadata = createMetadata({
  title: "Psychiatry FAQs: Appointments, Medicines & Privacy",
  description: "Clear answers about first psychiatric appointments, medication, confidentiality, family involvement, online consultation, timings and urgent help.",
  path: "/faqs",
});

export default function FAQsPage() {
  const grouped = Array.from(new Set(faqs.map((item) => item.category))).map((category) => ({
    category,
    items: faqs.filter((item) => item.category === category),
  }));

  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <PageHero
        badge="Frequently asked questions"
        image={pageImage("faqs")}
        imageAlt="Editorial photograph of a family conversation"
        title="Psychiatric Consultation Frequently Asked Questions"
        description="Understand appointments, treatment, privacy, family involvement and practical details before you decide on a next step."
        breadcrumbs={[{ label: "FAQs" }]}
        actions={<Button asChild><Link prefetch={false} href="/appointment"><CalendarDays />Request appointment</Link></Button>}
      />
      <section className="container-page py-14 md:py-20">
        <div className="grid gap-8">
          {grouped.map((group) => (
            <section key={group.category} className="grid gap-6 rounded-[1.7rem] border border-border bg-card p-6 shadow-card md:p-8 lg:grid-cols-[.35fr_.65fr]">
              <div>
                <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/8 text-primary"><MessageCircleQuestion className="size-5" /></span>
                <h2 className="mt-4 text-xl font-extrabold tracking-[-0.03em]">{group.category}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">Practical answers in plain language.</p>
              </div>
              <FAQList faqs={group.items} schema={false} />
            </section>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-secondary/20 bg-secondary/7 p-6 text-center">
          <h2 className="text-xl font-extrabold">Still unsure where your question fits?</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">You can request a consultation without choosing a diagnosis or service first.</p>
          <Button asChild variant="secondary" className="mt-5"><Link href="/contact">Contact the clinic<ArrowRight /></Link></Button>
        </div>
      </section>
      <AppointmentCTA />
    </>
  );
}

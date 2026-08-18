import type { Metadata } from "next";
import { CalendarDays } from "lucide-react";
import Link from "next/link";
import { ConditionDirectory } from "@/components/conditions/condition-directory";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { conditions } from "@/data/conditions";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({ title: "Mental Health Conditions We Treat", description: "Explore clear, evidence-based guides to depression, anxiety, OCD, bipolar disorder, psychosis, addiction, sleep, child psychiatry, memory and more.", path: "/conditions", keywords: ["mental health conditions", "psychiatry treatment Vijayawada", "depression anxiety psychiatrist Vijayawada"] });

export default function ConditionsPage() {
  return (
    <>
      <PageHero badge={`${conditions.length} plain-language guides`} title="Understand the pattern. Find the right next step." description="Mental illness is treatable, and early support can protect daily life. Explore symptoms and care options without fear-based language or one-size-fits-all claims." breadcrumbs={[{ label: "Conditions" }]} actions={<Button asChild><Link prefetch={false} href="/appointment"><CalendarDays/>Request consultation</Link></Button>} />
      <section className="container-page py-14 md:py-20"><ConditionDirectory /><p className="mt-8 rounded-2xl border border-border bg-muted/60 p-5 text-xs leading-6 text-muted-foreground"><strong className="text-foreground">Important:</strong> symptom lists are educational, not diagnostic checklists. Sudden confusion, seizure, overdose, a suicide plan, severe violence or inability to stay safe requires emergency care.</p></section>
      <AppointmentCTA title="You can ask for help without knowing the diagnosis." description="Describe what has changed. A consultation can clarify urgency, likely causes and appropriate options." />
    </>
  );
}

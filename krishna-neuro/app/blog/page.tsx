import type { Metadata } from "next";
import { ArticleDirectory } from "@/components/blog/article-directory";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { PageHero } from "@/components/shared/page-hero";
import { articles } from "@/data/articles";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({ title: "Mental Health Articles & Family Guides", description: "Read responsible, plain-language articles on depression, anxiety, OCD, psychosis, addiction, sleep, children, postpartum health, memory and treatment.", path: "/blog", keywords: ["mental health blog Vijayawada", "psychiatrist articles Andhra Pradesh", "mental health family guidance"] });

export default function BlogPage() {
  return (<><PageHero badge={`${articles.length} in-depth guides`} title="Mental health information for decisions that happen in real life." description="Evidence-informed, compassionate articles for patients and families—clear about what can help, what remains uncertain and when urgent care matters." breadcrumbs={[{label:"Articles"}]} /><section className="container-page py-14 md:py-20"><ArticleDirectory/><p className="mt-8 text-xs leading-6 text-muted-foreground">Editorial note: these guides provide general education and are not a substitute for individual clinical assessment. Emergency guidance takes priority over routine article advice.</p></section><AppointmentCTA /></>);
}

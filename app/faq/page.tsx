import type { Metadata } from "next";
import FAQsPage from "@/app/faqs/page";
import { coreSeoPages } from "@/data/seo-pages";
import { createMetadataFromModel } from "@/lib/metadata";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.faq, ["psychiatric consultation FAQ", "psychiatrist appointment Vijayawada", "Krishna Neuro Psychiatric Centre"]);

export default function FAQPage() {
  return <FAQsPage />;
}

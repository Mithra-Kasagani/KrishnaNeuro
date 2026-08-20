import type { Metadata } from "next";
import AboutDoctorPage from "@/app/about-doctor/page";
import { WebPageJsonLd } from "@/components/seo/json-ld";
import { coreSeoPages } from "@/data/seo-pages";
import { createMetadataFromModel } from "@/lib/metadata";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.doctor, ["Dr Pamarthi Krishna Das", "psychiatrist in Vijayawada", "Krishna Neuro Psychiatric Centre"]);

export default function DoctorPage() {
  return <><WebPageJsonLd name={coreSeoPages.doctor.h1} description={coreSeoPages.doctor.metaDescription} path={coreSeoPages.doctor.canonicalUrl} type="ProfilePage" aboutId="#physician" mainEntityId="#physician" dateModified={coreSeoPages.doctor.lastUpdated} /><AboutDoctorPage /></>;
}

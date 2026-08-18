import type { Metadata } from "next";
import AboutDoctorPage from "@/app/about-doctor/page";
import { coreSeoPages } from "@/data/seo-pages";
import { createMetadataFromModel } from "@/lib/metadata";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.doctor, ["Dr Pamarthi Krishna Das", "psychiatrist in Vijayawada", "Krishna Neuro Psychiatric Centre"]);

export default function DoctorPage() {
  return <AboutDoctorPage />;
}

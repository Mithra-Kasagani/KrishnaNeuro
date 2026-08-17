export type SeoContentModel = {
  pageTitle: string;
  metaDescription: string;
  canonicalUrl: `/${string}` | "/";
  h1: string;
  schemaType: "WebPage" | "MedicalWebPage" | "ProfilePage" | "ContactPage" | "FAQPage" | "CollectionPage";
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  indexable: boolean;
  lastUpdated: string;
  author: string;
  reviewer?: string;
};

export function defineSeoPage(page: SeoContentModel) {
  if (!page.pageTitle || !page.metaDescription || !page.canonicalUrl || !page.h1 || !page.ogTitle || !page.ogDescription || !page.ogImage || !page.lastUpdated || !page.author) {
    throw new Error(`Incomplete SEO content model for ${page.canonicalUrl || "unknown page"}`);
  }
  return Object.freeze(page);
}

export const coreSeoPages = {
  home: defineSeoPage({ pageTitle: "Krishna Neuro Psychiatric Centre | Dr. Pamarthi Krishna Das", metaDescription: "Krishna Neuro Psychiatric Centre provides professional psychiatric and mental-health care with Dr. Pamarthi Krishna Das in Vijayawada. Request an appointment or get directions.", canonicalUrl: "/", h1: "Psychiatric & Mental Health Care in Vijayawada", schemaType: "MedicalWebPage", ogTitle: "Psychiatric & Mental Health Care in Vijayawada", ogDescription: "Professional, compassionate and confidential care at Krishna Neuro Psychiatric Centre in Vijayawada.", ogImage: "/opengraph-image", indexable: true, lastUpdated: "2026-08-05", author: "Krishna Neuro Psychiatric Centre" }),
  doctor: defineSeoPage({ pageTitle: "Dr. Pamarthi Krishna Das | Psychiatrist in Vijayawada", metaDescription: "Professional profile, verified qualifications, clinical approach and consultation information for Dr. Pamarthi Krishna Das at Krishna Neuro Psychiatric Centre, Vijayawada.", canonicalUrl: "/doctor/pamarthi-krishna-das", h1: "Dr. Pamarthi Krishna Das", schemaType: "ProfilePage", ogTitle: "Dr. Pamarthi Krishna Das | Psychiatrist in Vijayawada", ogDescription: "Meet Dr. Pamarthi Krishna Das at Krishna Neuro Psychiatric Centre in Vijayawada.", ogImage: "/images/doctor-portrait.webp", indexable: true, lastUpdated: "2026-08-05", author: "Krishna Neuro Psychiatric Centre" }),
  services: defineSeoPage({ pageTitle: "Psychiatric Services in Vijayawada | Krishna Neuro Psychiatric Centre", metaDescription: "Explore psychiatric consultation and mental-health services available through Krishna Neuro Psychiatric Centre in Vijayawada.", canonicalUrl: "/services", h1: "Psychiatric & Mental Health Services in Vijayawada", schemaType: "CollectionPage", ogTitle: "Psychiatric Services in Vijayawada", ogDescription: "Professional psychiatric and mental-health services at Krishna Neuro Psychiatric Centre.", ogImage: "/images/ai/wellbeing-overview.webp", indexable: true, lastUpdated: "2026-08-05", author: "Krishna Neuro Psychiatric Centre" }),
  faq: defineSeoPage({ pageTitle: "Psychiatric Consultation FAQ | Krishna Neuro Psychiatric Centre", metaDescription: "Answers about booking, first psychiatric consultations, privacy, medication, clinic timings and emergency guidance in Vijayawada.", canonicalUrl: "/faq", h1: "Psychiatric Consultation Frequently Asked Questions", schemaType: "FAQPage", ogTitle: "Psychiatric Consultation FAQ", ogDescription: "Clear answers for patients and families considering psychiatric consultation in Vijayawada.", ogImage: "/images/ai/relationship-family.webp", indexable: true, lastUpdated: "2026-08-05", author: "Krishna Neuro Psychiatric Centre" }),
  contact: defineSeoPage({ pageTitle: "Contact Krishna Neuro Psychiatric Centre | Vijayawada", metaDescription: "Contact Krishna Neuro Psychiatric Centre in Suryaraopet, Vijayawada for voice calls, WhatsApp appointment requests and directions.", canonicalUrl: "/contact", h1: "Contact Krishna Neuro Psychiatric Centre", schemaType: "ContactPage", ogTitle: "Contact Krishna Neuro Psychiatric Centre", ogDescription: "Clinic contact details, appointment access and directions in Vijayawada.", ogImage: "/images/doctor-office.webp", indexable: true, lastUpdated: "2026-08-05", author: "Krishna Neuro Psychiatric Centre" }),
} as const;

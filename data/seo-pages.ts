import { validateSEOPage } from "@/lib/seo-validation";

export type SearchIntent = "informational" | "local" | "transactional" | "navigational" | "commercial investigation";

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
  searchIntent: SearchIntent;
  primaryKeyword: string;
  secondaryKeywords: readonly string[];
  breadcrumbLabel: string;
};

export function defineSeoPage(page: SeoContentModel) {
  validateSEOPage({
    title: page.pageTitle,
    description: page.metaDescription,
    canonical: page.canonicalUrl,
    h1: page.h1,
    schemaType: page.schemaType,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
    ogImage: page.ogImage,
    lastUpdated: page.lastUpdated,
  });
  if (!page.author.trim()) throw new Error(`Missing author for ${page.canonicalUrl}`);
  if (!page.primaryKeyword.trim()) throw new Error(`Missing primary keyword/topic for ${page.canonicalUrl}`);
  return Object.freeze(page);
}

export const coreSeoPages = {
  home: defineSeoPage({
    pageTitle: "Psychiatrist in Vijayawada | Dr. Pamarthi Krishna Das",
    metaDescription: "Consult Dr. Pamarthi Krishna Das, Psychiatrist in Vijayawada, for psychiatric consultation, mental health care and treatment at Krishna Neuro Psychiatric Centre.",
    canonicalUrl: "/",
    h1: "Psychiatric & Mental Health Care in Vijayawada",
    schemaType: "MedicalWebPage",
    ogTitle: "Psychiatric & Mental Health Care in Vijayawada",
    ogDescription: "Professional, compassionate and confidential care at Krishna Neuro Psychiatric Centre in Vijayawada.",
    ogImage: "/opengraph-image",
    indexable: true,
    lastUpdated: "2026-08-15",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "local",
    primaryKeyword: "psychiatrist in Vijayawada",
    secondaryKeywords: ["mental health care Vijayawada", "consultant psychiatrist Vijayawada"],
    breadcrumbLabel: "Home",
  }),
  doctor: defineSeoPage({
    pageTitle: "Dr. Pamarthi Krishna Das | Psychiatrist in Vijayawada",
    metaDescription: "Professional profile, verified qualifications, clinical approach and consultation information for Dr. Pamarthi Krishna Das at Krishna Neuro Psychiatric Centre, Vijayawada.",
    canonicalUrl: "/doctor/pamarthi-krishna-das",
    h1: "Dr. Pamarthi Krishna Das",
    schemaType: "ProfilePage",
    ogTitle: "Dr. Pamarthi Krishna Das | Psychiatrist in Vijayawada",
    ogDescription: "Meet Dr. Pamarthi Krishna Das at Krishna Neuro Psychiatric Centre in Vijayawada.",
    ogImage: "/images/doctor-portrait.webp",
    indexable: true,
    lastUpdated: "2026-08-15",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "navigational",
    primaryKeyword: "Dr. Pamarthi Krishna Das",
    secondaryKeywords: ["psychiatrist in Vijayawada", "consultant psychiatrist Vijayawada"],
    breadcrumbLabel: "Dr. Pamarthi Krishna Das",
  }),
  services: defineSeoPage({
    pageTitle: "Psychiatric Services in Vijayawada | Krishna Neuro Psychiatric Centre",
    metaDescription: "Explore psychiatric consultation and mental-health services available through Krishna Neuro Psychiatric Centre in Vijayawada.",
    canonicalUrl: "/services",
    h1: "Psychiatric & Mental Health Services in Vijayawada",
    schemaType: "CollectionPage",
    ogTitle: "Psychiatric Services in Vijayawada",
    ogDescription: "Professional psychiatric and mental-health services at Krishna Neuro Psychiatric Centre.",
    ogImage: "/images/ai/wellbeing-overview.webp",
    indexable: true,
    lastUpdated: "2026-08-15",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "commercial investigation",
    primaryKeyword: "psychiatric services Vijayawada",
    secondaryKeywords: ["psychiatric consultation Vijayawada", "mental health services Vijayawada"],
    breadcrumbLabel: "Services",
  }),
  faq: defineSeoPage({
    pageTitle: "Psychiatric Consultation FAQ | Krishna Neuro Psychiatric Centre",
    metaDescription: "Answers about booking, first psychiatric consultations, privacy, medication, clinic timings and emergency guidance in Vijayawada.",
    canonicalUrl: "/faq",
    h1: "Psychiatric Consultation Frequently Asked Questions",
    schemaType: "FAQPage",
    ogTitle: "Psychiatric Consultation FAQ",
    ogDescription: "Clear answers for patients and families considering psychiatric consultation in Vijayawada.",
    ogImage: "/images/ai/relationship-family.webp",
    indexable: true,
    lastUpdated: "2026-08-15",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "informational",
    primaryKeyword: "psychiatric consultation FAQ",
    secondaryKeywords: ["first psychiatrist appointment", "psychiatrist appointment Vijayawada"],
    breadcrumbLabel: "Frequently asked questions",
  }),
  contact: defineSeoPage({
    pageTitle: "Contact Krishna Neuro Psychiatric Centre | Vijayawada",
    metaDescription: "Contact Krishna Neuro Psychiatric Centre in Suryaraopet, Vijayawada for voice calls, WhatsApp appointment requests and directions.",
    canonicalUrl: "/contact",
    h1: "Contact Krishna Neuro Psychiatric Centre",
    schemaType: "ContactPage",
    ogTitle: "Contact Krishna Neuro Psychiatric Centre",
    ogDescription: "Clinic contact details, appointment access and directions in Vijayawada.",
    ogImage: "/images/doctor-office.webp",
    indexable: true,
    lastUpdated: "2026-08-15",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "transactional",
    primaryKeyword: "Krishna Neuro Psychiatric Centre contact",
    secondaryKeywords: ["psychiatrist Suryaraopet address", "psychiatrist Vijayawada phone"],
    breadcrumbLabel: "Contact",
  }),
  clinic: defineSeoPage({
    pageTitle: "Krishna Neuro Psychiatric Centre | Vijayawada Clinic",
    metaDescription: "Plan a visit to Krishna Neuro Psychiatric Centre in Suryaraopet, Vijayawada. View the verified address, clinic hours, directions and appointment options.",
    canonicalUrl: "/clinic-vijayawada",
    h1: "Visit Krishna Neuro Psychiatric Centre in Vijayawada",
    schemaType: "WebPage",
    ogTitle: "Krishna Neuro Psychiatric Centre in Vijayawada",
    ogDescription: "Clinic location, hours, directions and visit planning in Suryaraopet, Vijayawada.",
    ogImage: "/images/doctor-office.webp",
    indexable: true,
    lastUpdated: "2026-08-20",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "local",
    primaryKeyword: "Krishna Neuro Psychiatric Centre Vijayawada",
    secondaryKeywords: ["psychiatry clinic Vijayawada", "mental health clinic Suryaraopet"],
    breadcrumbLabel: "Vijayawada clinic",
  }),
  medicalDisclaimer: defineSeoPage({
    pageTitle: "Medical Disclaimer | Krishna Neuro Psychiatric Centre",
    metaDescription: "Understand the educational limits of this website, emergency guidance, medication safety and why online information cannot replace individual medical assessment.",
    canonicalUrl: "/medical-disclaimer",
    h1: "Medical Disclaimer",
    schemaType: "WebPage",
    ogTitle: "Medical Disclaimer",
    ogDescription: "Important limits and safety information for Krishna Neuro Psychiatric Centre website content.",
    ogImage: "/images/ai/wellbeing-overview.webp",
    indexable: true,
    lastUpdated: "2026-08-20",
    author: "Krishna Neuro Psychiatric Centre",
    searchIntent: "informational",
    primaryKeyword: "medical disclaimer",
    secondaryKeywords: ["mental health website disclaimer", "medical information safety"],
    breadcrumbLabel: "Medical disclaimer",
  }),
} as const;

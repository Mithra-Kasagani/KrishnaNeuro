export const siteConfig = {
  name: "Krishna Neuro Psychiatric Centre",
  shortName: "Krishna Neuro",
  doctor: "Dr. Pamarthi Krishna Das",
  credentials: "MBBS, MD (Psychiatry)",
  role: "Consultant Psychiatrist",
  description:
    "Compassionate, evidence-based psychiatric care for adults, children, older adults and families in Vijayawada.",
  // Required in production. The localhost fallback prevents inventing an unverified public domain.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000",
  email: "pkrishna9999@gmail.com",
  phones: ["+918121743999", "+918125743999"],
  displayPhones: ["81217 43999", "81257 43999"],
  whatsapp: "918125743999",
  whatsappDisplay: "+91 81257 43999",
  address: {
    line1: "D.No. 29-10-31, Narasimha Rao Naidu Street",
    line2: "3rd left from Vijaya Talkies towards Nakkala Road",
    locality: "Suryaraopet",
    city: "Vijayawada",
    region: "Andhra Pradesh",
    postalCode: "520002",
    country: "India",
  },
  geo: { latitude: 16.5110495, longitude: 80.6349422 },
  hours: {
    summary: "Monday–Saturday, 9:00 AM–9:00 PM",
    short: "Mon–Sat · 9 AM–9 PM",
    closed: "Sunday closed",
  },
  emergency: {
    india: "112",
    teleManas: "14416",
    teleManasLong: "1800-89-14416",
  },
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Krishna+Neuro+Psychiatric+Centre+Vijayawada",
  googleMapsEmbed:
    "https://www.google.com/maps?q=16.5110495,80.6349422&z=16&output=embed",
  googleBusinessUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ||
    "https://www.google.com/maps/search/?api=1&query=Krishna+Neuro+Psychiatric+Centre+Vijayawada",
} as const;

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Doctor", href: "/doctor/pamarthi-krishna-das" },
  { label: "Conditions", href: "/conditions" },
  { label: "Care", href: "/treatments" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
] as const;

export const careNavigation = [
  { label: "Treatments", href: "/treatments" },
  { label: "Services", href: "/services" },
  { label: "Patient journey", href: "/patient-journey" },
  { label: "Appointment", href: "/appointment" },
] as const;

export const resourceNavigation = [
  { label: "Mental health resources", href: "/resources" },
  { label: "Articles", href: "/blog" },
  { label: "Frequently asked questions", href: "/faq" },
  { label: "Emergency guidance", href: "/emergency" },
] as const;

export function absoluteUrl(path = "") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function phoneHref(phone = siteConfig.phones[0]) {
  return `tel:${phone}`;
}

export function whatsappHref(message?: string) {
  const text =
    message ||
    "Hello Krishna Neuro Psychiatric Centre. I would like to request an appointment with Dr. Pamarthi Krishna Das.";
  return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
}

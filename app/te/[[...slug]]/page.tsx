import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeAppointmentPage, TeAppointmentSuccess, TeArticlePage, TeBlogIndex, TeConditionPage, TeConditionsIndex, TeGalleryPage, TeHome, TeLocationPage, TeLocationsIndex, TeServicePage, TeServicesIndex, TeStandardPage } from "@/components/te/telugu-pages";
import { articles } from "@/data/articles";
import { conditions } from "@/data/conditions";
import { gallerySlides } from "@/data/gallery";
import { localPages } from "@/data/locations";
import { services } from "@/data/services";
import { teArticleMeta, teConditions, teServices } from "@/data/te";
import { articleImage, conditionImage, locationImage, pageImage, serviceImage } from "@/lib/page-images";
import { absoluteUrl, siteConfig } from "@/lib/site";

const standard = ["about-doctor", "treatments", "patient-journey", "testimonials", "resources", "faqs", "contact", "privacy-policy", "terms", "emergency", "psychiatrist-in-vijayawada", "best-psychiatrist-in-vijayawada"];

export function generateStaticParams() {
  return [
    { slug: [] },
    ...standard.map((page) => ({ slug: [page] })),
    { slug: ["conditions"] },
    ...conditions.map((item) => ({ slug: ["conditions", item.slug] })),
    { slug: ["services"] },
    ...services.map((item) => ({ slug: ["services", item.slug] })),
    { slug: ["blog"] },
    ...articles.map((item) => ({ slug: ["blog", item.slug] })),
    { slug: ["locations"] },
    ...localPages.map((item) => ({ slug: ["locations", item.slug] })),
    { slug: ["gallery"] },
    { slug: ["appointment"] },
    { slug: ["appointment", "success"] },
  ];
}

function pageTitle(parts: string[]) {
  if (!parts.length) return "విజయవాడలో సైకియాట్రిస్ట్ — డా. పామర్తి కృష్ణ దాస్";
  if (parts[0] === "conditions" && parts[1]) return `${teConditions[parts[1]]?.name || "మానసిక ఆరోగ్యం"} చికిత్స విజయవాడ`;
  if (parts[0] === "services" && parts[1]) return `${teServices[parts[1]]?.name || "సైకియాట్రిక్ సేవలు"} విజయవాడ`;
  if (parts[0] === "blog" && parts[1]) return teArticleMeta[parts[1]]?.title || "తెలుగు మానసిక ఆరోగ్య వ్యాసం";
  const titles: Record<string,string> = { gallery: "క్లినిక్ గ్యాలరీ", conditions: "మానసిక ఆరోగ్య పరిస్థితులు", services: "సైకియాట్రిక్ సేవలు", blog: "తెలుగు మానసిక ఆరోగ్య వ్యాసాలు", locations: "విజయవాడ సమీప ప్రాంతాల కోసం సైకియాట్రిస్ట్", appointment: "సైకియాట్రిస్ట్ అపాయింట్‌మెంట్", "about-doctor": "డా. పామర్తి కృష్ణ దాస్ గురించి", treatments: "సైకియాట్రిక్ చికిత్స విధానం", "patient-journey": "రోగి ప్రయాణం", testimonials: "రోగి అనుభవం", resources: "మానసిక ఆరోగ్య వనరులు", faqs: "తరచుగా అడిగే ప్రశ్నలు", contact: "క్లినిక్ సంప్రదింపు", "privacy-policy": "గోప్యతా విధానం", terms: "వెబ్‌సైట్ నిబంధనలు", emergency: "మానసిక ఆరోగ్య అత్యవసర సహాయం", "psychiatrist-in-vijayawada": "విజయవాడలో సైకియాట్రిస్ట్", "best-psychiatrist-in-vijayawada": "విజయవాడలో మంచి సైకియాట్రిస్ట్‌ను ఎలా ఎంచుకోవాలి" };
  return titles[parts[0]] || "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్";
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const route = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  const tePath = `/te${route === "/" ? "" : route}`;
  const title = pageTitle(slug);
  const description = "విజయవాడలో డా. పామర్తి కృష్ణ దాస్‌తో దయతో కూడిన, ఆధారిత మానసిక ఆరోగ్య సంరక్షణ. లక్షణాలు, చికిత్స మరియు అపాయింట్‌మెంట్ సమాచారం తెలుగులో.";
  const image = slug[0] === "gallery" ? gallerySlides[0].src : slug[0] === "conditions" && slug[1] ? conditionImage(slug[1]) : slug[0] === "services" && slug[1] ? serviceImage(slug[1]) : slug[0] === "blog" && slug[1] ? articleImage(slug[1]) : slug[0] === "locations" ? locationImage() : pageImage(slug[0] || "home");
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(tePath), languages: { "te-IN": absoluteUrl(tePath), "en-IN": absoluteUrl(route) } },
    openGraph: { type: "website", locale: "te_IN", alternateLocale: ["en_IN"], url: absoluteUrl(tePath), siteName: siteConfig.name, title, description, images: [{ url: absoluteUrl(image), width: 1586, height: 992, alt: "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్" }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(image)] },
  };
}

export default async function TeluguRoute({ params, searchParams }: { params: Promise<{ slug?: string[] }>; searchParams: Promise<{ reference?: string }> }) {
  const { slug = [] } = await params;
  if (!slug.length) return <TeHome />;
  if (standard.includes(slug[0]) && slug.length === 1) return <TeStandardPage page={slug[0]} />;
  if (slug[0] === "conditions" && slug.length === 1) return <TeConditionsIndex />;
  if (slug[0] === "conditions" && slug[1] && teConditions[slug[1]]) return <TeConditionPage slug={slug[1]} />;
  if (slug[0] === "services" && slug.length === 1) return <TeServicesIndex />;
  if (slug[0] === "services" && slug[1] && teServices[slug[1]]) return <TeServicePage slug={slug[1]} />;
  if (slug[0] === "blog" && slug.length === 1) return <TeBlogIndex />;
  if (slug[0] === "blog" && slug[1] && teArticleMeta[slug[1]]) return <TeArticlePage slug={slug[1]} />;
  if (slug[0] === "locations" && slug.length === 1) return <TeLocationsIndex />;
  if (slug[0] === "locations" && slug[1] && localPages.some((item) => item.slug === slug[1])) return <TeLocationPage slug={slug[1]} />;
  if (slug[0] === "gallery" && slug.length === 1) return <TeGalleryPage />;
  if (slug[0] === "appointment" && slug.length === 1) return <TeAppointmentPage />;
  if (slug[0] === "appointment" && slug[1] === "success") { const query = await searchParams; return <TeAppointmentSuccess reference={query.reference} />; }
  notFound();
}

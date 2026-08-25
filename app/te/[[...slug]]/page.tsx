import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/seo/json-ld";
import { TeAppointmentPage, TeAppointmentSuccess, TeArticlePage, TeBlogIndex, TeConditionPage, TeConditionsIndex, TeGalleryPage, TeHome, TeLocationPage, TeLocationsIndex, TeServicePage, TeServicesIndex, TeStandardPage } from "@/components/te/telugu-pages";
import { articles } from "@/data/articles";
import { conditions } from "@/data/conditions";
import { gallerySlides } from "@/data/gallery";
import { localPages } from "@/data/locations";
import { services } from "@/data/services";
import { teArticleMeta, teConditions, teServices } from "@/data/te";
import { articleImage, conditionImage, locationImage, pageImage, serviceImage } from "@/lib/page-images";
import { absoluteUrl, siteConfig } from "@/lib/site";

const standard = ["about-doctor", "treatments", "patient-journey", "resources", "faqs", "contact", "clinic-vijayawada", "privacy-policy", "medical-disclaimer", "terms", "emergency", "psychiatrist-in-vijayawada"];

export function generateStaticParams() {
  return [
    { slug: [] },
    ...standard.map((page) => ({ slug: [page] })),
    { slug: ["about"] },
    { slug: ["doctor", "pamarthi-krishna-das"] },
    { slug: ["faq"] },
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
  if (parts[0] === "doctor" && parts[1] === "pamarthi-krishna-das") return "డా. పామర్తి కృష్ణ దాస్ | విజయవాడ సైకియాట్రిస్ట్";
  if (parts[0] === "conditions" && parts[1]) return `${teConditions[parts[1]]?.name || "మానసిక ఆరోగ్యం"} చికిత్స విజయవాడ`;
  if (parts[0] === "services" && parts[1]) return `${teServices[parts[1]]?.name || "సైకియాట్రిక్ సేవలు"} విజయవాడ`;
  if (parts[0] === "blog" && parts[1]) return teArticleMeta[parts[1]]?.title || "తెలుగు మానసిక ఆరోగ్య వ్యాసం";
  const titles: Record<string,string> = { about: "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్ గురించి", faq: "తరచుగా అడిగే ప్రశ్నలు", gallery: "క్లినిక్ గ్యాలరీ", conditions: "మానసిక ఆరోగ్య పరిస్థితులు", services: "సైకియాట్రిక్ సేవలు", blog: "తెలుగు మానసిక ఆరోగ్య వ్యాసాలు", locations: "విజయవాడ సమీప ప్రాంతాల కోసం సైకియాట్రిస్ట్", appointment: "సైకియాట్రిస్ట్ అపాయింట్‌మెంట్", "about-doctor": "డా. పామర్తి కృష్ణ దాస్ గురించి", treatments: "సైకియాట్రిక్ చికిత్స విధానం", "patient-journey": "రోగి ప్రయాణం", resources: "మానసిక ఆరోగ్య వనరులు", faqs: "తరచుగా అడిగే ప్రశ్నలు", contact: "క్లినిక్ సంప్రదింపు", "clinic-vijayawada": "విజయవాడలో కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్", "privacy-policy": "గోప్యతా విధానం", "medical-disclaimer": "వైద్య సమాచార పరిమితులు", terms: "వెబ్‌సైట్ నిబంధనలు", emergency: "మానసిక ఆరోగ్య అత్యవసర సహాయం", "psychiatrist-in-vijayawada": "విజయవాడలో సైకియాట్రిస్ట్" };
  return titles[parts[0]] || "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్";
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }): Promise<Metadata> {
  const { slug = [] } = await params;
  const route = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  const tePath = `/te${route === "/" ? "" : route}`;
  const localizedCondition = slug[0] === "conditions" && slug[1] ? teConditions[slug[1]] : undefined;
  const title = localizedCondition?.seoTitle || pageTitle(slug);
  const description = localizedCondition?.seoDescription || (localizedCondition ? `${localizedCondition.name} లక్షణాలు, నిర్ధారణ, చికిత్స ఎంపికలు మరియు విజయవాడలో సైకియాట్రిక్ కన్సల్టేషన్ సమాచారం.` : `${title} గురించి బాధ్యతాయుత తెలుగు సమాచారం మరియు విజయవాడలో కన్సల్టేషన్ వివరాలు.`);
  const image = slug[0] === "gallery" ? gallerySlides[0].src : slug[0] === "conditions" && slug[1] ? conditionImage(slug[1]) : slug[0] === "services" && slug[1] ? serviceImage(slug[1]) : slug[0] === "blog" && slug[1] ? articleImage(slug[1]) : slug[0] === "locations" ? locationImage() : pageImage(slug[0] || "home");
  const isLocationGuide = slug[0] === "locations";
  const isAppointmentSuccess = slug[0] === "appointment" && slug[1] === "success";
  return {
    title,
    description,
    robots: isAppointmentSuccess ? { index: false, follow: false } : isLocationGuide ? { index: false, follow: true } : { index: true, follow: true },
    alternates: { canonical: absoluteUrl(tePath), languages: { "te-IN": absoluteUrl(tePath), "en-IN": absoluteUrl(route) } },
    openGraph: { type: slug[0] === "blog" && Boolean(slug[1]) ? "article" : "website", locale: "te_IN", alternateLocale: ["en_IN"], url: absoluteUrl(tePath), siteName: siteConfig.name, title, description, images: [{ url: absoluteUrl(image), width: 1586, height: 992, alt: "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్" }] },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(image)] },
  };
}

function teluguBreadcrumbLabel(slug: string[]) {
  if (slug[0] === "conditions" && slug[1]) return teConditions[slug[1]]?.name || "పరిస్థితి";
  if (slug[0] === "services" && slug[1]) return teServices[slug[1]]?.name || "సేవ";
  if (slug[0] === "blog" && slug[1]) return teArticleMeta[slug[1]]?.title || "వ్యాసం";
  return pageTitle(slug);
}

export default async function TeluguRoute({ params, searchParams }: { params: Promise<{ slug?: string[] }>; searchParams: Promise<{ reference?: string }> }) {
  const { slug = [] } = await params;
  const withBreadcrumb = (content: React.ReactNode) => <div lang="te-IN"><BreadcrumbJsonLd items={[{ name: "హోమ్", item: "/te" }, { name: teluguBreadcrumbLabel(slug), item: "" }]} />{content}</div>;
  const withStandardSchema = (content: React.ReactNode, page: string) => {
    const path = `/te/${page}`;
    const profile = page === "about" || page === "about-doctor" || page === "doctor/pamarthi-krishna-das";
    const type: "ProfilePage" | "ContactPage" | "WebPage" = profile ? "ProfilePage" : page === "contact" ? "ContactPage" : "WebPage";
    const updated = ["clinic-vijayawada", "medical-disclaimer"].includes(page) ? "2026-08-20" : "2026-08-15";
    return withBreadcrumb(<><WebPageJsonLd name={pageTitle(page.split("/"))} description={`${pageTitle(page.split("/"))} గురించి బాధ్యతాయుత తెలుగు సమాచారం.`} path={path} type={type} aboutId={profile ? "#physician" : "#clinic"} mainEntityId={profile ? "#physician" : undefined} dateModified={updated} language="te-IN" />{content}</>);
  };
  if (!slug.length) return <div lang="te-IN"><WebPageJsonLd name={pageTitle([])} description="విజయవాడలో డా. పామర్తి కృష్ణ దాస్‌తో మానసిక ఆరోగ్య సేవల అధికారిక తెలుగు వెబ్‌సైట్." path="/te" type="MedicalWebPage" aboutId="#clinic" dateModified="2026-08-15" language="te-IN" /><TeHome /></div>;
  if (slug[0] === "about" && slug.length === 1) return withStandardSchema(<TeStandardPage page="about-doctor" />, "about");
  if (slug[0] === "doctor" && slug[1] === "pamarthi-krishna-das") return withStandardSchema(<TeStandardPage page="about-doctor" />, "doctor/pamarthi-krishna-das");
  if (slug[0] === "faq" && slug.length === 1) return withBreadcrumb(<TeStandardPage page="faqs" />);
  if (standard.includes(slug[0]) && slug.length === 1) return withStandardSchema(<TeStandardPage page={slug[0]} />, slug[0]);
  if (slug[0] === "conditions" && slug.length === 1) return withBreadcrumb(<TeConditionsIndex />);
  if (slug[0] === "conditions" && slug[1] && teConditions[slug[1]]) return withBreadcrumb(<TeConditionPage slug={slug[1]} />);
  if (slug[0] === "services" && slug.length === 1) return withBreadcrumb(<TeServicesIndex />);
  if (slug[0] === "services" && slug[1] && teServices[slug[1]]) return withBreadcrumb(<TeServicePage slug={slug[1]} />);
  if (slug[0] === "blog" && slug.length === 1) return withBreadcrumb(<TeBlogIndex />);
  if (slug[0] === "blog" && slug[1] && teArticleMeta[slug[1]]) return withBreadcrumb(<TeArticlePage slug={slug[1]} />);
  if (slug[0] === "locations" && slug.length === 1) return withBreadcrumb(<TeLocationsIndex />);
  if (slug[0] === "locations" && slug[1] && localPages.some((item) => item.slug === slug[1])) return withBreadcrumb(<TeLocationPage slug={slug[1]} />);
  if (slug[0] === "gallery" && slug.length === 1) return withBreadcrumb(<TeGalleryPage />);
  if (slug[0] === "appointment" && slug.length === 1) return withBreadcrumb(<TeAppointmentPage />);
  if (slug[0] === "appointment" && slug[1] === "success") { const query = await searchParams; return withBreadcrumb(<TeAppointmentSuccess reference={query.reference} />); }
  notFound();
}

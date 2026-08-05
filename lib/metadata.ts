import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function createMetadata({ title, description, path = "/", image = "/opengraph-image", noIndex = false, keywords = [] }: { title: string; description: string; path?: string; image?: string; noIndex?: boolean; keywords?: string[] }): Metadata {
  const canonical = absoluteUrl(path);
  const teluguPath = path === "/" ? "/te" : `/te${path.startsWith("/") ? path : `/${path}`}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical, languages: { "en-IN": canonical, "te-IN": absoluteUrl(teluguPath) } },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: {
      type: "website",
      locale: "en_IN",
      alternateLocale: ["te_IN"],
      url: canonical,
      siteName: siteConfig.name,
      title,
      description,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${siteConfig.name} — hope, dignity and evidence-based care` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [absoluteUrl(image)] },
  };
}

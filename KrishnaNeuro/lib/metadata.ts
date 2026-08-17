import type { Metadata } from "next";
import type { SeoContentModel } from "@/data/seo-pages";
import { absoluteUrl, siteConfig } from "@/lib/site";

export function createMetadata({ title, description, path = "/", image = "/opengraph-image", noIndex = false, keywords = [], ogTitle = title, ogDescription = description }: { title: string; description: string; path?: string; image?: string; noIndex?: boolean; keywords?: string[]; ogTitle?: string; ogDescription?: string }): Metadata {
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
      title: ogTitle,
      description: ogDescription,
      images: [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${siteConfig.name} — professional mental-health care` }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, images: [absoluteUrl(image)] },
  };
}

export function createMetadataFromModel(page: SeoContentModel, keywords: string[] = []): Metadata {
  return createMetadata({
    title: page.pageTitle,
    description: page.metaDescription,
    path: page.canonicalUrl,
    image: page.ogImage,
    noIndex: !page.indexable,
    keywords,
    ogTitle: page.ogTitle,
    ogDescription: page.ogDescription,
  });
}

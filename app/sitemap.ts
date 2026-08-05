import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { conditions } from "@/data/conditions";
import { localPages } from "@/data/locations";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

const staticPages = ["", "/about-doctor", "/conditions", "/treatments", "/services", "/patient-journey", "/testimonials", "/resources", "/blog", "/faqs", "/appointment", "/contact", "/privacy-policy", "/terms", "/emergency", "/gallery", "/locations", "/psychiatrist-in-vijayawada", "/best-psychiatrist-in-vijayawada"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-08-05");
  const paths = [
    ...staticPages,
    ...conditions.map((item) => `/conditions/${item.slug}`),
    ...services.map((item) => `/services/${item.slug}`),
    ...localPages.map((item) => `/locations/${item.slug}`),
    ...articles.map((item) => `/blog/${item.slug}`),
  ];
  return paths.flatMap((path, index) => {
    const en = `${siteConfig.url}${path}`;
    const te = `${siteConfig.url}/te${path}`;
    const alternates = { languages: { "en-IN": en, "te-IN": te } };
    const priority = index === 0 ? 1 : path === "/appointment" ? 0.9 : path.startsWith("/conditions/") ? 0.82 : 0.72;
    return [
      { url: en, lastModified: now, changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly", priority, alternates },
      { url: te, lastModified: now, changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly", priority: Math.max(0.65, priority - 0.02), alternates },
    ];
  });
}

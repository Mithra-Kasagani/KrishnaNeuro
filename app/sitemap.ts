import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { conditions } from "@/data/conditions";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

type SitemapSource = {
  path: string;
  updatedAt: string;
  teluguUpdatedAt?: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
};

const staticPages: SitemapSource[] = [
  { path: "", updatedAt: "2026-08-15", priority: 1, changeFrequency: "weekly" },
  { path: "/about", updatedAt: "2026-08-15", priority: 0.72, changeFrequency: "monthly" },
  { path: "/doctor/pamarthi-krishna-das", updatedAt: "2026-08-15", priority: 0.9, changeFrequency: "monthly" },
  { path: "/conditions", updatedAt: "2026-08-15", priority: 0.84, changeFrequency: "monthly" },
  { path: "/treatments", updatedAt: "2026-08-15", priority: 0.78, changeFrequency: "monthly" },
  { path: "/services", updatedAt: "2026-08-15", priority: 0.84, changeFrequency: "monthly" },
  { path: "/patient-journey", updatedAt: "2026-08-15", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources", updatedAt: "2026-08-15", priority: 0.72, changeFrequency: "monthly" },
  { path: "/blog", updatedAt: "2026-08-15", priority: 0.75, changeFrequency: "weekly" },
  { path: "/faq", updatedAt: "2026-08-15", priority: 0.72, changeFrequency: "monthly" },
  { path: "/appointment", updatedAt: "2026-08-15", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", updatedAt: "2026-08-15", priority: 0.86, changeFrequency: "monthly" },
  { path: "/clinic-vijayawada", updatedAt: "2026-08-20", priority: 0.82, changeFrequency: "monthly" },
  { path: "/privacy-policy", updatedAt: "2026-08-20", priority: 0.45, changeFrequency: "monthly" },
  { path: "/medical-disclaimer", updatedAt: "2026-08-20", priority: 0.45, changeFrequency: "monthly" },
  { path: "/terms", updatedAt: "2026-08-20", priority: 0.45, changeFrequency: "monthly" },
  { path: "/emergency", updatedAt: "2026-08-15", priority: 0.75, changeFrequency: "monthly" },
  { path: "/gallery", updatedAt: "2026-08-20", priority: 0.67, changeFrequency: "monthly" },
  { path: "/psychiatrist-in-vijayawada", updatedAt: "2026-08-20", priority: 0.88, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sources: SitemapSource[] = [
    ...staticPages,
    ...conditions.map((item) => ({ path: `/conditions/${item.slug}`, updatedAt: item.updatedAt, priority: 0.82, changeFrequency: "monthly" as const })),
    ...services.map((item) => ({ path: `/services/${item.slug}`, updatedAt: item.updatedAt, priority: 0.76, changeFrequency: "monthly" as const })),
    ...articles.map((item) => ({ path: `/blog/${item.slug}`, updatedAt: item.updatedAt, teluguUpdatedAt: "2026-08-20", priority: 0.7, changeFrequency: "monthly" as const })),
  ];

  return sources.flatMap((source) => {
    const englishUrl = `${siteConfig.url}${source.path}`;
    const teluguUrl = `${siteConfig.url}/te${source.path}`;
    const alternates = { languages: { "en-IN": englishUrl, "te-IN": teluguUrl } };
    const lastModified = new Date(source.updatedAt);
    const teluguLastModified = new Date(source.teluguUpdatedAt || source.updatedAt);
    return [
      { url: englishUrl, lastModified, changeFrequency: source.changeFrequency, priority: source.priority, alternates },
      { url: teluguUrl, lastModified: teluguLastModified, changeFrequency: source.changeFrequency, priority: Math.max(0.4, source.priority - 0.02), alternates },
    ];
  });
}

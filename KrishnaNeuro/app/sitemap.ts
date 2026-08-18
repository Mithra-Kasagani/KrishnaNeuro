import type { MetadataRoute } from "next";
import { articles } from "@/data/articles";
import { conditions } from "@/data/conditions";
import { services } from "@/data/services";
import { siteConfig } from "@/lib/site";

const corePages = [
  "",
  "/about",
  "/doctor/pamarthi-krishna-das",
  "/conditions",
  "/treatments",
  "/services",
  "/patient-journey",
  "/resources",
  "/blog",
  "/faq",
  "/appointment",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/emergency",
  "/gallery",
  "/psychiatrist-in-vijayawada",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-08-05");
  const paths = [
    ...corePages,
    ...conditions.map((item) => `/conditions/${item.slug}`),
    ...services.map((item) => `/services/${item.slug}`),
    ...articles.map((item) => `/blog/${item.slug}`),
  ];

  return paths.flatMap((path, index) => {
    const englishUrl = `${siteConfig.url}${path}`;
    const teluguUrl = `${siteConfig.url}/te${path}`;
    const alternates = { languages: { "en-IN": englishUrl, "te-IN": teluguUrl } };
    const priority = index === 0 ? 1 : path === "/appointment" ? 0.9 : path.startsWith("/conditions/") ? 0.82 : 0.74;
    return [
      { url: englishUrl, lastModified: now, changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly", priority, alternates },
      { url: teluguUrl, lastModified: now, changeFrequency: (index === 0 ? "weekly" : "monthly") as "weekly" | "monthly", priority: Math.max(0.65, priority - 0.02), alternates },
    ];
  });
}

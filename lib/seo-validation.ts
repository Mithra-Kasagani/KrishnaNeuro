export type SEOPageValidationInput = {
  title: string;
  description: string;
  canonical: string;
  h1: string;
  schemaType: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  lastUpdated: string;
};

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const lowerCasePath = /^\/[a-z0-9][a-z0-9/-]*$|^\/$/;

/**
 * Validates only objective, high-confidence SEO invariants. It intentionally
 * avoids brittle character-count rules that could reject a useful human title.
 */
export function validateSEOPage(page: SEOPageValidationInput) {
  const issues: string[] = [];
  const label = page.canonical || "unknown page";

  if (!page.title.trim()) issues.push("missing title");
  if (page.title.length > 90) issues.push(`title is unusually long (${page.title.length} characters)`);
  if (!page.description.trim()) issues.push("missing meta description");
  if (page.description.length > 220) issues.push(`description is unusually long (${page.description.length} characters)`);
  if (!page.h1.trim()) issues.push("missing H1");
  if (!page.schemaType.trim()) issues.push("missing schema type");
  if (!page.ogTitle.trim() || !page.ogDescription.trim()) issues.push("incomplete Open Graph text");
  if (!page.ogImage.startsWith("/") && !page.ogImage.startsWith("https://")) issues.push("Open Graph image must be root-relative or HTTPS");
  if (!lowerCasePath.test(page.canonical)) issues.push("canonical path must be lowercase and clean");
  if (page.canonical !== "/" && page.canonical.endsWith("/")) issues.push("canonical path must not have a trailing slash");
  if (page.canonical.includes("?") || page.canonical.includes("#")) issues.push("canonical path must not contain a query or fragment");
  if (!isoDate.test(page.lastUpdated) || Number.isNaN(Date.parse(`${page.lastUpdated}T00:00:00Z`))) issues.push("lastUpdated must be a valid YYYY-MM-DD date");

  if (issues.length) throw new Error(`Invalid SEO configuration for ${label}: ${issues.join("; ")}`);
  return page;
}

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function unique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) failures.push(`${label} contains duplicate values: ${[...new Set(duplicates)].join(", ")}`);
}

function slugs(relativePath) {
  return [...read(relativePath).matchAll(/\bslug:\s*"([a-z0-9-]+)"/g)].map((match) => match[1]);
}

const conditionSlugs = slugs("data/conditions.ts");
const serviceSlugs = slugs("data/services.ts");
const articleSlugs = slugs("data/articles.ts");

if (conditionSlugs.length !== 30) failures.push(`Expected 30 condition records, found ${conditionSlugs.length}`);
if (serviceSlugs.length !== 10) failures.push(`Expected 10 service records, found ${serviceSlugs.length}`);
if (articleSlugs.length !== 12) failures.push(`Expected 12 article records, found ${articleSlugs.length}`);
unique(conditionSlugs, "Condition data");
unique(serviceSlugs, "Service data");
unique(articleSlugs, "Article data");

for (const slug of conditionSlugs) {
  const image = path.join(root, "public", "images", "conditions", "individual", `${slug}.webp`);
  if (!fs.existsSync(image)) failures.push(`Missing condition image: public/images/conditions/individual/${slug}.webp`);
}

const seoSource = read("data/seo-pages.ts");
const coreCanonicals = [...seoSource.matchAll(/canonicalUrl:\s*"([^"]+)"/g)].map((match) => match[1]);
const coreTitles = [...seoSource.matchAll(/pageTitle:\s*"([^"]+)"/g)].map((match) => match[1]);
const coreDescriptions = [...seoSource.matchAll(/metaDescription:\s*"([^"]+)"/g)].map((match) => match[1]);
unique(coreCanonicals, "Core SEO canonicals");
unique(coreTitles, "Core SEO titles");
unique(coreDescriptions, "Core SEO descriptions");
for (const canonical of coreCanonicals) {
  if (canonical !== "/" && (!/^\/[a-z0-9][a-z0-9/-]*$/.test(canonical) || canonical.endsWith("/") || canonical.includes("//"))) failures.push(`Invalid canonical path in core SEO data: ${canonical}`);
}

const medicalReferenceSource = read("data/medical-references.ts");
const medicalReferenceUrls = [...medicalReferenceSource.matchAll(/href:\s*"(https:\/\/[^\"]+)"/g)].map((match) => match[1]);
if (new Set(medicalReferenceUrls).size < 10) failures.push(`Expected a useful authoritative reference set, found ${new Set(medicalReferenceUrls).size} unique URLs`);

const conditionSource = read("data/conditions.ts");
const articleSource = read("data/articles.ts");
for (const [label, source] of [["conditions", conditionSource], ["articles", articleSource]]) {
  for (const match of source.matchAll(/reviewed:\s*true/g)) {
    const nearby = source.slice(match.index, match.index + 320);
    if (!/reviewedAt:\s*"\d{4}-\d{2}-\d{2}"/.test(nearby)) failures.push(`${label} contains reviewed: true without a nearby genuine reviewedAt date`);
  }
}

const analyticsSource = `${read("components/privacy/analytics-consent.tsx")}\n${read("components/appointment/appointment-form.tsx")}\n${read("components/appointment/telugu-appointment-form.tsx")}`;
for (const event of ["clinic_phone_click", "clinic_whatsapp_click", "appointment_button_click", "appointment_form_started", "appointment_form_submitted", "directions_click", "clinic_contact_click"]) {
  if (!analyticsSource.includes(event)) failures.push(`Missing privacy-safe conversion event: ${event}`);
}

const siteSource = read("lib/site.ts");
if (!/process\.env\.NEXT_PUBLIC_SITE_URL/.test(siteSource)) failures.push("Central site URL is not derived from NEXT_PUBLIC_SITE_URL");
if (!/http:\/\/localhost:3000/.test(siteSource)) failures.push("Safe local-development URL fallback is missing");

for (const required of [
  "app/robots.ts",
  "app/sitemap.ts",
  "app/not-found.tsx",
  "app/llms.txt/route.ts",
  "public/site.webmanifest",
  "public/favicon.ico",
  "content/medical-content-governance.md",
]) {
  if (!fs.existsSync(path.join(root, required))) failures.push(`Required SEO/trust file is missing: ${required}`);
}

if (failures.length) {
  console.error(`Static SEO validation failed (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(`Static SEO validation passed: ${conditionSlugs.length} conditions, ${serviceSlugs.length} services, ${articleSlugs.length} articles, ${coreCanonicals.length} core SEO records, ${new Set(medicalReferenceUrls).size} authoritative reference URLs, unique core metadata, canonical paths, medical-review invariants and condition image coverage.`);

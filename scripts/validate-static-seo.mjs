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
const videoSource = read("data/gallery-videos.ts");
const videoIds = [...videoSource.matchAll(/\bid:\s*"([A-Za-z0-9_-]{11})"/g)].map((match) => match[1]);
const videoUrls = [...videoSource.matchAll(/youtubeUrl:\s*"(https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11})"/g)].map((match) => match[1]);

if (conditionSlugs.length !== 30) failures.push(`Expected 30 condition records, found ${conditionSlugs.length}`);
if (serviceSlugs.length !== 10) failures.push(`Expected 10 service records, found ${serviceSlugs.length}`);
if (articleSlugs.length !== 12) failures.push(`Expected 12 article records, found ${articleSlugs.length}`);
if (videoIds.length !== 7 || videoUrls.length !== 7) failures.push(`Expected 7 YouTube gallery records, found ${videoIds.length} IDs and ${videoUrls.length} URLs`);
unique(videoIds, "Gallery video data");
unique(videoUrls, "Gallery video URLs");
for (const id of videoIds) {
  if (!videoUrls.some((url) => url.endsWith(`v=${id}`))) failures.push(`Gallery video ${id} does not have a matching YouTube URL`);
  if (!fs.existsSync(path.join(root, "public", "images", "gallery", "videos", `${id}.webp`))) failures.push(`Missing local gallery video thumbnail for ${id}`);
}
unique(conditionSlugs, "Condition data");
unique(serviceSlugs, "Service data");
unique(articleSlugs, "Article data");

const serviceSource = read("data/services.ts");
const relatedConditionBlocks = [...serviceSource.matchAll(/relatedConditions:\s*\[([^\]]+)\]/g)].map((match) => [...match[1].matchAll(/"([a-z0-9-]+)"/g)].map((item) => item[1]));
const serviceFaqBlocks = [...serviceSource.matchAll(/\bfaqs:\s*\[/g)].length;
if (relatedConditionBlocks.length !== serviceSlugs.length) failures.push(`Expected related-condition mappings for ${serviceSlugs.length} services, found ${relatedConditionBlocks.length}`);
if (serviceFaqBlocks !== serviceSlugs.length) failures.push(`Expected FAQ data for ${serviceSlugs.length} services, found ${serviceFaqBlocks}`);
for (const relatedSlug of relatedConditionBlocks.flat()) if (!conditionSlugs.includes(relatedSlug)) failures.push(`Service references unknown condition slug: ${relatedSlug}`);
const teluguSource = read("data/te.ts");
for (const slug of serviceSlugs) {
  const escaped = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  if (!new RegExp(`(?:"${escaped}"|\\b${escaped}):\\s*\\[`).test(teluguSource)) failures.push(`Missing Telugu service FAQs for ${slug}`);
}
const teluguArticleSource = read("data/te-article-sections.ts");
for (const slug of articleSlugs) {
  if (!teluguArticleSource.includes(`"${slug}": [`)) failures.push(`Missing unique Telugu article sections for ${slug}`);
}

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

const entitySources = ["app", "components", "data", "lib"].flatMap((directory) => fs.readdirSync(path.join(root, directory), { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile() && /\.(?:ts|tsx)$/.test(entry.name)).map((entry) => path.join(entry.parentPath || entry.path, entry.name))).map((file) => fs.readFileSync(file, "utf8")).join("\n");
if (/Dr\. Krishna Das|డా\. కృష్ణ దాస్|Pamarti|Krishnadas|Dr\. P\. Krishna/.test(entitySources)) failures.push("Abbreviated or inconsistent doctor-name variant found in public source data");

const schemaSource = read("components/seo/json-ld.tsx");
if (/AggregateRating|NEXT_PUBLIC_GOOGLE_RATING|NEXT_PUBLIC_GOOGLE_REVIEW_COUNT/.test(schemaSource)) failures.push("Review/rating schema must not be emitted without an eligible visible review system");

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

console.log(`Static SEO validation passed: ${conditionSlugs.length} conditions, ${serviceSlugs.length} services, ${articleSlugs.length} English/Telugu article sets, ${videoIds.length} gallery videos, ${coreCanonicals.length} core SEO records, ${new Set(medicalReferenceUrls).size} authoritative reference URLs, unique core metadata, canonical paths, medical-review invariants and image coverage.`);

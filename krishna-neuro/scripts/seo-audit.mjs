const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];
const warnings = [];

function value(html, pattern) { return html.match(pattern)?.[1]?.trim() || ""; }
function clean(value) { return value.replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const canonicalUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const paths = [...new Set(canonicalUrls.map((url) => new URL(url).pathname))];
const titles = new Map();
const descriptions = new Map();
const internalPaths = new Set();
let missingReviewerCount = 0;

async function auditPath(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  if (!response.ok) { failures.push(`${path}: HTTP ${response.status}`); return; }
  const html = await response.text();
  for (const match of html.matchAll(/<a\b[^>]+href="([^"]+)"/gi)) {
    const href = match[1];
    if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/_next/")) internalPaths.add(href.split("#")[0].split("?")[0] || "/");
  }

  const title = clean(value(html, /<title>(.*?)<\/title>/is));
  const description = clean(value(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || value(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/i));
  const canonical = value(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || value(html, /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const ogFields = ["og:title", "og:description", "og:image", "og:url", "og:type"].filter((property) => !new RegExp(`<meta[^>]+property="${property}"`, "i").test(html));
  const missingAlt = [...html.matchAll(/<img\b([^>]*)>/gi)].filter((match) => !/\balt=/.test(match[1])).length;
  const hasEnglishAlternate = /<link[^>]+hreflang="en-IN"/i.test(html);
  const hasTeluguAlternate = /<link[^>]+hreflang="te-IN"/i.test(html);
  const nestedMedicalPage = /^\/(?:te\/)?(?:conditions|blog|services)\/.+/.test(path);
  const hasBreadcrumb = /"@type":"BreadcrumbList"/.test(html);
  const medicalContent = /^\/(?:te\/)?(?:conditions|blog)\/.+/.test(path);
  const hasReviewer = /Medically reviewed by|వైద్య సమీక్ష/.test(html) || /"reviewedBy"/.test(html);

  const jsonLdScripts = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  let invalidJsonLd = 0;
  for (const script of jsonLdScripts) { try { JSON.parse(script); } catch { invalidJsonLd += 1; } }

  const teluguPage = path === "/te" || path.startsWith("/te/");
  const minimumTitleLength = teluguPage ? 12 : 25;
  const maximumTitleLength = teluguPage ? 75 : 70;
  const minimumDescriptionLength = teluguPage ? 60 : 90;
  const maximumDescriptionLength = teluguPage ? 210 : 180;
  if (!title) failures.push(`${path}: missing title`);
  if (title && title.length < minimumTitleLength) warnings.push(`${path}: title may be too short (${title.length} characters)`);
  if (title.length > maximumTitleLength) warnings.push(`${path}: title may be too long (${title.length} characters)`);
  if (!description) failures.push(`${path}: missing meta description`);
  if (description && description.length < minimumDescriptionLength) warnings.push(`${path}: description may be too short (${description.length} characters)`);
  if (description.length > maximumDescriptionLength) warnings.push(`${path}: description may be too long (${description.length} characters)`);
  if (!canonical) failures.push(`${path}: missing canonical`);
  if (h1Count !== 1) failures.push(`${path}: expected 1 H1, found ${h1Count}`);
  if (noindex) failures.push(`${path}: sitemap URL is noindex`);
  if (ogFields.length) failures.push(`${path}: missing ${ogFields.join(", ")}`);
  if (!jsonLdScripts.length) failures.push(`${path}: missing structured data`);
  if (invalidJsonLd) failures.push(`${path}: ${invalidJsonLd} invalid JSON-LD blocks`);
  if (nestedMedicalPage && !hasBreadcrumb) failures.push(`${path}: missing breadcrumb structured data`);
  if (!hasEnglishAlternate || !hasTeluguAlternate) failures.push(`${path}: missing reciprocal locale alternate`);
  if (missingAlt) failures.push(`${path}: ${missingAlt} images without alt attributes`);
  if (medicalContent && !hasReviewer) missingReviewerCount += 1;

  if (title) titles.set(title, [...(titles.get(title) || []), path]);
  if (description) descriptions.set(description, [...(descriptions.get(description) || []), path]);
}

for (let index = 0; index < paths.length; index += 8) await Promise.all(paths.slice(index, index + 8).map(auditPath));
for (const [title, titlePaths] of titles) if (titlePaths.length > 1) failures.push(`Duplicate title: ${JSON.stringify(title)} on ${titlePaths.join(", ")}`);
for (const [description, descriptionPaths] of descriptions) if (descriptionPaths.length > 1) failures.push(`Duplicate description on ${descriptionPaths.join(", ")}: ${JSON.stringify(description.slice(0, 100))}`);

const internalPathList = [...internalPaths];
for (let index = 0; index < internalPathList.length; index += 12) {
  await Promise.all(internalPathList.slice(index, index + 12).map(async (path) => {
    const response = await fetch(`${base}${path}`, { redirect: "follow" });
    if (!response.ok) failures.push(`Broken internal link: ${path} returned ${response.status}`);
  }));
}

const robotsResponse = await fetch(`${base}/robots.txt`);
if (!robotsResponse.ok) failures.push(`robots.txt returned ${robotsResponse.status}`);
const robots = await robotsResponse.text();
if (!robots.includes("Sitemap:")) failures.push("robots.txt does not reference sitemap.xml");
if (/Disallow:\s*\/$/m.test(robots)) failures.push("robots.txt blocks the public site");
if (!/Disallow:\s*\/api\//.test(robots)) warnings.push("robots.txt does not explicitly disallow /api/");

if (missingReviewerCount) warnings.push(`${missingReviewerCount} medical condition/article pages are not marked as medically reviewed. Reviewer UI/schema support exists, but review must not be claimed until the doctor confirms it.`);
console.log(`Audited ${paths.length} canonical indexable URLs.`);
if (warnings.length) console.log(`Warnings (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (failures.length) { console.error(`Critical SEO failures (${failures.length}):\n- ${failures.join("\n- ")}`); process.exit(1); }
console.log(`SEO audit passed: titles, descriptions, H1s, canonicals, indexability, Open Graph, JSON-LD validity, breadcrumbs, hreflang, alt attributes, ${internalPathList.length} internal links, sitemap and robots.txt.`);

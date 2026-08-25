const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];
const warnings = [];

function value(html, pattern) { return html.match(pattern)?.[1]?.trim() || ""; }
function clean(value) { return value.replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function contentFingerprint(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html;
  const text = clean(main.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ")).toLowerCase();
  const words = text.match(/[\p{L}\p{N}]+/gu) || [];
  const shingles = new Set();
  for (let index = 0; index <= words.length - 5; index += 1) shingles.add(words.slice(index, index + 5).join(" "));
  return shingles;
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const canonicalUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const paths = [...new Set(canonicalUrls.map((url) => new URL(url).pathname))];
const expectedOrigin = new URL(process.env.EXPECTED_ORIGIN || base).origin;
if (!canonicalUrls.length) failures.push("sitemap.xml contains no canonical URLs");
if (canonicalUrls.some((url) => new URL(url).origin !== expectedOrigin)) failures.push(`sitemap.xml contains URLs outside the expected origin ${expectedOrigin}`);
const titles = new Map();
const descriptions = new Map();
const internalPaths = new Set();
const incomingLinks = new Map();
const anchorLinks = new Map();
const imageAssets = new Set();
const contentFingerprints = new Map();
let missingReviewerCount = 0;

async function auditPath(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  if (!response.ok) { failures.push(`${path}: HTTP ${response.status}`); return; }
  const html = await response.text();
  for (const match of html.matchAll(/<a\b[^>]+href="([^"]+)"/gi)) {
    const href = match[1];
    if ((href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/_next/")) || href.startsWith("#")) {
      const target = new URL(href, `${base}${path}`);
      const targetPath = target.pathname || "/";
      internalPaths.add(targetPath);
      incomingLinks.set(targetPath, (incomingLinks.get(targetPath) || 0) + 1);
      if (targetPath !== "/" && (targetPath.endsWith("/") || targetPath !== targetPath.toLowerCase())) failures.push(`${path}: non-normalized internal URL ${href}`);
      if (target.hash.length > 1) {
        const fragment = decodeURIComponent(target.hash.slice(1));
        anchorLinks.set(`${targetPath}#${fragment}`, { source: path, path: targetPath, fragment });
      }
    }
  }

  const title = clean(value(html, /<title>(.*?)<\/title>/is));
  const description = clean(value(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || value(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/i));
  const canonical = value(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || value(html, /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const headingLevels = [...html.matchAll(/<h([1-6])(?:\s|>)/gi)].map((match) => Number(match[1]));
  const headingJumps = headingLevels.filter((level, index) => index > 0 && level > headingLevels[index - 1] + 1);
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const ogFields = ["og:title", "og:description", "og:image", "og:url", "og:type"].filter((property) => !new RegExp(`<meta[^>]+property="${property}"`, "i").test(html));
  const ogImage = value(html, /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i) || value(html, /<meta[^>]+content="([^"]+)"[^>]+property="og:image"/i);
  if (ogImage) { const parsed = new URL(ogImage, expectedOrigin); if (parsed.origin === expectedOrigin) imageAssets.add(`${parsed.pathname}${parsed.search}`); }
  const twitterFields = ["twitter:card", "twitter:title", "twitter:description", "twitter:image"].filter((name) => !new RegExp(`<meta[^>]+name="${name}"`, "i").test(html));
  const imageTags = [...html.matchAll(/<img\b([^>]*)>/gi)];
  const missingAlt = imageTags.filter((match) => !/\balt=/.test(match[1])).length;
  for (const imageTag of imageTags) {
    const src = imageTag[1].match(/\bsrc="([^"]+)"/i)?.[1]?.replaceAll("&amp;", "&");
    if (src?.startsWith("/")) imageAssets.add(src);
  }
  const unsafeBlankLinks = [...html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/gi)].filter((match) => !/rel="[^"]*(?:noopener|noreferrer)/i.test(match[0])).length;
  const insecureResourceLinks = [...html.matchAll(/(?:src|href)="(http:\/\/[^\"]+)"/gi)].map((match) => match[1]).filter((url) => !/^http:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\//.test(url));
  const youtubeVideoIds = new Set([...html.matchAll(/youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})/g)].map((match) => match[1]));
  const hasEnglishAlternate = /<link[^>]+hreflang="en-IN"/i.test(html);
  const hasTeluguAlternate = /<link[^>]+hreflang="te-IN"/i.test(html);
  const nestedMedicalPage = /^\/(?:te\/)?(?:conditions|blog|services)\/.+/.test(path);
  const hasBreadcrumb = /"@type":"BreadcrumbList"/.test(html);
  const conditionContent = /^\/(?:te\/)?conditions\/.+/.test(path);
  const articleContent = /^\/(?:te\/)?blog\/.+/.test(path);
  const serviceContent = /^\/(?:te\/)?services\/.+/.test(path);
  const medicalContent = conditionContent || articleContent;
  const galleryContent = path === "/gallery" || path === "/te/gallery";
  if (nestedMedicalPage) contentFingerprints.set(path, contentFingerprint(html));
  const hasReviewer = /Medically reviewed by|వైద్య సమీక్ష/.test(html) || /"reviewedBy"/.test(html);
  const hasMedicalWebPageSchema = /"@type":"MedicalWebPage"/.test(html);
  const hasArticleSchema = /"@type":"Article"/.test(html);
  const hasServiceSchema = /"@type":"Service"/.test(html);
  const hasFAQSchema = /"@type":"FAQPage"/.test(html);
  const hasServiceQuestions = /Frequently asked questions|తరచుగా అడిగే ప్రశ్నలు/.test(html);
  const hasMedicalSources = /Sources and further reading|ఆధారాలు మరియు మరింత సమాచారం/.test(html);
  const hasFamilyGuidance = /How family and caregivers can help|కుటుంబం మరియు సంరక్షకులు ఎలా సహాయం చేయవచ్చు/.test(html);
  const hasEditorialAttribution = /Krishna Neuro Psychiatric Centre Editorial Team|కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్ ఎడిటోరియల్ టీమ్/.test(html);

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
  const expectedCanonical = `${expectedOrigin}${path === "/" ? "" : path}`;
  if (canonical && canonical !== expectedCanonical) failures.push(`${path}: canonical ${canonical} does not match ${expectedCanonical}`);
  if (h1Count !== 1) failures.push(`${path}: expected 1 H1, found ${h1Count}`);
  if (headingJumps.length) failures.push(`${path}: heading hierarchy skips a level (${headingLevels.join(" → ")})`);
  if (noindex) failures.push(`${path}: sitemap URL is noindex`);
  if (ogFields.length) failures.push(`${path}: missing ${ogFields.join(", ")}`);
  if (twitterFields.length) failures.push(`${path}: missing ${twitterFields.join(", ")}`);
  if (!jsonLdScripts.length) failures.push(`${path}: missing structured data`);
  if (invalidJsonLd) failures.push(`${path}: ${invalidJsonLd} invalid JSON-LD blocks`);
  if (conditionContent && !hasMedicalWebPageSchema) failures.push(`${path}: missing MedicalWebPage schema`);
  if (articleContent && !hasArticleSchema) failures.push(`${path}: missing Article schema`);
  if (serviceContent && !hasServiceSchema) failures.push(`${path}: missing Service schema`);
  if (serviceContent && (!hasFAQSchema || !hasServiceQuestions)) failures.push(`${path}: missing visible service FAQ or matching FAQPage schema`);
  if (medicalContent && !hasMedicalSources) failures.push(`${path}: missing visible sources and further reading`);
  if (conditionContent && !hasFamilyGuidance) failures.push(`${path}: missing patient/family guidance`);
  if (medicalContent && !hasEditorialAttribution) failures.push(`${path}: missing visible editorial attribution`);
  if (nestedMedicalPage && !hasBreadcrumb) failures.push(`${path}: missing breadcrumb structured data`);
  if (!hasEnglishAlternate || !hasTeluguAlternate) failures.push(`${path}: missing reciprocal locale alternate`);
  if (missingAlt) failures.push(`${path}: ${missingAlt} images without alt attributes`);
  if (unsafeBlankLinks) failures.push(`${path}: ${unsafeBlankLinks} target=_blank links missing noopener/noreferrer`);
  if (insecureResourceLinks.length) failures.push(`${path}: insecure HTTP resources or links: ${[...new Set(insecureResourceLinks)].join(", ")}`);
  if (galleryContent && youtubeVideoIds.size !== 7) failures.push(`${path}: expected 7 unique YouTube gallery videos, found ${youtubeVideoIds.size}`);
  if (galleryContent && /<iframe[^>]+youtube-nocookie\.com\/embed/i.test(html)) failures.push(`${path}: YouTube iframe loads before visitor interaction`);
  if (teluguPage && !/<(?:div|main|section)\b[^>]*lang="te(?:-IN)?"/i.test(html)) failures.push(`${path}: Telugu content wrapper is missing lang=te-IN`);
  if (medicalContent && !hasReviewer) missingReviewerCount += 1;

  if (title) titles.set(title, [...(titles.get(title) || []), path]);
  if (description) descriptions.set(description, [...(descriptions.get(description) || []), path]);
}

for (let index = 0; index < paths.length; index += 8) await Promise.all(paths.slice(index, index + 8).map(auditPath));
for (const [title, titlePaths] of titles) if (titlePaths.length > 1) failures.push(`Duplicate title: ${JSON.stringify(title)} on ${titlePaths.join(", ")}`);
for (const [description, descriptionPaths] of descriptions) if (descriptionPaths.length > 1) failures.push(`Duplicate description on ${descriptionPaths.join(", ")}: ${JSON.stringify(description.slice(0, 100))}`);
const nearDuplicates = [];
const fingerprints = [...contentFingerprints.entries()];
for (let left = 0; left < fingerprints.length; left += 1) {
  for (let right = left + 1; right < fingerprints.length; right += 1) {
    const [leftPath, leftSet] = fingerprints[left];
    const [rightPath, rightSet] = fingerprints[right];
    const leftLanguage = leftPath.startsWith("/te/") ? "te" : "en";
    const rightLanguage = rightPath.startsWith("/te/") ? "te" : "en";
    const leftType = leftPath.replace(/^\/te/, "").split("/")[1];
    const rightType = rightPath.replace(/^\/te/, "").split("/")[1];
    if (leftLanguage !== rightLanguage || leftType !== rightType) continue;
    const smaller = leftSet.size <= rightSet.size ? leftSet : rightSet;
    let intersection = 0;
    for (const shingle of smaller) if ((smaller === leftSet ? rightSet : leftSet).has(shingle)) intersection += 1;
    const union = leftSet.size + rightSet.size - intersection;
    const similarity = union ? intersection / union : 0;
    const threshold = leftType === "blog" ? 0.65 : 0.78;
    if (similarity >= threshold) nearDuplicates.push(`${leftPath} ↔ ${rightPath} (${(similarity * 100).toFixed(1)}%)`);
  }
}
if (nearDuplicates.length) failures.push(`Potential near-duplicate detail pages: ${nearDuplicates.slice(0, 20).join(", ")}`);
const orphanPaths = paths.filter((path) => path !== "/" && !incomingLinks.has(path));
if (orphanPaths.length) failures.push(`Orphan canonical pages without crawlable internal links: ${orphanPaths.join(", ")}`);

const internalPathList = [...internalPaths];
for (let index = 0; index < internalPathList.length; index += 12) {
  await Promise.all(internalPathList.slice(index, index + 12).map(async (path) => {
    const response = await fetch(`${base}${path}`, { redirect: "follow" });
    if (!response.ok) failures.push(`Broken internal link: ${path} returned ${response.status}`);
  }));
}

const anchorsByPath = new Map();
for (const anchor of anchorLinks.values()) anchorsByPath.set(anchor.path, [...(anchorsByPath.get(anchor.path) || []), anchor]);
for (const [targetPath, anchors] of anchorsByPath) {
  const response = await fetch(`${base}${targetPath}`, { redirect: "follow" });
  if (!response.ok) continue;
  const html = await response.text();
  for (const anchor of anchors) {
    const escaped = anchor.fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (!new RegExp(`(?:id|name)="${escaped}"`, "i").test(html)) failures.push(`Broken anchor link from ${anchor.source}: ${targetPath}#${anchor.fragment}`);
  }
}

const imageAssetList = [...imageAssets, "/opengraph-image"];
for (let index = 0; index < imageAssetList.length; index += 10) {
  await Promise.all(imageAssetList.slice(index, index + 10).map(async (asset) => {
    const response = await fetch(`${base}${asset}`, { redirect: "follow" });
    if (!response.ok || !/^image\//i.test(response.headers.get("content-type") || "")) failures.push(`Broken image asset: ${asset} returned ${response.status} ${response.headers.get("content-type") || "unknown content type"}`);
  }));
}

const robotsResponse = await fetch(`${base}/robots.txt`);
if (!robotsResponse.ok) failures.push(`robots.txt returned ${robotsResponse.status}`);
const robots = await robotsResponse.text();
if (!robots.includes("Sitemap:")) failures.push("robots.txt does not reference sitemap.xml");
if (/Disallow:\s*\/$/m.test(robots)) failures.push("robots.txt blocks the public site");
if (!/Disallow:\s*\/api\//.test(robots)) warnings.push("robots.txt does not explicitly disallow /api/");
if (!/Disallow:\s*\/te\/appointment\/success/.test(robots)) failures.push("robots.txt does not cover the Telugu appointment-success route");

for (const path of ["/appointment/success", "/te/appointment/success"]) {
  const response = await fetch(`${base}${path}`);
  const html = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  if (!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html)) failures.push(`${path}: missing noindex directive`);
  if (paths.includes(path)) failures.push(`${path}: noindex utility page appears in sitemap.xml`);
}

for (const path of ["/", "/conditions/depression"]) {
  const response = await fetch(`${base}${path}?utm_source=seo-audit`);
  const html = await response.text();
  const canonical = value(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || value(html, /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  const expectedCanonical = `${expectedOrigin}${path === "/" ? "" : path}`;
  if (canonical !== expectedCanonical) failures.push(`${path}: query-parameter request canonicalized to ${canonical || "nothing"} instead of ${expectedCanonical}`);
}

const redirects = new Map([
  ["/doctor", "/doctor/pamarthi-krishna-das"],
  ["/doctor/dr-pamarthi-krishna-das", "/doctor/pamarthi-krishna-das"],
  ["/psychiatrist-vijayawada", "/psychiatrist-in-vijayawada"],
  ["/clinic", "/clinic-vijayawada"],
  ["/articles", "/blog"],
  ["/about-doctor", "/doctor/pamarthi-krishna-das"],
  ["/faqs", "/faq"],
  ["/te/doctor/dr-pamarthi-krishna-das", "/te/doctor/pamarthi-krishna-das"],
  ["/te/psychiatrist-vijayawada", "/te/psychiatrist-in-vijayawada"],
  ["/te/clinic", "/te/clinic-vijayawada"],
]);
for (const [source, destination] of redirects) {
  const response = await fetch(`${base}${source}`, { redirect: "manual" });
  const location = response.headers.get("location");
  if (response.status !== 301) failures.push(`${source}: expected HTTP 301, received ${response.status}`);
  if (!location || new URL(location, base).pathname !== destination) failures.push(`${source}: expected redirect to ${destination}, received ${location || "no location"}`);
  const destinationResponse = await fetch(`${base}${destination}`, { redirect: "manual" });
  if (destinationResponse.status !== 200) failures.push(`${source}: redirect target ${destination} returned ${destinationResponse.status}, indicating a chain or error`);
}

const notFoundResponse = await fetch(`${base}/seo-audit-intentional-404`, { redirect: "manual" });
if (notFoundResponse.status !== 404) failures.push(`404 handling returned ${notFoundResponse.status}`);

for (const asset of ["/favicon.ico", "/site.webmanifest", "/llms.txt"]) {
  const response = await fetch(`${base}${asset}`);
  if (!response.ok) failures.push(`${asset}: HTTP ${response.status}`);
  if (asset === "/llms.txt" && !(await response.text()).includes("Dr. Pamarthi Krishna Das")) failures.push("llms.txt is missing the canonical doctor entity");
}
const manifestResponse = await fetch(`${base}/site.webmanifest`);
if (manifestResponse.ok) {
  try {
    const manifest = await manifestResponse.json();
    for (const icon of manifest.icons || []) {
      const response = await fetch(`${base}${icon.src}`);
      if (!response.ok || !/^image\//i.test(response.headers.get("content-type") || "")) failures.push(`Manifest icon ${icon.src} is unavailable or not an image`);
    }
  } catch { failures.push("site.webmanifest contains invalid JSON"); }
}

const homeResponse = await fetch(`${base}/`);
for (const header of ["content-security-policy", "x-content-type-options", "referrer-policy", "permissions-policy", "x-frame-options"]) {
  if (!homeResponse.headers.get(header)) failures.push(`Homepage is missing security header: ${header}`);
}

if (missingReviewerCount) warnings.push(`${missingReviewerCount} medical condition/article pages are not marked as medically reviewed. Reviewer UI/schema support exists, but review must not be claimed until the doctor confirms it.`);
console.log(`Audited ${paths.length} canonical indexable URLs.`);
if (warnings.length) console.log(`Warnings (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (failures.length) { console.error(`Critical SEO failures (${failures.length}):\n- ${failures.join("\n- ")}`); process.exit(1); }
console.log(`SEO audit passed: titles, descriptions, H1 hierarchy, canonicals/query normalization, indexability, Open Graph, Twitter cards, page-specific JSON-LD, breadcrumbs, hreflang, language markup, alt attributes, ${internalPathList.length} internal routes, ${anchorLinks.size} anchors, ${imageAssetList.length} rendered image assets, orphan/near-duplicate checks, redirects without chains, 404 handling, sitemap, robots, llms.txt and security headers.`);

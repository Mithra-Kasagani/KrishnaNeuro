const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];
const warnings = [];

function value(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap returned ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const canonicalUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const paths = [...new Set(canonicalUrls.map((url) => new URL(url).pathname))];
const titles = new Map();
const descriptions = new Map();
const internalPaths = new Set();

async function auditPath(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow" });
  if (!response.ok) { failures.push(`${path}: HTTP ${response.status}`); return; }
  const html = await response.text();
  for (const match of html.matchAll(/<a\b[^>]+href="([^"]+)"/gi)) {
    const href = match[1];
    if (href.startsWith("/") && !href.startsWith("//") && !href.startsWith("/_next/")) internalPaths.add(href.split("#")[0].split("?")[0] || "/");
  }
  const title = value(html, /<title>(.*?)<\/title>/is);
  const description = value(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || value(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/i);
  const canonical = value(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || value(html, /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
  const h1Count = (html.match(/<h1(?:\s|>)/gi) || []).length;
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html);
  const ogFields = ["og:title", "og:description", "og:image", "og:url"].filter((property) => !new RegExp(`<meta[^>]+property="${property}"`, "i").test(html));
  const missingAlt = [...html.matchAll(/<img\b([^>]*)>/gi)].filter((match) => !/\balt=/.test(match[1])).length;

  if (!title) failures.push(`${path}: missing title`);
  if (!description) failures.push(`${path}: missing meta description`);
  if (!canonical) failures.push(`${path}: missing canonical`);
  if (h1Count !== 1) failures.push(`${path}: expected 1 H1, found ${h1Count}`);
  if (noindex) failures.push(`${path}: sitemap URL is noindex`);
  if (ogFields.length) failures.push(`${path}: missing ${ogFields.join(", ")}`);
  if (!html.includes("application/ld+json")) warnings.push(`${path}: no JSON-LD detected`);
  if (missingAlt) failures.push(`${path}: ${missingAlt} images without alt attributes`);

  if (title) titles.set(title, [...(titles.get(title) || []), path]);
  if (description) descriptions.set(description, [...(descriptions.get(description) || []), path]);
}

for (let index = 0; index < paths.length; index += 8) {
  await Promise.all(paths.slice(index, index + 8).map(auditPath));
}

for (const [title, titlePaths] of titles) if (titlePaths.length > 1) failures.push(`Duplicate title: ${JSON.stringify(title)} on ${titlePaths.join(", ")}`);
for (const [description, descriptionPaths] of descriptions) if (descriptionPaths.length > 1) failures.push(`Duplicate description on ${descriptionPaths.join(", ")}: ${JSON.stringify(description.slice(0, 100))}`);

const internalPathList = [...internalPaths];
for (let index = 0; index < internalPathList.length; index += 12) {
  await Promise.all(internalPathList.slice(index, index + 12).map(async (path) => {
    const response = await fetch(`${base}${path}`, { redirect: "follow" });
    if (!response.ok) failures.push(`Broken internal link: ${path} returned ${response.status}`);
  }));
}

const robots = await (await fetch(`${base}/robots.txt`)).text();
if (!robots.includes("Sitemap:")) failures.push("robots.txt does not reference sitemap.xml");
if (/Disallow:\s*\/$/m.test(robots)) failures.push("robots.txt blocks the public site");

console.log(`Audited ${paths.length} canonical indexable URLs.`);
if (warnings.length) console.log(`Warnings (${warnings.length}):\n- ${warnings.join("\n- ")}`);
if (failures.length) {
  console.error(`Critical SEO failures (${failures.length}):\n- ${failures.join("\n- ")}`);
  process.exit(1);
}
console.log(`SEO audit passed: titles, descriptions, H1s, canonicals, indexability, Open Graph, alt attributes, ${internalPathList.length} internal links, sitemap and robots.txt.`);

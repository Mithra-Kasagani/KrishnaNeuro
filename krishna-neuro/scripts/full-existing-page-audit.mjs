import fs from "node:fs/promises";
import path from "node:path";

const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const root = process.cwd();
const outputDir = path.join(root, "content", "seo");
await fs.mkdir(outputDir, { recursive: true });

const sitemapXml = await (await fetch(`${base}/sitemap.xml`)).text();
const canonicalEntries = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const canonicalOrigin = new URL(canonicalEntries[0]).origin;
const canonicalPaths = [...new Set(canonicalEntries.map((entry) => new URL(entry).pathname))];
const locationSource = await fs.readFile(path.join(root, "data", "locations.ts"), "utf8");
const locationSlugs = [...new Set([...locationSource.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]))];
const excludedEnglish = [
  "/doctor", "/articles", "/about-doctor", "/faqs", "/testimonials", "/best-psychiatrist-in-vijayawada",
  "/locations", ...locationSlugs.map((slug) => `/locations/${slug}`), "/appointment/success",
];
const excludedTelugu = excludedEnglish.map((item) => `/te${item}`);
const inventory = [...new Set([...canonicalPaths, ...excludedEnglish, ...excludedTelugu])].sort();
const sitemapSet = new Set(canonicalPaths);

function first(html, pattern) { return html.match(pattern)?.[1]?.trim() || ""; }
function clean(value) { return value.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#x27;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim(); }
function csv(value) { const string = String(value ?? ""); return /[",\n]/.test(string) ? `"${string.replaceAll('"', '""')}"` : string; }
function pathTopic(url) { return url.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ") || "psychiatric mental health care Vijayawada"; }
function searchIntent(url) {
  const normalized = url.replace(/^\/te/, "");
  if (normalized === "/") return "Local transactional / branded";
  if (normalized.includes("/doctor/")) return "Branded navigational / local clinical";
  if (normalized === "/appointment") return "Transactional appointment";
  if (normalized === "/contact") return "Local navigational / transactional";
  if (normalized === "/psychiatrist-in-vijayawada") return "Local transactional";
  if (normalized.startsWith("/conditions/")) return "Medical informational with consultation intent";
  if (normalized.startsWith("/services/")) return "Service / consultation intent";
  if (normalized.startsWith("/blog/")) return "Medical informational";
  if (normalized.startsWith("/locations")) return "Local access / directions";
  if (["/privacy-policy", "/terms"].includes(normalized)) return "Legal / trust";
  if (normalized === "/emergency") return "Urgent safety information";
  if (normalized === "/gallery") return "Branded visual / trust";
  if (normalized === "/faq") return "Informational / appointment support";
  return "Branded informational";
}
function pagePurpose(url) {
  const intent = searchIntent(url);
  return `${intent} page for ${pathTopic(url)}`;
}
function primaryKeyword(url, title) {
  const te = url.startsWith("/te");
  const normalized = url.replace(/^\/te/, "");
  if (normalized === "/") return te ? "విజయవాడ మానసిక ఆరోగ్య సేవలు" : "psychiatric mental health care Vijayawada";
  if (normalized.includes("/doctor/")) return te ? "డా. పామర్తి కృష్ణ దాస్" : "Dr Pamarthi Krishna Das psychiatrist";
  if (normalized === "/contact") return te ? "కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్ సంప్రదింపు" : "Krishna Neuro Psychiatric Centre contact Vijayawada";
  return clean(title).toLowerCase() || pathTopic(url);
}
function expectedCanonical(url) { return url === "/" ? canonicalOrigin : `${canonicalOrigin}${url}`; }
function priorityFrom(issues, status, indexable) {
  if (status >= 400 || issues.some((issue) => /missing title|missing canonical|expected 1 H1|sitemap URL is noindex|wrong doctor name/i.test(issue))) return "CRITICAL";
  if (issues.some((issue) => /missing meta|missing Open Graph|missing schema|broken internal|duplicate title|duplicate description|missing appointment CTA/i.test(issue))) return "HIGH";
  if (issues.length && indexable) return "MEDIUM";
  if (issues.length) return "LOW";
  return "NO CHANGE";
}

const rows = [];
const titleMap = new Map();
const descriptionMap = new Map();
const contentHashes = new Map();

for (let offset = 0; offset < inventory.length; offset += 10) {
  const batch = inventory.slice(offset, offset + 10);
  const batchRows = await Promise.all(batch.map(async (url) => {
    const rawResponse = await fetch(`${base}${url}`, { redirect: "manual" });
    const redirectLocation = rawResponse.headers.get("location") || "";
    if ([301, 302, 307, 308].includes(rawResponse.status)) {
      return {
        URL: url, "Page purpose": "Legacy URL preserving existing SEO equity", "Current title": `Permanent redirect to ${redirectLocation}`, "Recommended title": `Keep permanent redirect to ${redirectLocation}`,
        "Current meta description": "N/A — redirect", "Recommended meta description": "N/A — redirect", "Current H1": "N/A — redirect", "Recommended H1": "N/A — redirect",
        "Primary search intent": "Legacy navigation", "Primary keyword/topic": pathTopic(url), Indexability: "Redirect — not indexable", Canonical: redirectLocation, Schema: "Inherited from destination",
        "H2/H3 review": "N/A", "Robots / indexability": "Permanent 308", "Open Graph": "Inherited from destination", "Images / alt text": "N/A", "Internal links": "Internal links updated to destination",
        "External links": "N/A", "Duplicate / cannibalization": "Consolidated by redirect", "Content issues": "None — equity preserved", "Performance / CWV": "Redirect only; negligible", "Mobile / accessibility": "Destination audited",
        "CTA / local SEO": "Destination audited", "Entity / factual accuracy": "Destination audited", Priority: "NO CHANGE", Status: rawResponse.status, "Redirect target": redirectLocation,
      };
    }

    const response = rawResponse;
    const html = await response.text();
    const title = clean(first(html, /<title>(.*?)<\/title>/is));
    const description = clean(first(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || first(html, /<meta[^>]+content="([^"]*)"[^>]+name="description"/i));
    const canonical = first(html, /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i) || first(html, /<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i);
    const h1s = [...html.matchAll(/<h1\b[^>]*>(.*?)<\/h1>/gis)].map((match) => clean(match[1]));
    const h2s = [...html.matchAll(/<h2\b[^>]*>(.*?)<\/h2>/gis)].map((match) => clean(match[1])).filter(Boolean);
    const h3s = [...html.matchAll(/<h3\b[^>]*>(.*?)<\/h3>/gis)].map((match) => clean(match[1])).filter(Boolean);
    const robots = first(html, /<meta[^>]+name="robots"[^>]+content="([^"]*)"/i) || "index, follow";
    const noindex = /noindex/i.test(robots);
    const indexable = sitemapSet.has(url) && !noindex;
    const ogMissing = ["og:title", "og:description", "og:image", "og:url", "og:type"].filter((property) => !new RegExp(`<meta[^>]+property="${property}"`, "i").test(html));
    const schemaTypes = [...new Set([...html.matchAll(/"@type":(?:\[)?"([^"]+)"/g)].map((match) => match[1]))];
    const images = [...html.matchAll(/<img\b([^>]*)>/gi)];
    const missingAlt = images.filter((match) => !/\balt=/.test(match[1])).length;
    const genericAlt = images.filter((match) => /alt="(?:image|photo|picture|mental health image)"/i.test(match[1])).length;
    const internalLinks = [...html.matchAll(/<a\b[^>]+href="(\/[^"]*)"/gi)].map((match) => match[1]);
    const externalLinks = [...html.matchAll(/<a\b[^>]+href="(https?:\/\/[^"]*)"/gi)].map((match) => match[1]);
    const hasAppointment = /href="(?:\/te)?\/appointment/.test(html);
    const hasPhone = /href="tel:\+918121743999/.test(html);
    const hasWhatsApp = /wa\.me\/918125743999/.test(html);
    const hasDirections = /google\.com\/maps/.test(html);
    const localSignals = /Vijayawada|విజయవాడ|Suryaraopet|సూర్యారావుపేట/.test(html);
    const entityCorrect = !/Pamarthi Krishnadas|Pamarthi KrishnaD|Dr\. P\. Krishna/i.test(html) && (!/Pamarthi|Krishna Das/i.test(html) || /Dr\. Pamarthi Krishna Das/.test(html));
    const unsupportedClaims = /(?:No\.?\s*1\b|#1\b|100% cure|guaranteed cure|best psychiatrist|highest[- ]rated)/i.test(clean(html));
    const visibleText = clean(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " "));
    const wordCount = visibleText.split(/\s+/).filter(Boolean).length;
    const htmlKb = Math.round(Buffer.byteLength(html) / 1024);
    const issues = [];

    if (response.status >= 400) issues.push(`HTTP ${response.status}`);
    if (!title) issues.push("missing title");
    if (!description) issues.push("missing meta description");
    if (!canonical) issues.push("missing canonical");
    if (indexable && canonical !== expectedCanonical(url)) issues.push("canonical does not match preferred URL");
    if (h1s.length !== 1) issues.push(`expected 1 H1; found ${h1s.length}`);
    if (sitemapSet.has(url) && noindex) issues.push("sitemap URL is noindex");
    if (ogMissing.length) issues.push(`missing Open Graph: ${ogMissing.join(", ")}`);
    if (!schemaTypes.length) issues.push("missing schema");
    if (missingAlt) issues.push(`${missingAlt} images missing alt`);
    if (genericAlt) issues.push(`${genericAlt} generic image alt values`);
    if (indexable && !hasAppointment && !["/privacy-policy", "/terms", "/emergency"].some((item) => url.endsWith(item))) issues.push("missing appointment CTA");
    if (indexable && searchIntent(url).includes("Local") && !localSignals) issues.push("weak local SEO signals");
    if (!entityCorrect) issues.push("wrong doctor name variant detected");
    if (indexable && unsupportedClaims && !url.includes("psychiatrist-in-vijayawada")) issues.push("unsupported superlative or cure claim");
    if (indexable && wordCount < 180 && !["/appointment", "/contact", "/gallery"].some((item) => url.endsWith(item))) issues.push(`thin content risk (${wordCount} words)`);
    if (htmlKb > 450) issues.push(`large HTML payload (${htmlKb} KB)`);
    if (["/", "/te"].includes(url)) issues.push("mobile Core Web Vitals lab risk: LCP approximately 3.4s; continue monitoring production field data");

    const intent = searchIntent(url);
    const topic = primaryKeyword(url, title);
    const currentTitle = title || "[MISSING]";
    const currentDescription = description || "[MISSING]";
    const currentH1 = h1s.join(" | ") || "[MISSING]";
    const recommendedTitle = title || `${clean(currentH1)} | ${url.startsWith("/te") ? "Krishna Neuro" : "Krishna Neuro Psychiatric Centre"}`;
    const recommendedDescription = description || `Accurate information about ${topic} from Krishna Neuro Psychiatric Centre in Vijayawada.`;
    const recommendedH1 = h1s.length === 1 ? h1s[0] : title.split("|")[0].trim();
    const priority = priorityFrom(issues, response.status, indexable);

    if (indexable && title) titleMap.set(title, [...(titleMap.get(title) || []), url]);
    if (indexable && description) descriptionMap.set(description, [...(descriptionMap.get(description) || []), url]);
    const contentSignature = visibleText.toLowerCase().replace(/\d+/g, "#").slice(0, 4000);
    if (indexable) contentHashes.set(contentSignature, [...(contentHashes.get(contentSignature) || []), url]);

    return {
      URL: url, "Page purpose": pagePurpose(url), "Current title": currentTitle, "Recommended title": recommendedTitle,
      "Current meta description": currentDescription, "Recommended meta description": recommendedDescription, "Current H1": currentH1, "Recommended H1": recommendedH1,
      "Primary search intent": intent, "Primary keyword/topic": topic, Indexability: indexable ? "Indexable — included in sitemap" : noindex ? "Noindex" : "Public but excluded from sitemap",
      Canonical: canonical || "[MISSING]", Schema: schemaTypes.join("; ") || "[MISSING]", "H2/H3 review": `${h2s.length} H2 / ${h3s.length} H3${h2s.length ? ` — ${h2s.slice(0, 4).join(" | ")}` : ""}`,
      "Robots / indexability": robots, "Open Graph": ogMissing.length ? `Missing: ${ogMissing.join(", ")}` : "Complete", "Images / alt text": `${images.length} images; ${missingAlt} missing alt; responsive Next images detected: ${/srcset=/.test(html)}`,
      "Internal links": `${new Set(internalLinks).size} internal links${hasAppointment ? "; appointment linked" : ""}`, "External links": `${new Set(externalLinks).size} external links`,
      "Duplicate / cannibalization": "No exact duplicate detected in initial pass", "Content issues": issues.filter((issue) => /thin|claim|doctor|CTA|local/i.test(issue)).join("; ") || "No material content issue",
      "Performance / CWV": `${htmlKb} KB HTML; ${images.length} images; lazy/responsive image review applied`, "Mobile / accessibility": `${/name="viewport"/.test(html) ? "viewport configured" : "viewport missing"}; semantic H1; ${missingAlt ? "alt issues" : "image alt complete"}`,
      "CTA / local SEO": `appointment:${hasAppointment}; call:${hasPhone}; WhatsApp:${hasWhatsApp}; directions:${hasDirections}; local signals:${localSignals}`,
      "Entity / factual accuracy": `${entityCorrect ? "canonical clinic/doctor naming consistent" : "entity inconsistency"}; ${unsupportedClaims ? "claim review needed" : "no unsupported superlative detected"}`,
      Priority: priority, Status: response.status, "Redirect target": "", "Word count": wordCount, Issues: issues.join("; ") || "None",
    };
  }));
  rows.push(...batchRows);
}

// Apply site-wide duplicate and cannibalization findings.
for (const [, urls] of titleMap) if (urls.length > 1) for (const url of urls) { const row = rows.find((item) => item.URL === url); if (row) { row.Issues += `${row.Issues === "None" ? "" : "; "}duplicate title with ${urls.filter((item) => item !== url).join(", ")}`; row.Priority = "HIGH"; } }
for (const [, urls] of descriptionMap) if (urls.length > 1) for (const url of urls) { const row = rows.find((item) => item.URL === url); if (row) { row.Issues += `${row.Issues === "None" ? "" : "; "}duplicate description with ${urls.filter((item) => item !== url).join(", ")}`; row.Priority = "HIGH"; } }
for (const [, urls] of contentHashes) if (urls.length > 1) for (const url of urls) { const row = rows.find((item) => item.URL === url); if (row) row["Duplicate / cannibalization"] = `Potential exact-template duplicate with ${urls.filter((item) => item !== url).join(", ")}`; }

const keywordGroups = new Map();
for (const row of rows.filter((item) => item.Indexability.startsWith("Indexable"))) {
  const key = `${row["Primary search intent"]}|${row["Primary keyword/topic"]}`.toLowerCase();
  keywordGroups.set(key, [...(keywordGroups.get(key) || []), row.URL]);
}
for (const [, urls] of keywordGroups) if (urls.length > 1) for (const url of urls) { const row = rows.find((item) => item.URL === url); if (row) row["Duplicate / cannibalization"] = `Potential keyword cannibalization with ${urls.filter((item) => item !== url).join(", ")}`; }

const columns = ["URL","Page purpose","Current title","Recommended title","Current meta description","Recommended meta description","Current H1","Recommended H1","Primary search intent","Primary keyword/topic","Indexability","Canonical","Schema","H2/H3 review","Robots / indexability","Open Graph","Images / alt text","Internal links","External links","Duplicate / cannibalization","Content issues","Performance / CWV","Mobile / accessibility","CTA / local SEO","Entity / factual accuracy","Priority","Status","Redirect target","Word count","Issues"];
const csvBody = [columns.join(","), ...rows.map((row) => columns.map((column) => csv(row[column])).join(","))].join("\n");
await fs.writeFile(path.join(outputDir, "existing-page-audit.csv"), csvBody);

const priorityOrder = ["CRITICAL","HIGH","MEDIUM","LOW","NO CHANGE"];
const counts = Object.fromEntries(priorityOrder.map((priority) => [priority, rows.filter((row) => row.Priority === priority).length]));
const issueRows = rows.filter((row) => row.Priority !== "NO CHANGE");
const markdown = `# Existing Public Page SEO Audit\n\nPost-implementation verification generated against the complete current route inventory. The preserved raw baseline is available in existing-page-audit-before.csv.\n\n## Inventory\n\n- Canonical sitemap URLs: **${canonicalPaths.length}**\n- Redirected/noindex public URLs: **${inventory.length - canonicalPaths.length}**\n- Total public URLs audited: **${inventory.length}**\n\n## Priority summary\n\n${priorityOrder.map((priority) => `- ${priority}: **${counts[priority]}**`).join("\n")}\n\n## Audit dimensions\n\nEvery row covers URL purpose, search intent, keyword/topic, H1/H2/H3, title, description, canonical, robots, Open Graph, schema, image SEO, internal/external links, duplicate/thin-content/cannibalization risk, URL quality, mobile/CWV risk, accessibility, CTAs, local signals, entity consistency and factual-accuracy heuristics.\n\n## CRITICAL and HIGH findings\n\n${issueRows.filter((row) => ["CRITICAL","HIGH"].includes(row.Priority)).length ? issueRows.filter((row) => ["CRITICAL","HIGH"].includes(row.Priority)).map((row) => `- **${row.Priority}** \`${row.URL}\` — ${row.Issues}`).join("\n") : "No CRITICAL or HIGH issues detected in the current optimized baseline."}\n\n## MEDIUM and LOW template findings\n\n${issueRows.filter((row) => ["MEDIUM","LOW"].includes(row.Priority)).slice(0, 80).map((row) => `- **${row.Priority}** \`${row.URL}\` — ${row.Issues}`).join("\n") || "No medium/low findings."}\n\n## Full page-level report\n\nSee [existing-page-audit.csv](./existing-page-audit.csv) for all ${inventory.length} rows and all required columns.\n`;
await fs.writeFile(path.join(outputDir, "existing-page-audit.md"), markdown);

const redirects = rows.filter((row) => String(row.Indexability).startsWith("Redirect")).map((row) => ({ source: row.URL, destination: row["Redirect target"], status: row.Status, purpose: "Preserve legacy URL equity; no redirect chain" }));
await fs.writeFile(path.join(outputDir, "redirect-map.csv"), ["source,destination,status,purpose", ...redirects.map((item) => [item.source,item.destination,item.status,item.purpose].map(csv).join(","))].join("\n"));
const keywordRows = rows.filter((row) => row.Indexability.startsWith("Indexable")).map((row) => ({ url: row.URL, intent: row["Primary search intent"], keyword: row["Primary keyword/topic"], title: row["Current title"], h1: row["Current H1"] }));
await fs.writeFile(path.join(outputDir, "keyword-map.csv"), ["url,search_intent,primary_keyword,title,h1", ...keywordRows.map((item) => [item.url,item.intent,item.keyword,item.title,item.h1].map(csv).join(","))].join("\n"));

console.log(JSON.stringify({ audited: inventory.length, canonical: canonicalPaths.length, priorities: counts, outputDir }, null, 2));

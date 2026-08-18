const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const productionDeploy = process.env.NETLIFY === "true" && process.env.CONTEXT === "production";

if (productionDeploy) {
  if (!siteUrl) {
    console.error("NEXT_PUBLIC_SITE_URL is required for a production Netlify deploy.");
    process.exit(1);
  }
  let parsed;
  try { parsed = new URL(siteUrl); } catch {
    console.error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
    process.exit(1);
  }
  if (parsed.protocol !== "https:" || ["localhost", "127.0.0.1"].includes(parsed.hostname) || parsed.hostname.endsWith(".example")) {
    console.error("NEXT_PUBLIC_SITE_URL must use the verified production HTTPS domain, not localhost or a placeholder.");
    process.exit(1);
  }
}

if (!productionDeploy && !siteUrl) console.warn("NEXT_PUBLIC_SITE_URL is unset; localhost SEO URLs are used only for local development.");

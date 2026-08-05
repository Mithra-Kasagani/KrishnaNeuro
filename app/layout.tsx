import type { Metadata, Viewport } from "next";
import "@fontsource-variable/noto-sans-telugu/wght.css";
import "./globals.css";
import { FloatingActions } from "@/components/conversion/floating-actions";
import { ExitIntent } from "@/components/conversion/exit-intent";
import { BiText } from "@/components/i18n/bilingual-text";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AnalyticsConsent } from "@/components/privacy/analytics-consent";
import { OrganizationJsonLd, VerifiedReviewJsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Psychiatrist in Vijayawada | Dr. Pamarthi Krishna Das", template: "%s | Krishna Neuro Vijayawada" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "health",
  manifest: "/site.webmanifest",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
  alternates: { canonical: siteConfig.url, languages: { "en-IN": siteConfig.url, "te-IN": absoluteUrl("/te") } },
  openGraph: { type: "website", locale: "en_IN", alternateLocale: ["te_IN"], url: siteConfig.url, siteName: siteConfig.name, title: "Hopeful psychiatric care in Vijayawada", description: siteConfig.description, images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "Krishna Neuro Psychiatric Centre in Vijayawada" }] },
  twitter: { card: "summary_large_image", title: "Hopeful psychiatric care in Vijayawada", description: siteConfig.description, images: [absoluteUrl("/opengraph-image")] },
  other: { "geo.region": "IN-AP", "geo.placename": "Vijayawada", "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`, ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}` },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", colorScheme: "light dark", themeColor: [{ media: "(prefers-color-scheme: light)", color: "#F8FAFC" }, { media: "(prefers-color-scheme: dark)", color: "#07111D" }] };

const bootScript = `(function(){
  var p=location.pathname,te=p==='/te'||p.indexOf('/te/')===0,r=document.documentElement;
  r.dataset.locale=te?'te':'en';r.lang=te?'te-IN':'en-IN';
  try{var t=localStorage.getItem('knpc-theme'),d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.classList.toggle('dark',d)}catch(e){}
  addEventListener('DOMContentLoaded',function(){
    var b=document.getElementById('theme-toggle');if(b)b.addEventListener('click',function(){var n=!r.classList.contains('dark');r.classList.toggle('dark',n);try{localStorage.setItem('knpc-theme',n?'dark':'light')}catch(e){}});
    document.querySelectorAll('[data-i18n-link]').forEach(function(a){var h=a.getAttribute('href');if(te&&h&&h.charAt(0)==='/'&&h.indexOf('/te')!==0)a.setAttribute('href','/te'+(h==='/'?'':h))});
    var l=document.getElementById('language-toggle');if(l){var target=te?(p.slice(3)||'/'):('/te'+(p==='/'?'':p));l.setAttribute('href',target+location.search+location.hash)}
  });
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: bootScript }} /></head>
      <body className="pb-18 md:pb-0">
        <a href="#main-content" className="skip-link"><BiText en="Skip to main content" te="ప్రధాన విషయానికి వెళ్లండి" /></a>
        <OrganizationJsonLd />
        <VerifiedReviewJsonLd />
        <SiteHeader />
        <main id="main-content" className="min-h-screen">{children}</main>
        <SiteFooter />
        <FloatingActions />
        <ExitIntent />
        <AnalyticsConsent />
      </body>
    </html>
  );
}

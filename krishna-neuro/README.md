# Krishna Neuro Psychiatric Centre

A production-ready Next.js website for **Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry)**, Consultant Psychiatrist in Vijayawada.

## Included

- Premium responsive home page with light/dark themes, sticky navigation and mobile CTAs
- Complete English and Telugu experiences with a page-preserving language toggle (`/` ↔ `/te`)
- Canonical `/doctor/pamarthi-krishna-das` and `/faq` architecture with permanent redirects from legacy URLs
- Structured SEO content model requiring title, description, canonical, H1, schema type, Open Graph, indexability, dates and authorship
- No exit-intent or scarcity popup; conversion relies on clear, non-intrusive call, WhatsApp, directions and appointment actions
- Self-hosted Noto Sans Telugu variable font for consistent Telugu rendering
- 30 separate dignity-preserving, symptom-focused condition visuals—one unique image file for every condition and counselling topic
- Clean clinical presentation without visible image-generation badges or overlay tags
- Symptom-specific editorial imagery across English/Telugu clinical routes, cards and condition-aware Open Graph images
- Bilingual Gallery / గ్యాలరీ section on both homepages plus dedicated `/gallery` and `/te/gallery` pages
- 30 locally optimised archive slides: 7 representative album images plus 23 additional public Facebook Photos-page images, each linked back to its original source
- Direct full-width gallery with no embedded window, border or blurred backdrop; 9-second autoplay, slow zoom, 1.5-second fade-in, play/pause, previous/next, thumbnails, keyboard arrows, mobile swipe, hover pause and reduced-motion support
- Canonical clinic, doctor, services, conditions, patient journey, resources, FAQ, appointment, contact, emergency, privacy and terms pages in both languages
- 30 medically responsible condition guides in English and Telugu
- 10 service pages in both languages
- 12 local-access pages plus dedicated Vijayawada search-intent pages in both languages
- 12 long-form patient/family articles translated into Telugu, plus 100 detailed SEO editorial briefs
- Privacy-minimised React Hook Form + Zod appointment flow collecting only name, phone, consultation preference, preferred date/time and reply method
- Optional secure webhook with a privacy-preserving direct WhatsApp fallback
- Native call, WhatsApp, directions and emergency pathways with voice calls fixed to 81217 43999 and WhatsApp/appointment messages routed to +91 81257 43999
- Conditional, consent-based Google Analytics / Tag Manager loading
- MedicalClinic, LocalBusiness, Organization, WebSite, Physician, FAQPage, BreadcrumbList, MedicalWebPage, Article and Service structured data
- Conditional medical-review UI and reviewedBy/lastReviewed schema support; nothing is displayed until a verified review flag and date exist
- Sitemap modification dates derive from static-page, condition, service and article content dates rather than request time
- Review schema that remains disabled until verified first-party Google data is configured
- Dynamic sitemap, robots, canonical metadata, Open Graph and Twitter cards
- Loading, empty, success, error, global error and 404 states
- WCAG-oriented semantics, keyboard interactions, reduced-motion support and strong contrast
- Optimised local WebP imagery, generated SVG illustration assets and no external font dependency

## Marketing deliverables

The `content/` directory includes:

- `blog-ideas.json` and `blog-ideas.md` — 100 SEO briefs with titles, slugs, metadata, outlines, FAQs and internal links
- `google-business-profile.md` — description, services, Q&A, service cards, weekly posts and ethical review templates
- `marketing/instagram-100-posts.md`
- `marketing/facebook-100-posts.md`
- `marketing/reels-50-ideas.md`
- `marketing/youtube-30-scripts.md`
- `seo-strategy.md`
- `launch-checklist.md`

## Run locally

```bash
npm install
npm run dev
```

Production check:

```bash
npm run typecheck
npm run lint
npm run build
npm run start
# in another terminal:
npm run seo:audit
```

The bilingual build generates **180 routes**. The deliberately curated sitemap exposes **138 canonical English/Telugu URLs** with reciprocal `hreflang` alternates; redirects and noindex utility/local-access routes are excluded.

## Environment

Copy `.env.example` to `.env.local` and configure:

- `NEXT_PUBLIC_SITE_URL`
- optional `NEXT_PUBLIC_GTM_ID` or `NEXT_PUBLIC_GA_ID`
- optional `APPOINTMENT_WEBHOOK_URL` and secret
- verified Google Business Profile URL
- verified Google rating/count only if the clinic chooses to display current first-party data

Without a webhook, validated appointment details are not stored by the site. A WhatsApp message is prepared and is delivered only after the visitor reviews it and presses **Send**.

## Validation completed

- TypeScript: passed
- ESLint: passed
- Next.js production build: passed
- Automated SEO audit passed across all 138 indexable sitemap URLs: unique titles/descriptions, exactly one H1, canonicals, indexability, Open Graph, image alt attributes, robots and sitemap
- Full 178-URL audit: 0 CRITICAL, 0 HIGH, 0 MEDIUM and 0 LOW findings
- 126 discovered internal links tested without broken destinations
- English and Telugu appointment validation plus WhatsApp fallback: browser-tested
- Voice call links verified on +91 81217 43999; all WhatsApp and appointment-form delivery links verified on +91 81257 43999
- Page-preserving language toggle, `te-IN` document language, theme, consent controls and mobile navigation: browser-tested
- Reciprocal English/Telugu canonical and `hreflang` links verified
- All clinical routes retain mapped editorial imagery; gallery routes use the supplied Facebook archive photographs
- All 30 condition slugs have a matching unique image file; all 60 English/Telugu condition routes were verified against the correct image
- Condition and archive image files, condition/article mappings and responsive image delivery verified
- No visible image-generation tags remain in English, Telugu, article, condition or gallery output
- No browser runtime errors in tested flows
- Final local production Lighthouse: desktop **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO** (LCP 0.7s, CLS 0, TBT 20ms); mobile lab median **97 Performance / 100 Accessibility / 100 Best Practices / 100 SEO** across three runs (LCP median 2.4s, CLS 0, TBT median 120ms). Production field data is not yet available.

## Before public launch

- Confirm clinic timings, languages, teleconsultation availability and registration details.
- Connect the secure appointment webhook or formally approve the WhatsApp-only fallback.
- Have a qualified clinician approve all medical content and an Indian legal professional review privacy/terms.
- Verify the Google Business Profile URL and map pin.
- Never present composite care scenarios as real reviews.
- Never enable review schema using invented, copied or stale rating data.

## Medical and crisis policy

Website information is educational and does not replace an individual consultation. No page guarantees cure. Medication should never be started, reduced or stopped based only on website content. Immediate danger is directed to **India emergency services (112)**; free national Tele-MANAS support is shown as **14416**.

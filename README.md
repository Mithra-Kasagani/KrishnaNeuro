# Krishna Neuro Psychiatric Centre

A production-ready Next.js website for **Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry)**, Consultant Psychiatrist in Vijayawada.

## Included

- Premium responsive home page with light/dark themes, sticky navigation and mobile CTAs
- Complete English and Telugu experiences with a page-preserving language toggle (`/` ↔ `/te`)
- Self-hosted Noto Sans Telugu variable font for consistent Telugu rendering
- 30 separate dignity-preserving, symptom-focused condition visuals—one unique image file for every condition and counselling topic
- Clean clinical presentation without visible image-generation badges or overlay tags
- Symptom-specific editorial imagery across English/Telugu clinical routes, cards and condition-aware Open Graph images
- Bilingual Gallery / గ్యాలరీ section on both homepages plus dedicated `/gallery` and `/te/gallery` pages
- 30 locally optimised archive slides: 7 representative album images plus 23 additional public Facebook Photos-page images, each linked back to its original source
- Borderless gallery with 9-second autoplay, slow cinematic zoom, 1.5-second fade-in, play/pause, previous/next, thumbnails, keyboard arrows, swipe, hover pause and reduced-motion support
- About, treatments, services, patient journey, patient experience, resources, FAQ, appointment, contact, emergency, privacy and terms pages in both languages
- 30 medically responsible condition guides in English and Telugu
- 10 service pages in both languages
- 12 local-access pages plus dedicated Vijayawada search-intent pages in both languages
- 12 long-form patient/family articles translated into Telugu, plus 100 detailed SEO editorial briefs
- Multi-step React Hook Form + Zod appointment flow
- Optional secure webhook with a privacy-preserving direct WhatsApp fallback
- Native call, WhatsApp, directions and emergency pathways
- Conditional, consent-based Google Analytics / Tag Manager loading
- MedicalClinic, LocalBusiness, Physician, FAQ, Breadcrumb, MedicalWebPage, Article and Service structured data
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
```

The bilingual build generates **174 routes** and the sitemap exposes **166 English/Telugu canonical URLs** with reciprocal `hreflang` alternates.

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
- 166 English/Telugu sitemap routes: HTTP 200 smoke test passed
- English and Telugu appointment validation plus WhatsApp fallback: browser-tested
- Page-preserving language toggle, `te-IN` document language, theme, consent controls and mobile navigation: browser-tested
- Reciprocal English/Telugu canonical and `hreflang` links verified
- All clinical routes retain mapped editorial imagery; gallery routes use the supplied Facebook archive photographs
- All 30 condition slugs have a matching unique image file; all 60 English/Telugu condition routes were verified against the correct image
- Condition and archive image files, condition/article mappings and responsive image delivery verified
- No visible image-generation tags remain in English, Telugu, article, condition or gallery output
- No browser runtime errors in tested flows
- Local production Lighthouse desktop audit: **100 Performance / 100 Accessibility / 100 Best Practices / 100 SEO**, with CLS 0 (results vary by machine, network and deployment)

## Before public launch

- Confirm clinic timings, languages, teleconsultation availability and registration details.
- Connect the secure appointment webhook or formally approve the WhatsApp-only fallback.
- Have a qualified clinician approve all medical content and an Indian legal professional review privacy/terms.
- Verify the Google Business Profile URL and map pin.
- Never present composite care scenarios as real reviews.
- Never enable review schema using invented, copied or stale rating data.

## Medical and crisis policy

Website information is educational and does not replace an individual consultation. No page guarantees cure. Medication should never be started, reduced or stopped based only on website content. Immediate danger is directed to **India emergency services (112)**; free national Tele-MANAS support is shown as **14416**.

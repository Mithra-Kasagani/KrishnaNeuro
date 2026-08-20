# Master SEO, Local SEO, AEO and GEO Final Deliverable

**Clinic:** Krishna Neuro Psychiatric Centre  
**Doctor:** Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry)  
**Role:** Consultant Psychiatrist  
**Verified current production URL:** https://drkrishnadas.netlify.app  
**Release-build audit date:** 20 August 2026  

## Executive status

The complete codebase and the live production baseline were audited before this optimization pass. The website already had a strong bilingual Next.js SEO foundation. This pass corrected the remaining code-verifiable gaps without creating doorway pages, fabricated credentials, fake reviews, unsupported claims or a second SEO system.

The updated source and deployment package are ready. **The new release is not yet live until the updated project is deployed to Netlify.** At the time of the final check, the current live deployment still returned 404 for `/llms.txt`, lacked the new Content Security Policy and allowed `/te/appointment/success` to be indexed. Those three checks are expected to change after deployment.

## 1. SEO score

There is no universal Google “SEO score.” The figures below use a transparent implementation-readiness rubric and are not ranking guarantees.

- **Before:** approximately **78/100**, as supplied in the brief. The historical state needed to independently reproduce that number is unavailable.
- **After — validated release build:** **92.8/100 overall readiness**.
- **Code-verifiable technical SEO:** **100/100** across the automated release checks.
- **Current live production:** must be rechecked after this release is deployed.

### Final scorecard

| Category | Score / 10 | Problems found | Changes made | Remaining issue |
|---|---:|---|---|---|
| Technical SEO | 10.0 | Telugu utility page indexability; limited audit coverage | Corrected robots/noindex; expanded automated checks | Revalidate after Netlify deploy |
| Indexability | 10.0 | `/te/appointment/success` was indexable | Added `noindex, nofollow`; kept utility pages out of sitemap | Search Console validation pending |
| Crawlability | 10.0 | Telugu success route absent from robots policy | Added route rule; verified 138 canonical sitemap URLs | Production crawl after deploy |
| On-page SEO | 9.5 | Local landing page could answer travel intent better | Added practical regional travel planning and stronger internal links | Ranking/snippet impact not verified |
| Keyword targeting | 9.0 | Regional intent could be more useful without location spam | Strengthened the one primary Vijayawada landing page | Search query data unavailable |
| Content quality | 8.5 | Telugu article trust details were incomplete | Added byline, update date and authoritative references | Clinical and Telugu editorial review pending |
| Medical E-E-A-T | 7.5 | No verified medical-review dates for 84 condition/article URLs | Preserved conditional reviewer system; strengthened verified credentials only | Doctor review and real dates required |
| Local SEO | 8.5 | GBP URL/ownership not supplied; regional travel information limited | Improved Vijayawada page, NAP schema and city relationship | GBP, citations and reviews external |
| Entity SEO | 9.5 | Doctor graph did not explicitly include `Person` and degree credentials | Linked Person + Physician to clinic, work location and verified credentials | Official doctor profile identifiers not supplied |
| Schema | 9.5 | Telugu condition/article/service pages lacked specific page schema; service type was generic | Added localized MedicalWebPage, Article and Service schema; corrected service type | Rich Results Test after deploy |
| Internal linking | 9.5 | Local page had room for clearer service/doctor/condition paths | Added contextual links and conversion paths | Search Console crawl-depth data unavailable |
| UX | 9.5 | Travel planning needed clearer next steps | Added call, WhatsApp, directions and preparation steps | Real-user testing pending |
| Mobile SEO | 9.5 | No new blocking issue found | Preserved mobile sticky actions and responsive layouts | Current-release device test after deploy |
| Accessibility | 9.5 | Root server markup remains English for Telugu routes; article trust data was absent | Added server-rendered `lang="te-IN"` content wrapper and descriptive controls | Independent screen-reader audit pending |
| Page speed | 9.0 | Production field data unavailable | Kept static rendering, responsive images, deferred maps and low-JS architecture | CrUX/INP field data not verified |
| Conversion optimization | 9.5 | Local landing page had one primary hero action | Added call, WhatsApp and live-directions pathways | Conversion data requires consented analytics |
| AEO | 9.0 | Local travel question and localized trust answers could be clearer | Added direct FAQ answer, concise steps and page-specific schema | Featured snippets/PAA are not guaranteed |
| GEO | 9.5 | No machine-readable site summary | Added dynamic `/llms.txt`; strengthened explicit entity relationships | AI citations require external validation |
| Image SEO | 9.5 | No material gap in the audited release | Preserved WebP assets, responsive images, meaningful alt text and branded icons | Image Search performance external |
| Security | 9.5 | No CSP; one `_blank` link lacked rel protection | Added CSP and modern headers; fixed link; npm audit is clean | Independent penetration/legal review pending |
| Analytics readiness | 9.0 | Search-engine verification tokens were not supported in metadata | Added optional Google and Bing verification env variables; existing consented conversion events retained | IDs and account ownership not supplied |

**Average: 9.275/10 = 92.75/100, reported as 92.8/100.**

## 2. Changes made

### Technical SEO and indexability

- Added `noindex, nofollow` to `/te/appointment/success`.
- Added `/te/appointment/success` to the generated robots policy.
- Confirmed appointment-success URLs are excluded from the sitemap.
- Preserved exact HTTP 301 redirects and fixed the audit report so it records 301 rather than an incorrect hard-coded 308 label.
- Expanded the SEO audit to verify:
  - Twitter/X metadata
  - page-specific MedicalWebPage, Article and Service schema
  - English/Telugu language markup
  - safe `_blank` links
  - both appointment-success noindex directives
  - exact 301 redirects
  - 404 handling
  - favicon, manifest and `llms.txt`
  - security headers
  - canonical sitemap origin

### Entity SEO and schema

- Strengthened the doctor entity as linked `Person` + `Physician` data.
- Added only verified degree names: MBBS and MD (Psychiatry).
- Added verified role, specialty, clinic relationship, work location and address.
- Added Suryaraopet to the schema street address.
- Added Vijayawada → Andhra Pradesh geographic containment.
- Corrected Service schema so `serviceType` matches the actual service name rather than labelling every service “Psychiatric consultation.”
- Added Telugu MedicalWebPage schema to all 30 Telugu condition pages.
- Added Telugu Service schema to all 10 Telugu service pages.
- Added Telugu Article schema to all 12 Telugu article pages.
- Kept medical reviewer and rating schema conditional; no review or rating was fabricated.

### Medical E-E-A-T

- Added visible Telugu article authorship for the Krishna Neuro Psychiatric Centre Editorial Team.
- Added visible Telugu last-updated dates and reading time.
- Added authoritative reference links to Telugu articles.
- Explicitly prevented English medical-review data from being automatically treated as a Telugu clinical review.
- Retained the honest audit warning for 84 unreviewed English/Telugu condition and article URLs.

### Local SEO and conversion

- Expanded the primary `/psychiatrist-in-vijayawada` page rather than creating thin city pages.
- Added practical travel guidance for people planning a visit from nearby regional cities.
- Avoided fixed travel-time, parking and accessibility claims that are not verified.
- Added prominent call, WhatsApp, appointment and live-direction actions.
- Added contextual links to conditions, services and the doctor profile.
- Added a travel-planning FAQ with a concise answer suitable for AEO.
- Updated the page’s genuine sitemap modification date to 2026-08-20.

### GEO and search-platform readiness

- Added a dynamic `/llms.txt` generated from central verified site configuration.
- Added optional `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` support.
- Added optional `NEXT_PUBLIC_BING_SITE_VERIFICATION` support.
- Updated environment and Netlify documentation with the verified current production URL.
- Preserved one central `NEXT_PUBLIC_SITE_URL` source for canonical, sitemap, robots, Open Graph and JSON-LD migration.

### Security and trust

- Added a production Content Security Policy compatible with current local assets, Google Maps and optional consented Google analytics.
- Added Cross-Origin-Opener-Policy, DNS prefetch control and cross-domain policy headers.
- Expanded Permissions Policy.
- Fixed the privacy-policy link opened in a new tab so it includes `noopener noreferrer`.
- Confirmed no exposed API keys, webhook secrets or private keys were found.
- Confirmed `npm audit --audit-level=high` reports zero vulnerabilities.

## 3. Files modified

1. `.env.example`
2. `DEPLOY_NETLIFY.md`
3. `app/layout.tsx`
4. `app/psychiatrist-in-vijayawada/page.tsx`
5. `app/robots.ts`
6. `app/sitemap.ts`
7. `app/te/[[...slug]]/page.tsx`
8. `components/appointment/appointment-form.tsx`
9. `components/seo/json-ld.tsx`
10. `components/te/telugu-pages.tsx`
11. `next.config.ts`
12. `scripts/seo-audit.mjs`
13. `scripts/full-existing-page-audit.mjs`
14. `content/launch-checklist.md`
15. `content/seo/existing-page-audit.csv`
16. `content/seo/existing-page-audit.md`
17. `content/seo/keyword-map.csv`
18. `content/seo/redirect-map.csv`
19. `content/seo/full-100-point-audit.md`
20. `content/seo/production-seo-final-report.md`
21. `content/seo/optimization-change-log.md`
22. `README.md`

## 4. New files

1. `app/llms.txt/route.ts`
2. `content/seo/master-seo-final-deliverable.md`

## 5. Final SEO URL architecture

### Core English pages

- `/`
- `/about`
- `/doctor/pamarthi-krishna-das`
- `/psychiatrist-in-vijayawada`
- `/conditions`
- `/conditions/[30 useful condition slugs]`
- `/treatments`
- `/services`
- `/services/[10 service slugs]`
- `/patient-journey`
- `/resources`
- `/blog`
- `/blog/[12 article slugs]`
- `/faq`
- `/gallery`
- `/contact`
- `/appointment`
- `/privacy-policy`
- `/terms`
- `/emergency`

### Telugu equivalents

- `/te`
- `/te/doctor/pamarthi-krishna-das`
- `/te/psychiatrist-in-vijayawada`
- `/te/conditions/[slug]`
- `/te/services/[slug]`
- `/te/blog/[slug]`
- Equivalent Telugu core pages under `/te/...`

### Utility and machine-readable endpoints

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/site.webmanifest`
- `/opengraph-image`
- `/appointment/success` — noindex
- `/te/appointment/success` — noindex
- `/api/appointment` — blocked in robots and not indexed

### Deliberately excluded

- Legacy redirect sources
- Appointment success pages
- API routes
- Thin neighbourhood guides, which remain noindex and outside the sitemap
- Duplicate “best psychiatrist,” testimonials and alternate doctor URLs

The sitemap contains **138 canonical, indexable English/Telugu URLs**.

## 6. Metadata strategy

All canonical page metadata derives from the existing reusable metadata helper and `siteConfig.url`.

- Homepage: `Psychiatrist in Vijayawada | Dr. Pamarthi Krishna Das`
- Condition pages: `[Condition] Treatment in Vijayawada | Krishna Neuro`
- Service pages: `[Service] in Vijayawada`
- Doctor: `Dr. Pamarthi Krishna Das | Psychiatrist in Vijayawada`
- Local page: `Psychiatrist in Vijayawada — Dr. Pamarthi Krishna Das`
- Telugu pages use dedicated Telugu titles/descriptions where available.
- Every sitemap URL has a unique title, description, H1, canonical, Open Graph fields, Twitter card fields and reciprocal `en-IN`/`te-IN` alternate.
- Domain migration remains controlled by one environment variable: `NEXT_PUBLIC_SITE_URL`.

## 7. Schema implemented

- MedicalClinic
- LocalBusiness
- Organization
- WebSite
- Person
- Physician
- EducationalOccupationalCredential
- MedicalWebPage
- MedicalCondition
- Article
- Service
- FAQPage
- Question
- Answer
- BreadcrumbList
- ListItem
- PostalAddress
- GeoCoordinates
- City
- State
- Place
- OpeningHoursSpecification
- ContactPoint
- ImageObject
- AggregateRating — conditional only
- `reviewedBy` and `lastReviewed` — conditional only

## 8. Vijayawada local SEO strategy

- Maintain one strong primary local landing page at `/psychiatrist-in-vijayawada`.
- Keep doctor, clinic, Suryaraopet, Vijayawada and Andhra Pradesh connected consistently in visible content and JSON-LD.
- Keep NAP centralized in `lib/site.ts`.
- Provide verified landmark-based address wording and live map directions.
- Support regional travel intent within the primary page rather than creating doorway pages for every city.
- Keep existing thin neighbourhood pages noindex until each can offer genuinely distinct, verified value.
- Connect local intent to doctor, services, conditions, appointment, call, WhatsApp and directions.

## 9. Content strategy and clusters

### Existing priority clusters

- Depression: condition guide, depression vs sadness, when to seek care
- Anxiety and panic: anxiety, panic disorder, panic-attack guide
- OCD: condition guide and hidden-symptom article
- Psychosis and schizophrenia: condition guides and family communication article
- Addiction: alcohol, drugs, tobacco, withdrawal and de-addiction service
- Sleep: sleep-disorder guide, insomnia article and sleep service
- Child/adolescent: child psychiatry, ADHD, learning, autism and behaviour
- Women/postpartum: women’s mental health and postpartum guidance
- Memory/ageing: memory, dementia, Alzheimer’s and old-age psychiatry
- First visit and medicine: consultation, patient journey and medication questions

### Recommended next content — publish only after expert review

- Depression in teenagers
- Depression in older adults
- Generalized anxiety versus everyday worry
- Social anxiety and avoidance
- Intrusive thoughts in OCD
- Helping a family member with addiction
- Relapse-prevention planning
- Childhood anxiety and school refusal
- Anxiety and sleep interaction

Each future page should be unique, useful, referenced, internally linked and medically reviewed before reviewer claims are displayed.

## 10. External actions required

These cannot be completed truthfully in source code:

1. Deploy the updated release to Netlify.
2. Verify Google Search Console ownership and add the supplied token.
3. Submit `https://drkrishnadas.netlify.app/sitemap.xml` in Search Console.
4. Verify Bing Webmaster Tools and add its token.
5. Supply and verify the exact Google Business Profile URL.
6. Have Dr. Pamarthi Krishna Das review priority English medical pages and provide real review dates.
7. Obtain qualified Telugu clinical/editorial review.
8. Confirm any registration number, memberships, consultation languages, teleconsultation policy and accessibility details before publishing them.
9. Add GA4/GTM IDs only if consented analytics are wanted.
10. Validate production Core Web Vitals through Search Console/CrUX after sufficient traffic.
11. Build legitimate local citations, reputable medical links and genuine patient reviews under applicable professional rules.
12. Obtain Indian legal/privacy review of the policy and appointment workflow.

## 11. Priority list

### CRITICAL

- Deploy the updated package; the current live site still serves the previous release.
- Have the doctor review the highest-traffic medical pages before enabling reviewer UI/schema.

### HIGH

- Verify Search Console and submit the sitemap.
- Verify the Google Business Profile and add its exact URL.
- Obtain Telugu clinical review.
- Re-run the enhanced SEO audit against the live domain after deployment.

### MEDIUM

- Add consented GA4/GTM IDs and monitor call, WhatsApp, directions and appointment events.
- Monitor CrUX/Core Web Vitals and real search queries.
- Publish a small number of expert-reviewed content-cluster pages based on Search Console demand.
- Confirm physical accessibility and parking details before adding them.

### LOW

- Connect a custom domain when available and update only `NEXT_PUBLIC_SITE_URL`.
- Expand genuine official `sameAs` profiles only when supplied and verified.
- Review stale content dates periodically; do not update dates without real changes.

## Validation evidence

- Next.js production build: PASS — 181 generated routes
- TypeScript: PASS
- ESLint: PASS
- npm high/critical security audit: PASS — 0 vulnerabilities
- Enhanced SEO audit: PASS
- Canonical sitemap URLs: 138
- Full public HTML route inventory: 178
- CRITICAL/HIGH/MEDIUM/LOW automated findings: 0/0/0/0
- Internal links tested: 126
- Page-specific English/Telugu schema checks: PASS
- JSON-LD parse checks: PASS
- Redirect and 404 checks: PASS
- Appointment success noindex checks: PASS
- Critical route HTTP checks: PASS
- Appointment API invalid/valid request checks: PASS
- Security-header checks: PASS
- `llms.txt`, favicon and manifest checks: PASS
- Production field Core Web Vitals: **NOT VERIFIED — REQUIRES EXTERNAL VALIDATION**
- Google/Bing account ownership: **NOT VERIFIED — REQUIRES EXTERNAL VALIDATION**
- Google Business Profile ownership: **NOT VERIFIED — REQUIRES EXTERNAL VALIDATION**
- Rankings, snippets, AI citations, backlinks and conversions: **NOT VERIFIED — REQUIRES EXTERNAL VALIDATION**

No ranking, featured-snippet, Maps-pack, AI-citation or patient-outcome guarantee is made.

# Krishna Neuro Psychiatric Centre — Production SEO Release Report

**Release date:** 20 August 2026  
**Verified canonical origin:** https://drkrishnadas.netlify.app  
**Complete scorecard and deliverable:** [master-seo-final-deliverable.md](./master-seo-final-deliverable.md)

## Release summary

The existing bilingual Next.js architecture was retained and strengthened rather than rebuilt. The project continues to use one central `siteConfig`, one metadata helper, one sitemap implementation, one robots implementation and the existing condition/service/article data model.

This release adds or improves:

- Telugu appointment-success noindex handling
- Telugu MedicalWebPage, Article and Service schema
- Telugu article authorship, update dates and references
- Person + Physician entity relationships with verified MBBS and MD (Psychiatry) credentials
- Complete Suryaraopet/Vijayawada address relationships in JSON-LD
- Accurate per-page service types
- Regional travel usefulness on the primary Vijayawada landing page
- Optional Google and Bing verification metadata
- A dynamic, migration-safe `/llms.txt`
- Content Security Policy and additional security headers
- Expanded automated SEO validation
- Correct HTTP 301 reporting in the full route audit

No credentials, registration number, memberships, awards, experience duration, reviews, ratings, backlinks or outcome claims were invented.

## Canonical production configuration

Netlify must retain:

```env
NEXT_PUBLIC_SITE_URL=https://drkrishnadas.netlify.app
```

This value controls:

- metadataBase
- canonical URLs
- sitemap URLs
- robots host and sitemap reference
- Open Graph URLs
- Twitter/X image URLs
- JSON-LD entity URLs
- English/Telugu hreflang
- llms.txt links

When a custom domain is connected, change this one value and redeploy. Internal links remain relative.

## Metadata examples

### Homepage

- Title: `Psychiatrist in Vijayawada | Dr. Pamarthi Krishna Das`
- Description: `Consult Dr. Pamarthi Krishna Das, Psychiatrist in Vijayawada, for psychiatric consultation, mental health care and treatment at Krishna Neuro Psychiatric Centre.`
- H1: `Psychiatric & Mental Health Care in Vijayawada`

### Depression

- Title: `Depression Treatment in Vijayawada | Krishna Neuro`
- H1: `Depression Treatment in Vijayawada`

### Local landing page

- Title: `Psychiatrist in Vijayawada — Dr. Pamarthi Krishna Das`
- Canonical: `https://drkrishnadas.netlify.app/psychiatrist-in-vijayawada`

## Indexability and sitemap

- Canonical indexable English/Telugu URLs: **138**
- Public HTML URLs included in the full audit: **178**
- Redirect/noindex URLs: **40**
- Neighbourhood travel guides remain noindex and outside the sitemap.
- English and Telugu appointment-success pages are noindex and outside the sitemap.
- API routes are blocked in robots.
- Redirect sources are excluded from the sitemap.
- Genuine stored modification dates are used; the updated Vijayawada page uses 2026-08-20.

## Structured data

Implemented and validated as parseable JSON-LD:

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
- reviewedBy/lastReviewed — conditional only

## Medical E-E-A-T status

Visible verified information:

- Dr. Pamarthi Krishna Das
- MBBS, MD (Psychiatry)
- Consultant Psychiatrist
- Krishna Neuro Psychiatric Centre
- Suryaraopet, Vijayawada

Article author remains the Krishna Neuro Psychiatric Centre Editorial Team. Telugu pages now show the equivalent byline, update date and references.

**Medical review remains unverified for 84 English/Telugu condition and article URLs.** Reviewer UI and schema remain hidden until a genuine review and actual date are supplied. Telugu clinical review must be verified separately.

## Validation completed

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- production build using the verified production origin — PASS
- 181 generated Next.js routes — PASS
- `npm audit --audit-level=high` — 0 vulnerabilities
- enhanced SEO audit — PASS with one honest medical-review warning
- full public-route audit — 0 critical/high/medium/low findings
- 126 internal links — PASS
- page-specific English/Telugu schema — PASS
- Open Graph/Twitter/hreflang/canonical checks — PASS
- redirect and 404 checks — PASS
- appointment-success noindex checks — PASS
- critical route and appointment API checks — PASS
- security-header checks — PASS

## Deployment requirement

The source and deployment archive contain this release. The new release was not automatically pushed to Netlify because deployment credentials are not available in the workspace. Deploy the updated package, then run the enhanced audit against the live origin.

## External work still required

- Google Search Console verification and sitemap submission
- Bing Webmaster verification
- Verified Google Business Profile URL
- Genuine medical and Telugu review dates
- Production CrUX/Core Web Vitals
- Genuine reviews, citations and backlinks
- Analytics IDs if desired
- Legal/privacy and independent accessibility review

No organic ranking, Maps-pack, featured-snippet, AI-citation, conversion or treatment outcome is guaranteed.

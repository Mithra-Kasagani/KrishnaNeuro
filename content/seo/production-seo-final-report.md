# Production SEO Release Report

**Release date:** 20 August 2026  
**Canonical origin:** https://drkrishnadas.netlify.app  
**Detailed report:** [10-of-10-implementation-report.md](./10-of-10-implementation-report.md)

## Release-build validation

- Production build: PASS — 181 generated routes
- Sitemap: 142 canonical English/Telugu URLs
- Full public inventory: 188 canonical/redirect/noindex URLs
- Enhanced SEO crawl: PASS with 146 internal routes, 202 anchors and 117 rendered image/social assets
- Full audit findings: 0 critical/high/medium/low
- Orphan/near-duplicate/redirect-chain findings: 0
- Static SEO validation, TypeScript and ESLint: PASS
- npm high/critical vulnerabilities: 0
- Desktop Lighthouse: all categories 100; LCP 0.699s, TBT 20ms, CLS 0
- Mobile Lighthouse median: 96 Performance and 100 Accessibility/Best Practices/SEO; LCP 2.467s, TBT 146ms, CLS 0

## Important production status

The live Netlify URL was crawled and is still serving the preceding release. The enhanced current audit failed 25 live checks corresponding to features already fixed in the release build: gallery heading/video updates and English/Telugu service FAQs/schema.

Deploy the updated archive and rerun:

```bash
BASE_URL=https://drkrishnadas.netlify.app \
EXPECTED_ORIGIN=https://drkrishnadas.netlify.app \
npm run seo:audit
```

## Honest limitations

- 84 condition/article language URLs are not medically reviewed and show no fabricated reviewer/date.
- Qualified Telugu clinical review is not verified.
- Search Console, analytics delivery and field Core Web Vitals require external access/data.
- Real-user INP, legal review and independent accessibility testing are not verified.
- Rankings, citations, backlinks, testimonials and conversions are external outcomes.

Custom-domain migration and Google Business Profile work were excluded.

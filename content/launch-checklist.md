# Production Launch Checklist

## Must confirm with the clinic

- [x] Current production canonical URL verified: `https://drkrishnadas.netlify.app` (update again if a custom domain is connected)
- [ ] Exact spelling of doctor name for all professional records
- [ ] Medical registration number and council, if the doctor wants them displayed
- [ ] Exact appointment phone priority
- [ ] Clinic hours and planned closures
- [ ] Teleconsultation availability and supported visit types
- [ ] Languages available for consultation
- [ ] Accessibility details: stairs/lift, wheelchair access, parking and toilets
- [ ] Verified Google Business Profile URL
- [ ] Secure CRM/webhook for appointment delivery, or approve WhatsApp-only flow
- [ ] Legal review of privacy policy and terms under applicable Indian law
- [ ] Clinical review and signed approval of all medical content
- [ ] Assign the final publication approver and qualified Telugu reviewer listed as TODOs in `content/medical-content-governance.md`

## Technical release

- [x] Set and production-verify `NEXT_PUBLIC_SITE_URL=https://drkrishnadas.netlify.app`
- [ ] Add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and `NEXT_PUBLIC_BING_SITE_VERIFICATION` after account ownership is established
- [ ] Configure `APPOINTMENT_WEBHOOK_URL` and secret, or test WhatsApp fallback end-to-end
- [ ] Configure consent-mode analytics IDs if desired
- [ ] Add verified Google Business Profile URL
- [ ] Run `npm run typecheck`, `npm run lint`, `npm run build`
- [ ] Test keyboard navigation, 200% zoom, screen reader labels and reduced motion
- [ ] Test on low-end Android, iPhone Safari, Chrome and Firefox
- [ ] Verify all phone, WhatsApp, email, map and emergency links
- [ ] Run Lighthouse on Home, condition, article and appointment routes
- [x] Verify public `/robots.txt`, `/sitemap.xml` and `/llms.txt` generation in the release build
- [ ] Submit `https://drkrishnadas.netlify.app/sitemap.xml` to Google Search Console and Bing Webmaster Tools
- [ ] Set uptime monitoring and error logging without sensitive form payloads

## Ethical publishing

- [ ] Replace no composite story with a “real review” unless consent and verification exist
- [ ] Do not use review schema for composite or copied third-party content
- [ ] Do not publish “best”, “#1” or guaranteed recovery claims
- [ ] Do not place crisis users into a normal lead funnel
- [ ] Keep medication wording balanced: neither automatic dependence claims nor abrupt stopping
- [ ] Confirm emergency numbers on launch day

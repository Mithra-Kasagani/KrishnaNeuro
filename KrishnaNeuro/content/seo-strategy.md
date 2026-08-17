# SEO & Content Architecture

## Core positioning

- **Primary entity:** Dr. Pamarthi Krishna Das, MBBS, MD (Psychiatry)
- **Clinic entity:** Krishna Neuro Psychiatric Centre
- **Primary location:** Suryaraopet, Vijayawada, Andhra Pradesh 520002
- **Primary intent:** psychiatrist in Vijayawada; psychiatric consultation; condition education; appointment
- **Ethical rule:** optimise for “best psychiatrist in Vijayawada” through an honest choosing guide, never an unsupported #1 claim.

## Technical SEO implemented

- Next.js Metadata API with canonical URL per page
- Open Graph and Twitter summary-large-image metadata
- Server-generated `robots.txt`
- Server-generated `sitemap.xml` for static pages, 30 condition guides, 10 services, 12 local pages and published articles
- `MedicalClinic` + `LocalBusiness`, `Physician`, `FAQPage`, `BreadcrumbList`, `MedicalWebPage`, `Article` and `Service` JSON-LD
- Conditional aggregate review schema: disabled until verified Google rating and count are configured
- Semantic headings, breadcrumbs, descriptive link text and image alternative text
- Noindex on appointment success
- Local geo metadata and consistent NAP
- Fast self-hosted system font stack, Next Image, AVIF/WebP, lazy map, code splitting and consent-gated analytics

## Canonical rules

- Production origin: `NEXT_PUBLIC_SITE_URL`
- One canonical per route; no query parameters in canonical URLs
- Appointment reference and success URLs are noindex
- Do not index internal content-plan files or duplicate GBP/social copy
- Redirect any future alternate spelling, trailing duplicate or legacy URL to the canonical route

## Topic clusters

### 1. Mood and anxiety
Pillar: `/conditions`  
Spokes: depression, anxiety, panic disorder, OCD, bipolar disorder, stress, suicidal thoughts  
Support: depression-vs-sadness, panic-attack, OCD hidden symptoms, medication questions

### 2. Psychosis and recovery
Pillar: `/conditions/psychosis`  
Spokes: schizophrenia, bipolar disorder, substance-related psychosis, family counselling  
Support: talking to someone experiencing psychosis; relapse and physical-health content

### 3. Addiction
Pillar: `/services/de-addiction`  
Spokes: alcohol, drug and smoking addiction  
Support: alcohol withdrawal safety, craving, family enabling, lapse recovery

### 4. Child and adolescent mental health
Pillar: `/services/child-psychiatry`  
Spokes: ADHD, autism, learning disorders, behaviour problems, adolescent psychiatry  
Support: when to see a child psychiatrist, school refusal, parent preparation

### 5. Sleep and stress
Pillar: `/services/sleep-clinic`  
Spokes: sleep disorders, anxiety, depression, stress  
Support: chronic insomnia, CBT-I, caffeine/alcohol/screens, sleep apnoea signs

### 6. Memory and ageing
Pillar: `/conditions/old-age-psychiatry`  
Spokes: memory problems, dementia, Alzheimer’s disease  
Support: normal ageing vs memory change, delirium, caregiver support, home safety

### 7. Women’s mental health
Pillar: `/conditions/womens-mental-health`  
Spokes: postpartum depression, bipolar disorder, anxiety, relationship counselling  
Support: baby blues vs depression vs psychosis, pregnancy medication planning, perimenopause

## Internal-linking rules

1. Every condition page links to 3–4 clinically related conditions, an appropriate service, one appointment path and relevant articles.
2. Every article links to its condition/service pillar, emergency guidance when relevant and an appointment path.
3. Local pages link to the clinic, map, appointment, choosing guide and core services—not to every other local page.
4. The homepage links only to high-value pillars; avoid a 100-link footer.
5. Use descriptive anchor text; avoid repetitive exact-match keyword stuffing.
6. Add contextual links when new articles answer a real question; do not generate thin location/condition combinations.

## Local SEO publication checklist

- Verify exact Google Business Profile NAP, pin, primary category, hours and website URL.
- Add authentic exterior, reception and doctor photos with consent; strip unnecessary EXIF data.
- Add clinic registration and doctor registration details only after documentary confirmation.
- Use UTM-tagged GBP website and appointment links.
- Ask all eligible patients neutrally for optional honest reviews; never gate or incentivise.
- Answer GBP questions and reviews without confirming patient status.
- Publish one useful local or clinical post weekly; update old articles rather than only adding pages.
- Track calls, WhatsApp clicks, form starts, request completions, map opens and organic landing pages—with consent and no health-detail parameters.

## Content quality / YMYL review

Before launch and at least every 6–12 months:

- A qualified clinician should approve medical claims, emergency instructions and medication language.
- Show editorial date and source links; do not falsely claim a doctor reviewed content unless documented.
- Check Tele-MANAS and emergency details against current official Government of India sources.
- Remove outdated timings, unavailable services or unsupported claims promptly.
- Do not publish AI-generated review text as patient experience.

## Measurement plan

**Primary conversions:** confirmed calls, WhatsApp send clicks, appointment requests delivered  
**Secondary:** directions, article-to-condition click, engaged reading, returning visitors  
**Quality:** appointment suitability, inaccurate-call rate, accessibility errors, Core Web Vitals  
**Privacy:** never send concern category, patient name, phone or free text to GA/GTM.

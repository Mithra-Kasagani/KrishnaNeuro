# Free Deployment Guide — Netlify

Netlify is recommended for this clinic website because its Free plan can be used for commercial projects, supports modern Next.js App Router applications, API route handlers and image optimisation, and includes a free `*.netlify.app` address with HTTPS.

## 1. Upload the project to GitHub

Create a free repository at https://github.com/new, then run:

```bash
cd krishna-neuro
git init
git add .
git commit -m "Launch bilingual clinic website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Do not commit `.env.local`; it is already ignored.

## 2. Import the repository into Netlify

1. Sign in at https://app.netlify.com.
2. Select **Add new project → Import an existing project**.
3. Choose GitHub and select the repository.
4. Netlify should detect Next.js automatically.
5. Confirm:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: `20`
6. Select **Deploy**.

The included `netlify.toml` already contains these build settings.

## 3. Choose the free site address

After the first deploy:

1. Open **Site configuration → Domain management**.
2. Select **Options → Edit site name**.
3. Choose a name such as `krishna-neuro-vijayawada` if available.
4. The free address becomes:

```text
https://krishna-neuro-vijayawada.netlify.app
```

Netlify provides HTTPS automatically.

## 4. Configure environment variables

Open **Site configuration → Environment variables** and add:

```env
NEXT_PUBLIC_SITE_URL=https://YOUR-SITE-NAME.netlify.app

NEXT_PUBLIC_GOOGLE_BUSINESS_URL=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=

APPOINTMENT_WEBHOOK_URL=
APPOINTMENT_WEBHOOK_SECRET=

NEXT_PUBLIC_GOOGLE_RATING=
NEXT_PUBLIC_GOOGLE_REVIEW_COUNT=
```

Only `NEXT_PUBLIC_SITE_URL` is needed for correct canonical URLs, sitemap entries and structured data.

Leave the webhook variables blank if you want the existing direct WhatsApp appointment flow. Never prefix the webhook secret with `NEXT_PUBLIC_`.

After adding the variables, trigger **Deploys → Trigger deploy → Clear cache and deploy site**.

## 5. Verify the launch

Open and test:

```text
https://YOUR-SITE-NAME.netlify.app/
https://YOUR-SITE-NAME.netlify.app/te
https://YOUR-SITE-NAME.netlify.app/gallery
https://YOUR-SITE-NAME.netlify.app/appointment
https://YOUR-SITE-NAME.netlify.app/robots.txt
https://YOUR-SITE-NAME.netlify.app/sitemap.xml
```

Check:

- English ↔ Telugu toggle
- Call and WhatsApp buttons
- English and Telugu appointment forms
- All gallery controls
- Mobile swipe and navigation
- Dark mode
- Google Maps directions
- Emergency links
- Canonical URL in page source

## 6. Optional custom domain

The Netlify subdomain and HTTPS are free. A custom domain usually requires purchasing the domain from a registrar. If you already own one:

1. Add it under **Domain management**.
2. Follow Netlify's DNS instructions.
3. Change `NEXT_PUBLIC_SITE_URL` to the custom HTTPS address.
4. Redeploy.

## 7. Free-plan limits

Netlify Free currently provides a hard monthly credit allowance. If the allowance is exhausted, the project pauses until the next cycle; it does not automatically generate charges. Keep paid auto-recharge disabled if you want a strict zero-cost deployment.

## Important production checks

Before launch, confirm clinic timings, doctor registration details, consultation languages, teleconsultation availability, Google Business Profile link and final review of Telugu medical wording.

Official references:

- Netlify pricing: https://www.netlify.com/pricing/
- Next.js on Netlify: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- Vercel commercial-use restriction: https://vercel.com/docs/limits/fair-use-guidelines

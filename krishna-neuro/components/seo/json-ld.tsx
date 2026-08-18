import type { MedicalReview } from "@/data/conditions";
import { articleImage } from "@/lib/page-images";
import { absoluteUrl, siteConfig } from "@/lib/site";

function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function OrganizationJsonLd() {
  const clinic = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness", "Organization"],
    "@id": `${siteConfig.url}/#clinic`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/images/brand/krishna-neuro-logo.webp"),
      width: 512,
      height: 512,
    },
    image: absoluteUrl("/images/doctor-office.webp"),
    description: siteConfig.description,
    medicalSpecialty: "Psychiatric",
    telephone: siteConfig.phones[0],
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    hasMap: siteConfig.googleMapsUrl,
    sameAs: ["https://www.facebook.com/vijayawadapsychiatry/"],
    openingHoursSpecification: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${day}`,
      opens: "09:00",
      closes: "21:00",
    })),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phones[1],
      contactType: "appointments and WhatsApp",
      areaServed: "IN-AP",
      availableLanguage: ["English", "Telugu"],
    },
  };

  const physician = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${siteConfig.url}/#physician`,
    name: siteConfig.doctor,
    url: absoluteUrl("/doctor/pamarthi-krishna-das"),
    image: absoluteUrl("/images/doctor-portrait.webp"),
    description: `${siteConfig.credentials}. ${siteConfig.role} in Vijayawada.`,
    medicalSpecialty: "Psychiatry",
    worksFor: { "@id": `${siteConfig.url}/#clinic` },
    address: { "@id": `${siteConfig.url}/#clinic` },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    publisher: { "@id": `${siteConfig.url}/#clinic` },
    inLanguage: ["en-IN", "te-IN"],
  };

  return <JsonLd data={[clinic, physician, website]} />;
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; item: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          ...(item.item ? { item: absoluteUrl(item.item) } : {}),
        })),
      }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }}
    />
  );
}

export function MedicalWebPageJsonLd({ name, description, path, about, dateModified, review }: { name: string; description: string; path: string; about: string; dateModified: string; review?: MedicalReview }) {
  const reviewed = Boolean(review?.reviewed && review.reviewedAt);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name,
        description,
        url: absoluteUrl(path),
        dateModified,
        about: { "@type": "MedicalCondition", name: about },
        publisher: { "@id": `${siteConfig.url}/#clinic` },
        ...(reviewed ? { reviewedBy: { "@id": `${siteConfig.url}/#physician` }, lastReviewed: review?.reviewedAt } : {}),
        inLanguage: "en-IN",
      }}
    />
  );
}

export function ArticleJsonLd({ article }: { article: { title: string; description: string; slug: string; publishedAt: string; updatedAt: string; medicalReview?: MedicalReview } }) {
  const reviewed = Boolean(article.medicalReview?.reviewed && article.medicalReview.reviewedAt);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.description,
        mainEntityOfPage: absoluteUrl(`/blog/${article.slug}`),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: { "@type": "Organization", name: `${siteConfig.name} Editorial Team`, url: siteConfig.url },
        ...(reviewed ? { reviewedBy: { "@id": `${siteConfig.url}/#physician` }, lastReviewed: article.medicalReview?.reviewedAt } : {}),
        publisher: { "@id": `${siteConfig.url}/#clinic` },
        image: absoluteUrl(articleImage(article.slug)),
        inLanguage: "en-IN",
      }}
    />
  );
}

export function LocalServiceJsonLd({ name, description, path, area }: { name: string; description: string; path: string; area: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl(path),
        provider: { "@id": `${siteConfig.url}/#clinic` },
        areaServed: { "@type": "Place", name: area },
        serviceType: "Psychiatric consultation",
      }}
    />
  );
}

export function VerifiedReviewJsonLd() {
  const rating = Number(process.env.NEXT_PUBLIC_GOOGLE_RATING);
  const count = Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT);
  if (!rating || !count || rating < 1 || rating > 5 || count < 1) return null;
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "MedicalClinic",
        "@id": `${siteConfig.url}/#clinic`,
        name: siteConfig.name,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: rating,
          reviewCount: count,
          bestRating: 5,
          worstRating: 1,
        },
      }}
    />
  );
}

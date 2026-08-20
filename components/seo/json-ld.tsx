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
  const clinicAddress = {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.locality}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.region,
    postalCode: siteConfig.address.postalCode,
    addressCountry: "IN",
  };

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
    address: clinicAddress,
    areaServed: {
      "@type": "City",
      name: siteConfig.address.city,
      containedInPlace: { "@type": "State", name: siteConfig.address.region },
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
    "@type": ["Person", "Physician"],
    "@id": `${siteConfig.url}/#physician`,
    name: siteConfig.doctor,
    honorificPrefix: "Dr.",
    jobTitle: siteConfig.role,
    url: absoluteUrl("/doctor/pamarthi-krishna-das"),
    image: absoluteUrl("/images/doctor-portrait.webp"),
    description: `${siteConfig.credentials}. ${siteConfig.role} in Vijayawada.`,
    medicalSpecialty: "Psychiatry",
    hasCredential: [
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MBBS" },
      { "@type": "EducationalOccupationalCredential", credentialCategory: "degree", name: "MD (Psychiatry)" },
    ],
    knowsAbout: ["Psychiatry", "Mental health", "Addiction psychiatry", "Child and adolescent psychiatry", "Old age psychiatry"],
    worksFor: { "@id": `${siteConfig.url}/#clinic` },
    workLocation: { "@id": `${siteConfig.url}/#clinic` },
    address: clinicAddress,
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

export function WebPageJsonLd({ name, description, path, type = "WebPage", aboutId, mainEntityId, dateModified, language = "en-IN" }: { name: string; description: string; path: string; type?: "WebPage" | "MedicalWebPage" | "ProfilePage" | "ContactPage" | "CollectionPage"; aboutId?: string; mainEntityId?: string; dateModified?: string; language?: "en-IN" | "te-IN" }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${absoluteUrl(path)}#webpage`,
        name,
        description,
        url: absoluteUrl(path),
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        publisher: { "@id": `${siteConfig.url}/#clinic` },
        inLanguage: language,
        ...(aboutId ? { about: { "@id": aboutId.startsWith("#") ? `${siteConfig.url}/${aboutId}` : absoluteUrl(aboutId) } } : {}),
        ...(mainEntityId ? { mainEntity: { "@id": mainEntityId.startsWith("#") ? `${siteConfig.url}/${mainEntityId}` : absoluteUrl(mainEntityId) } } : {}),
        ...(dateModified ? { dateModified } : {}),
      }}
    />
  );
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

export function MedicalWebPageJsonLd({ name, description, path, about, dateModified, review, citations = [], language = "en-IN" }: { name: string; description: string; path: string; about: string; dateModified: string; review?: MedicalReview; citations?: string[]; language?: "en-IN" | "te-IN" }) {
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
        ...(citations.length ? { citation: citations } : {}),
        ...(reviewed ? { reviewedBy: { "@id": `${siteConfig.url}/#physician` }, lastReviewed: review?.reviewedAt } : {}),
        inLanguage: language,
      }}
    />
  );
}

export function ArticleJsonLd({ article, path, headline, description, language = "en-IN", includeMedicalReview = true }: { article: { title: string; description: string; slug: string; publishedAt: string; updatedAt: string; medicalReview?: MedicalReview; references?: { href: string }[] }; path?: string; headline?: string; description?: string; language?: "en-IN" | "te-IN"; includeMedicalReview?: boolean }) {
  const reviewed = Boolean(includeMedicalReview && article.medicalReview?.reviewed && article.medicalReview.reviewedAt);
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: headline || article.title,
        description: description || article.description,
        mainEntityOfPage: absoluteUrl(path || `/blog/${article.slug}`),
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        author: { "@type": "Organization", name: `${siteConfig.name} Editorial Team`, url: siteConfig.url },
        ...(reviewed ? { reviewedBy: { "@id": `${siteConfig.url}/#physician` }, lastReviewed: article.medicalReview?.reviewedAt } : {}),
        publisher: { "@id": `${siteConfig.url}/#clinic` },
        image: absoluteUrl(articleImage(article.slug)),
        ...(article.references?.length ? { citation: article.references.map((reference) => reference.href) } : {}),
        inLanguage: language,
      }}
    />
  );
}

export function LocalServiceJsonLd({ name, description, path, area, language = "en-IN" }: { name: string; description: string; path: string; area: string; language?: "en-IN" | "te-IN" }) {
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
        serviceType: name,
        inLanguage: language,
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

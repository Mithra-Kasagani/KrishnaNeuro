import { absoluteUrl, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${siteConfig.name}

> Official website information for ${siteConfig.doctor}, ${siteConfig.credentials}, ${siteConfig.role}, in Vijayawada, Andhra Pradesh, India.

## Primary entities

- Doctor: ${siteConfig.doctor}
- Verified qualifications displayed by this website: ${siteConfig.credentials}
- Professional role: ${siteConfig.role}
- Clinic: ${siteConfig.name}
- Medical specialty: Psychiatry
- Clinic locality: ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.region}, India

## Clinic contact and location

- Address: ${siteConfig.address.line1}, ${siteConfig.address.line2}, ${siteConfig.address.locality}, ${siteConfig.address.city}, ${siteConfig.address.region} ${siteConfig.address.postalCode}, India
- Voice calls: ${siteConfig.displayPhones[0]}
- WhatsApp and appointment messages: ${siteConfig.whatsappDisplay}
- Email: ${siteConfig.email}
- Hours supplied by the clinic: ${siteConfig.hours.summary}; ${siteConfig.hours.closed}
- Directions: ${siteConfig.googleMapsUrl}

## Authoritative website pages

- Homepage: ${siteConfig.url}
- Doctor profile: ${absoluteUrl("/doctor/pamarthi-krishna-das")}
- Psychiatrist in Vijayawada: ${absoluteUrl("/psychiatrist-in-vijayawada")}
- Conditions and care guides: ${absoluteUrl("/conditions")}
- Psychiatric services: ${absoluteUrl("/services")}
- Treatment approach: ${absoluteUrl("/treatments")}
- Patient and family resources: ${absoluteUrl("/resources")}
- Mental-health articles: ${absoluteUrl("/blog")}
- Appointment request: ${absoluteUrl("/appointment")}
- Clinic visit information: ${absoluteUrl("/clinic-vijayawada")}
- Contact and directions: ${absoluteUrl("/contact")}
- Medical disclaimer: ${absoluteUrl("/medical-disclaimer")}
- Telugu website: ${absoluteUrl("/te")}
- Emergency guidance: ${absoluteUrl("/emergency")}

## Scope of care described on the website

The website provides general information about psychiatric assessment and treatment options for mood, anxiety, OCD, bipolar disorder, psychosis, addiction, sleep, child and adolescent, women's mental health, memory, older-adult and family concerns. Individual diagnosis and treatment require a clinical assessment.

## Editorial and safety policy

- Educational articles are attributed to the ${siteConfig.name} Editorial Team unless a page explicitly states otherwise.
- Medical reviewer information is displayed only after genuine review and a real review date are recorded.
- The website does not promise a cure, guaranteed recovery, rankings, outcomes or superiority over other clinicians.
- The website does not publish fabricated reviews, ratings, awards, memberships or professional identifiers.
- Routine website forms are not emergency services. For immediate danger in India call ${siteConfig.emergency.india}; Tele-MANAS is available on ${siteConfig.emergency.teleManas}.

## Languages

- English: en-IN
- Telugu: te-IN

Last website information update: 2026-08-20
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

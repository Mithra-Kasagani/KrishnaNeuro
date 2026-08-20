import type { Metadata } from "next";
import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { QuickContact } from "@/components/contact/quick-contact";
import { WebPageJsonLd } from "@/components/seo/json-ld";
import { EmergencyNote } from "@/components/shared/emergency-note";
import { MapCard } from "@/components/shared/map-card";
import { PageHero } from "@/components/shared/page-hero";
import { Button } from "@/components/ui/button";
import { coreSeoPages } from "@/data/seo-pages";
import { createMetadataFromModel } from "@/lib/metadata";
import { pageImage } from "@/lib/page-images";
import { siteConfig, whatsappHref } from "@/lib/site";

export const metadata: Metadata = createMetadataFromModel(coreSeoPages.contact, ["Krishna Neuro Psychiatric Centre contact", "psychiatrist Suryaraopet address", "Dr Pamarthi Krishna Das phone"]);

export default function ContactPage() {
  const cards=[{title:"Call",value:siteConfig.displayPhones[0],note:"Voice calls",href:`tel:${siteConfig.phones[0]}`,icon:Phone},{title:"WhatsApp",value:siteConfig.whatsappDisplay,note:"Appointments and messages",href:whatsappHref(),icon:MessageCircle},{title:"Email",value:siteConfig.email,note:"Avoid sensitive records",href:`mailto:${siteConfig.email}`,icon:Mail},{title:"Hours",value:"Mon–Sat · 9 AM–9 PM",note:"Sunday closed · call to confirm",href:`tel:${siteConfig.phones[0]}`,icon:Clock3}];
  return (<><WebPageJsonLd name={coreSeoPages.contact.h1} description={coreSeoPages.contact.metaDescription} path={coreSeoPages.contact.canonicalUrl} type="ContactPage" aboutId="#clinic" dateModified={coreSeoPages.contact.lastUpdated} /><PageHero badge="Contact & directions" image={pageImage("contact")} imageAlt="Editorial photograph about access to mental healthcare in Vijayawada" title="Contact Krishna Neuro Psychiatric Centre" description="Call for immediate scheduling questions, use WhatsApp for a simple request, or open live directions to Suryaraopet." breadcrumbs={[{label:"Contact"}]} actions={<><Button asChild><a href={`tel:${siteConfig.phones[0]}`}><Phone/>Call now</a></Button><Button asChild variant="outline"><a href={siteConfig.googleMapsUrl} target="_blank" rel="noreferrer"><MapPin/>Get directions</a></Button></>} /><section className="container-page py-14 md:py-20"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{cards.map(card=>{const Icon=card.icon;return <a key={card.title} href={card.href} target={card.title==="WhatsApp"?"_blank":undefined} rel={card.title==="WhatsApp"?"noreferrer":undefined} className="rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-accent/35"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary"><Icon className="size-4.5"/></span><p className="mt-4 text-xs font-extrabold uppercase tracking-[0.11em] text-muted-foreground">{card.title}</p><p className="mt-2 break-words text-sm font-extrabold text-foreground">{card.value}</p><p className="mt-1 text-xs text-muted-foreground">{card.note}</p></a>})}</div><div className="mt-10 grid gap-8 lg:grid-cols-[.7fr_1.3fr]"><QuickContact/><MapCard/></div><EmergencyNote className="mt-8"/></section></>);
}

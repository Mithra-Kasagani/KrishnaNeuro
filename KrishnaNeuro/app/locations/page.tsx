import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { PageHero } from "@/components/shared/page-hero";
import { localPages } from "@/data/locations";
import { createMetadata } from "@/lib/metadata";
import { locationImage } from "@/lib/page-images";

export const metadata: Metadata = createMetadata({ title: "Psychiatrist Near Vijayawada Neighbourhoods", description: "Find appointment and travel guidance for Krishna Neuro Psychiatric Centre from Benz Circle, Patamata, Poranki, Kanuru, Mangalagiri and nearby areas.", path: "/locations", noIndex: true });

export default function LocationsPage(){return <><PageHero badge="Local access" image={locationImage()} imageAlt="Editorial city care photograph for Vijayawada" title="Psychiatric care for Vijayawada and nearby communities." description="The clinic is in Suryaraopet near Nakkala Road. These pages help with local planning without inventing fixed travel times or claiming to be the nearest clinic." breadcrumbs={[{label:"Locations"}]}/><section className="container-page py-14 md:py-20"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{localPages.map(page=><Link key={page.slug} href={`/locations/${page.slug}`} className="group rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-1 hover:border-accent/35"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary"><MapPin className="size-4.5"/></span><h2 className="mt-4 text-lg font-extrabold tracking-[-0.025em] group-hover:text-primary">{page.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{page.intro}</p><span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-primary">Local guide<ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></span></Link>)}</div></section><AppointmentCTA/></>}

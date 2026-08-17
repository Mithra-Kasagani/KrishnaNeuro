import type { Metadata } from "next";
import { ExternalLink, Images } from "lucide-react";
import { GallerySlideshow } from "@/components/gallery/gallery-slideshow";
import { PageHero } from "@/components/shared/page-hero";
import { gallerySlides } from "@/data/gallery";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Clinic Gallery — Awareness, Education & Community Care",
  description: "Browse an accessible slideshow of Krishna Neuro Psychiatric Centre's public awareness sessions, press education and community initiatives in Vijayawada.",
  path: "/gallery",
  image: gallerySlides[0].src,
  keywords: ["Krishna Neuro Psychiatric Centre gallery", "mental health awareness Vijayawada", "Dr Krishna Das photos"],
});

export default function GalleryPage() {
  return (
    <>
      <PageHero badge="Clinic archive" title="Gallery: awareness, education and community care." description="A selected visual record of public mental-health education, professional sessions, press features and community outreach." breadcrumbs={[{ label: "Gallery" }]} image={gallerySlides[6].src} imageAlt={gallerySlides[6].alt} imageLabel="Facebook archive photograph" />
      <section className="container-page py-14 md:py-20">
        <div className="mb-8 flex gap-4 rounded-2xl bg-primary/6 p-5"><Images className="mt-0.5 size-5 shrink-0 text-primary"/><p className="text-sm leading-7 text-muted-foreground">Use the previous, play/pause and next controls—or swipe on a phone. Select any thumbnail to jump directly to that image. Autoplay turns off when your device requests reduced motion.</p></div>
        <GallerySlideshow />
        <div className="mt-8 rounded-2xl bg-muted/45 p-6"><h2 className="text-lg font-extrabold">Original Facebook sources</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{gallerySlides.map((slide,index)=><a key={slide.id} href={slide.photoUrl || slide.albumUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-card/70 p-3 text-sm font-bold transition hover:bg-card hover:text-primary"><span>{String(index+1).padStart(2,"0")} · {slide.title}</span><ExternalLink className="size-3.5 shrink-0"/></a>)}</div></div>
      </section>
    </>
  );
}

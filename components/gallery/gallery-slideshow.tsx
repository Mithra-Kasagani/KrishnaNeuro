"use client";

import Image from "next/image";
import { ExternalLink, Pause, Play, SkipBack, SkipForward } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BiText } from "@/components/i18n/bilingual-text";
import { Button } from "@/components/ui/button";
import { gallerySlides } from "@/data/gallery";
import { cn } from "@/lib/utils";

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function motionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function GallerySlideshow({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeMotion, motionSnapshot, () => false);
  const touchStart = useRef<number | null>(null);
  const slide = gallerySlides[index];
  const autoplay = playing && !hovered && !reducedMotion;

  const previous = useCallback(() => setIndex((current) => (current - 1 + gallerySlides.length) % gallerySlides.length), []);
  const next = useCallback(() => setIndex((current) => (current + 1) % gallerySlides.length), []);

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setInterval(next, 9_000);
    return () => window.clearInterval(timer);
  }, [autoplay, next]);

  return (
    <div className="bg-transparent" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setHovered(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") previous(); if (event.key === "ArrowRight") next(); if (event.key === " ") { event.preventDefault(); setPlaying((value) => !value); } }} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null) return; const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current; if (Math.abs(distance) > 45) { if (distance > 0) previous(); else next(); } touchStart.current = null; }} tabIndex={0} aria-roledescription="carousel" aria-label="Clinic archive gallery">
      <div className={cn("relative overflow-hidden bg-transparent", compact ? "aspect-[4/5] min-h-[26rem] sm:aspect-[16/10] sm:min-h-[32rem]" : "aspect-[4/5] min-h-[28rem] sm:aspect-[16/9] md:min-h-[34rem]") }>
        <div key={slide.id} className="gallery-slide absolute inset-0">
          <Image src={slide.src} alt={slide.alt} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 76rem" className="gallery-slide-image object-contain" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent" aria-hidden="true" />
        <div className="absolute left-4 top-4 rounded-full bg-slate-950/55 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.1em] text-white backdrop-blur-md"><BiText en="Clinic archive" te="క్లినిక్ ఆర్కైవ్" /></div>
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-white md:bottom-6 md:left-7 md:right-7">
          <div aria-live={autoplay ? "off" : "polite"} className="max-w-2xl"><p className="text-xs font-bold text-emerald-300">{String(index + 1).padStart(2, "0")} / {String(gallerySlides.length).padStart(2, "0")}</p><h3 className="mt-1 text-lg font-extrabold tracking-[-0.02em] md:text-2xl"><BiText en={slide.title} te={slide.titleTe} /></h3>{!compact && <p className="mt-2 hidden max-w-xl text-sm leading-6 text-slate-200 sm:block"><BiText en={slide.description} te={slide.descriptionTe} /></p>}</div>
          <a href={slide.photoUrl || slide.albumUrl} target="_blank" rel="noreferrer" className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition hover:bg-white/25" aria-label="View original Facebook album"><ExternalLink className="size-4" /></a>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-1 pb-2 pt-5 md:px-2">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon" className="bg-muted/70" onClick={previous} aria-label="Previous gallery image"><SkipBack /></Button>
            <Button type="button" variant="ghost" size="icon" className="bg-muted/70" onClick={() => setPlaying((value) => !value)} aria-label={playing ? "Pause slideshow" : "Play slideshow"}>{playing ? <Pause /> : <Play />}</Button>
            <Button type="button" variant="ghost" size="icon" className="bg-muted/70" onClick={next} aria-label="Next gallery image"><SkipForward /></Button>
          </div>
          <p className="hidden text-xs leading-5 text-muted-foreground md:block"><BiText en={reducedMotion ? "Autoplay is off because reduced motion is enabled." : autoplay ? "Playing automatically · pauses on hover" : "Slideshow paused"} te={reducedMotion ? "Reduced motion వల్ల ఆటోప్లే ఆఫ్‌లో ఉంది." : autoplay ? "ఆటోమేటిక్‌గా ప్లే అవుతోంది · హోవర్ చేస్తే ఆగుతుంది" : "స్లైడ్‌షో ఆగింది"} /></p>
        </div>
        {!compact && <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Choose gallery image">
          {gallerySlides.map((item, itemIndex) => <button key={item.id} type="button" onClick={() => setIndex(itemIndex)} className={cn("relative aspect-[4/3] min-w-20 overflow-hidden rounded-xl transition duration-500 md:min-w-24", index === itemIndex ? "scale-100 opacity-100 shadow-card" : "scale-[.96] opacity-45 hover:scale-[.99] hover:opacity-85") } role="tab" aria-selected={index === itemIndex} aria-label={`Show gallery image ${itemIndex + 1}`}><Image src={item.src} alt="" fill sizes="96px" className="object-cover" /></button>)}
        </div>}
      </div>
    </div>
  );
}

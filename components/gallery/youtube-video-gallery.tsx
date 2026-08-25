"use client";

import Image from "next/image";
import { ExternalLink, Play, ShieldCheck, X } from "lucide-react";
import { useState } from "react";
import { galleryVideos } from "@/data/gallery-videos";

export function YouTubeVideoGallery({ language = "en" }: { language?: "en" | "te" }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const telugu = language === "te";

  return (
    <div>
      <div className="mb-7 flex gap-3 rounded-2xl border border-border bg-muted/55 p-5 text-sm leading-7 text-muted-foreground">
        <ShieldCheck className="mt-1 size-5 shrink-0 text-secondary" aria-hidden="true" />
        <p>{telugu ? "మీరు Play నొక్కిన తర్వాత మాత్రమే YouTube వీడియో లోడ్ అవుతుంది. వీడియో ప్రారంభించినప్పుడు YouTube గోప్యతా విధానం మరియు సేవా నిబంధనలు వర్తిస్తాయి." : "YouTube loads only after you press Play. Once a video starts, YouTube’s privacy policy and terms apply."}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {galleryVideos.map((video) => {
          const active = activeId === video.id;
          const title = telugu ? video.titleTe : video.title;
          const description = telugu ? video.descriptionTe : video.description;
          return (
            <article key={video.id} className="overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-card">
              <div className="relative aspect-video bg-slate-950">
                {active ? (
                  <>
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                      title={title}
                      className="absolute inset-0 size-full border-0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                    <button type="button" onClick={() => setActiveId(null)} className="absolute right-3 top-3 z-10 flex min-h-11 items-center gap-1.5 rounded-full bg-slate-950/80 px-3 text-xs font-extrabold text-white backdrop-blur-md transition hover:bg-slate-950" aria-label={telugu ? `${title} వీడియోను మూసివేయండి` : `Close ${title} video`}><X className="size-4" aria-hidden="true" />{telugu ? "మూసివేయండి" : "Close"}</button>
                  </>
                ) : (
                  <button type="button" onClick={() => setActiveId(video.id)} className="group absolute inset-0 size-full overflow-hidden text-left" aria-label={telugu ? `${title} వీడియోను ప్లే చేయండి` : `Play video: ${title}`}>
                    <Image src={video.thumbnail} alt="" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-500 group-hover:scale-[1.025]" />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" aria-hidden="true" />
                    <span className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#c5221f] text-white shadow-xl transition group-hover:scale-105 group-focus-visible:scale-105"><Play className="ml-1 size-7 fill-current" aria-hidden="true" /></span>
                    <span className="absolute bottom-4 left-4 rounded-full bg-slate-950/70 px-3 py-1.5 text-xs font-extrabold text-white backdrop-blur-md">{telugu ? "వీడియో ప్లే చేయండి" : "Play video"}</span>
                  </button>
                )}
              </div>
              <div className="p-5 md:p-6">
                <p className="text-xs font-extrabold uppercase tracking-[0.1em] text-secondary">YouTube · {video.sourceChannel}</p>
                <h3 className="mt-3 text-xl font-extrabold leading-snug tracking-[-0.025em] text-foreground">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
                <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-extrabold text-primary underline decoration-primary/25 underline-offset-4">{telugu ? "YouTubeలో చూడండి" : "Watch on YouTube"}<ExternalLink className="size-4" aria-hidden="true" /></a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const DynamicGallerySlideshow = dynamic(
  () => import("@/components/gallery/gallery-slideshow").then((module) => module.GallerySlideshow),
  { ssr: false, loading: () => <div className="min-h-[26rem] animate-pulse bg-muted/55 sm:min-h-[32rem]" aria-label="Loading gallery" /> },
);

export function LazyGallerySlideshow() {
  const [visible, setVisible] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisible(true);
        observer.disconnect();
      }
    }, { rootMargin: "400px 0px" });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={container} className="min-h-[26rem] sm:min-h-[32rem]">{visible ? <DynamicGallerySlideshow compact /> : <div className="h-full min-h-[26rem] bg-muted/35 sm:min-h-[32rem]" aria-hidden="true" />}</div>;
}

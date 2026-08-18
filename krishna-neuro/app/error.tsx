"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { useEffect } from "react";
import { AiEditorialImage } from "@/components/shared/ai-editorial-image";
import { Button } from "@/components/ui/button";
import { pageImage } from "@/lib/page-images";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error); }, [error]);
  return (
    <section className="container-page flex min-h-[65vh] items-center justify-center py-16">
      <div className="max-w-xl rounded-[2rem] border border-border bg-card p-8 text-center shadow-card md:p-12">
        <AiEditorialImage src={pageImage("wellbeing")} alt="Editorial mental healthcare photograph" className="mb-7 aspect-[16/7]" sizes="(max-width: 768px) 100vw, 36rem" />
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"><TriangleAlert aria-hidden="true"/></span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-[-0.04em]">This page needs another moment.</h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">No appointment request has been sent from this error screen. Please try again or call the clinic if the issue continues.</p>
        <Button onClick={reset} className="mt-6"><RotateCcw aria-hidden="true"/>Try again</Button>
      </div>
    </section>
  );
}

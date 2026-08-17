import { ArrowLeft, Compass, Search } from "lucide-react";
import Link from "next/link";
import { AiEditorialImage } from "@/components/shared/ai-editorial-image";
import { Button } from "@/components/ui/button";
import { pageImage } from "@/lib/page-images";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] items-center py-18">
      <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-border bg-card px-6 py-16 text-center shadow-soft md:px-12">
        <div className="absolute inset-0 surface-grid opacity-70" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <AiEditorialImage src={pageImage("resources")} alt="Editorial photograph representing a pathway to mental healthcare information" className="mb-8 aspect-[16/7]" sizes="(max-width: 768px) 100vw, 42rem" />
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary/9 text-primary"><Compass className="size-6" aria-hidden="true" /></span>
          <p className="mt-6 text-sm font-extrabold uppercase tracking-[0.16em] text-primary">404 · Page not found</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-[-0.045em] text-foreground md:text-6xl">Let’s find a clearer path.</h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground">The page may have moved, but help is still close. Explore conditions, read a guide, or return home.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild><Link href="/"><ArrowLeft aria-hidden="true"/>Back home</Link></Button>
            <Button asChild variant="outline"><Link href="/conditions"><Search aria-hidden="true"/>Browse conditions</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}

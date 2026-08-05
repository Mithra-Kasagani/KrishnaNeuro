"use client";

import { ArrowRight, Brain, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form-controls";
import { conditionCategories, conditions } from "@/data/conditions";
import { conditionImage } from "@/lib/page-images";
import { cn } from "@/lib/utils";

export function ConditionDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const filtered = useMemo(() => conditions.filter((item) => (category === "All" || item.category === category) && `${item.name} ${item.summary} ${item.category}`.toLowerCase().includes(query.trim().toLowerCase())), [query, category]);

  return (
    <div>
      <div className="sticky top-22 z-20 rounded-[1.4rem] border border-border bg-card/90 p-3 shadow-card backdrop-blur-xl md:p-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" aria-hidden="true"/>
          <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search depression, sleep, child behaviour…" aria-label="Search conditions" className="pl-11 pr-11"/>
          {query && <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Clear search"><X className="size-4"/></button>}
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
          {["All", ...conditionCategories].map((item) => <button key={item} onClick={() => setCategory(item)} className={cn("min-h-9 shrink-0 rounded-full border px-3.5 text-xs font-bold transition", category === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/30 hover:text-foreground")} aria-pressed={category === item}>{item}</button>)}
        </div>
      </div>
      <p className="mt-6 text-xs font-bold uppercase tracking-[0.1em] text-muted-foreground" aria-live="polite">{filtered.length} {filtered.length === 1 ? "guide" : "guides"}</p>
      {filtered.length ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((condition) => <Link key={condition.slug} href={`/conditions/${condition.slug}`} className="group flex min-h-58 flex-col rounded-[1.5rem] border border-border bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft"><div className="relative -mx-5 -mt-5 mb-5 aspect-[16/8] overflow-hidden rounded-t-[1.45rem]"><Image src={conditionImage(condition.slug)} alt={`Editorial photograph illustrating ${condition.name}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]"/></div><div className="flex items-center justify-between"><span className="flex size-10 items-center justify-center rounded-xl bg-primary/8 text-primary"><Brain className="size-4.5" aria-hidden="true"/></span><span className="rounded-full bg-muted px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wider text-muted-foreground">{condition.category}</span></div><h2 className="mt-5 text-lg font-extrabold tracking-[-0.025em] group-hover:text-primary">{condition.name}</h2><p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">{condition.summary}</p><span className="mt-5 inline-flex items-center gap-1 text-xs font-extrabold text-primary">View care guide <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true"/></span></Link>)}
        </div>
      ) : (
        <div className="mt-5 rounded-[1.7rem] border border-dashed border-border bg-card p-10 text-center"><span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground"><Search className="size-5" aria-hidden="true"/></span><h2 className="mt-4 text-xl font-extrabold">No matching guide yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">Try a broader term, reset the category, or ask the clinic about the concern without needing to know its name.</p><Button variant="soft" className="mt-5" onClick={() => { setQuery(""); setCategory("All"); }}>Show all conditions</Button></div>
      )}
    </div>
  );
}

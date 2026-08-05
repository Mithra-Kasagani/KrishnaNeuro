"use client";

import { ArrowRight, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/form-controls";
import { articles } from "@/data/articles";
import { articleImage } from "@/lib/page-images";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(articles.map((article) => article.category)))];

export function ArticleDirectory() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => articles.filter((article) => (category === "All" || article.category === category) && `${article.title} ${article.description}`.toLowerCase().includes(query.toLowerCase())), [query, category]);
  return (
    <div>
      <div className="rounded-[1.5rem] border border-border bg-card p-4 shadow-card">
        <div className="relative"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true"/><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-11 pr-10" placeholder="Search practical mental-health guides" aria-label="Search articles"/>{query && <button onClick={()=>setQuery("")} aria-label="Clear search" className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full hover:bg-muted"><X className="size-4"/></button>}</div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">{categories.map((item)=><button key={item} onClick={()=>setCategory(item)} className={cn("min-h-9 shrink-0 rounded-full border px-3.5 text-xs font-bold",category===item?"border-primary bg-primary text-primary-foreground":"border-border text-muted-foreground hover:text-foreground")}>{item}</button>)}</div>
      </div>
      {filtered.length ? <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{filtered.map((article)=><Link href={`/blog/${article.slug}`} key={article.slug} className="group flex h-full flex-col overflow-hidden rounded-[1.6rem] border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-soft"><div className="relative aspect-[16/9] overflow-hidden"><Image src={articleImage(article.slug)} alt={`Editorial photograph for ${article.title}`} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-[1.03]"/></div><article className="flex flex-1 flex-col p-6"><Badge className="self-start">{article.category}</Badge><h2 className="mt-5 text-xl font-extrabold leading-tight tracking-[-0.03em] group-hover:text-primary">{article.title}</h2><p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">{article.description}</p><div className="mt-6 flex items-center justify-between text-xs font-bold text-muted-foreground"><span>{article.readingMinutes} min read</span><span className="inline-flex items-center gap-1 text-primary">Read <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true"/></span></div></article></Link>)}</div>:<div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">No article matches that search. Try another word.</div>}
    </div>
  );
}

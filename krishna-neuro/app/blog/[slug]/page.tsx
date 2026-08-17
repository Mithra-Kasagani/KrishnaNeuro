import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpenCheck, CalendarDays, Check, Clock3, ExternalLink, Info, ShieldAlert } from "lucide-react";
import { MedicalReview } from "@/components/medical/medical-review";
import { ArticleJsonLd } from "@/components/seo/json-ld";
import { AiEditorialImage } from "@/components/shared/ai-editorial-image";
import { AppointmentCTA } from "@/components/shared/appointment-cta";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FAQList } from "@/components/shared/faq-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { articles, getArticle } from "@/data/articles";
import { createMetadata } from "@/lib/metadata";
import { aiImageAlt, articleImage } from "@/lib/page-images";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const article = getArticle(slug); if (!article) return {};
  return createMetadata({ title: article.title, description: article.description, path: `/blog/${article.slug}`, image: articleImage(article.slug), ogType: "article", keywords: [article.category, "mental health guide", "psychiatrist Vijayawada"] });
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const article = getArticle(slug); if (!article) notFound();
  const related = articles.filter((item)=>item.slug!==article.slug && (item.category===article.category || item.internalLinks.some(link=>article.internalLinks.some(a=>a.href===link.href)))).slice(0,3);
  return (
    <>
      <ArticleJsonLd article={article}/>
      <article>
        <header className="relative overflow-hidden border-b border-border bg-card"><div className="absolute inset-0 surface-grid opacity-65"/><div className="container-page relative py-12 md:py-18"><Breadcrumbs items={[{label:"Articles",href:"/blog"},{label:article.title}]}/><div className="mt-9 max-w-4xl"><Badge>{article.category}</Badge><h1 className="mt-5 text-balance text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-[1.02] tracking-[-0.055em]">{article.title}</h1><p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground md:text-xl">{article.description}</p><div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-bold text-muted-foreground"><span className="inline-flex items-center gap-1.5"><BookOpenCheck className="size-4 text-primary"/>Written by: Krishna Neuro Psychiatric Centre Editorial Team</span><span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-primary"/>Updated {formatDate(article.updatedAt)}</span><span className="inline-flex items-center gap-1.5"><Clock3 className="size-4 text-primary"/>{article.readingMinutes} min read</span></div></div><AiEditorialImage src={articleImage(article.slug)} alt={aiImageAlt(article.title)} className="mt-9 aspect-[16/7]" sizes="100vw" /></div></header>
        <div className="container-page grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_19rem] lg:py-20">
          <div className="min-w-0">
            <div className="rounded-[1.6rem] border border-primary/15 bg-primary/6 p-6"><h2 className="text-lg font-extrabold">Key points</h2><ul className="mt-4 grid gap-3">{article.takeaways.map(item=><li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary"><Check className="size-3" strokeWidth={3}/></span>{item}</li>)}</ul></div>
            {article.medicalReview?.reviewed && <div className="mt-6"><MedicalReview review={article.medicalReview} /></div>}
            <p className="mt-9 text-xl font-semibold leading-9 tracking-[-0.018em] text-foreground">{article.lead}</p>
            <div className="prose-clinic">{article.sections.map(section=><section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}</div>
            <aside className="mt-10 flex gap-4 rounded-2xl border border-amber-300/45 bg-amber-50 p-5 text-amber-950 dark:border-amber-400/25 dark:bg-amber-950/25 dark:text-amber-100"><ShieldAlert className="mt-0.5 size-5 shrink-0"/><p className="text-sm leading-7"><strong>Emergency reminder:</strong> immediate danger, overdose, seizure, severe confusion, violence or inability to stay safe requires 112 or the nearest emergency department. Tele-MANAS: 14416.</p></aside>
            <section className="mt-14"><h2 className="text-3xl font-extrabold tracking-[-0.04em]">Frequently asked questions</h2><div className="mt-5 rounded-[1.6rem] border border-border bg-card px-6 shadow-card"><FAQList faqs={article.faqs}/></div></section>
            <section className="mt-12"><h2 className="text-xl font-extrabold tracking-[-0.03em]">Sources and further reading</h2><ul className="mt-5 grid gap-3">{article.references.map(reference=><li key={reference.href}><a href={reference.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">{reference.label}<ExternalLink className="size-3.5"/></a></li>)}</ul><p className="mt-6 text-xs leading-6 text-muted-foreground">This article provides general education and cannot account for your diagnosis, health, medicines, age, pregnancy or safety. Clinical recommendations evolve; ask a qualified professional about your situation.</p></section>
          </div>
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start"><div className="rounded-[1.6rem] border border-border bg-card p-6 shadow-card"><p className="text-xs font-extrabold uppercase tracking-[0.12em] text-muted-foreground">Related care</p><div className="mt-4 grid gap-2">{article.internalLinks.map(link=><Link key={link.href} href={link.href} className="group flex items-center justify-between rounded-xl border border-border p-3 text-sm font-bold hover:border-accent/35 hover:text-primary">{link.label}<ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></Link>)}</div></div><div className="rounded-[1.6rem] bg-[#0b3b64] p-6 text-white shadow-card"><Info className="size-5 text-emerald-300"/><h2 className="mt-4 text-xl font-extrabold tracking-[-0.03em]">Need personal guidance?</h2><p className="mt-2 text-sm leading-6 text-slate-200">An article can orient you. A consultation can assess your individual pattern.</p><Button asChild variant="white" className="mt-5 w-full"><Link prefetch={false} href="/appointment">Request appointment<ArrowRight/></Link></Button></div></aside>
        </div>
      </article>
      {related.length>0&&<section className="border-y border-border bg-muted/55 py-14"><div className="container-page"><h2 className="text-2xl font-extrabold tracking-[-0.035em]">Continue reading</h2><div className="mt-7 grid gap-4 md:grid-cols-3">{related.map(item=><Link key={item.slug} href={`/blog/${item.slug}`} className="group rounded-2xl border border-border bg-card p-5 shadow-card hover:border-accent/35"><Badge>{item.category}</Badge><h3 className="mt-4 font-extrabold leading-snug group-hover:text-primary">{item.title}</h3><span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-primary">Read guide<ArrowRight className="size-3.5 transition group-hover:translate-x-1"/></span></Link>)}</div></div></section>}
      <AppointmentCTA />
    </>
  );
}

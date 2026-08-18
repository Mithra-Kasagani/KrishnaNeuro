import { ExternalLink, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function GoogleReviews() {
  const rating = Number(process.env.NEXT_PUBLIC_GOOGLE_RATING);
  const count = Number(process.env.NEXT_PUBLIC_GOOGLE_REVIEW_COUNT);
  const verified = rating >= 1 && rating <= 5 && count > 0;
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 p-7 shadow-card md:p-10">
      <Quote className="absolute -right-3 -top-6 size-36 text-primary/5" aria-hidden="true" />
      <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow">Independent feedback</p>
          <h3 className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-foreground">Read current reviews on Google</h3>
          {verified ? (
            <div className="mt-4 flex flex-wrap items-center gap-3"><span className="text-4xl font-extrabold tracking-[-0.04em] text-foreground">{rating.toFixed(1)}</span><div><div className="flex text-amber-500">{[1,2,3,4,5].map((i)=><Star key={i} className="size-4.5" fill="currentColor" aria-hidden="true"/>)}</div><p className="mt-1 text-xs text-muted-foreground">{count} verified Google reviews</p></div></div>
          ) : (
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">For accuracy and medical ethics, this website does not invent a rating or republish unverified patient claims. Use the link to view the clinic’s current public profile directly.</p>
          )}
        </div>
        <Button asChild variant="outline" size="lg"><a href={siteConfig.googleBusinessUrl} target="_blank" rel="noreferrer">Open Google profile <ExternalLink aria-hidden="true"/></a></Button>
      </div>
    </div>
  );
}

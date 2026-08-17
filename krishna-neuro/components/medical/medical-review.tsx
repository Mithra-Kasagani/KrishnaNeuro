import { BadgeCheck, CalendarDays, Stethoscope } from "lucide-react";
import type { MedicalReview as MedicalReviewData } from "@/data/conditions";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function MedicalReview({ review, compact = false }: { review?: MedicalReviewData; compact?: boolean }) {
  if (!review?.reviewed || !review.reviewedAt) return null;
  return (
    <aside className="rounded-2xl border border-secondary/20 bg-secondary/6 p-5" aria-label="Medical review information">
      <div className="flex gap-3">
        <BadgeCheck className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden="true" />
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.11em] text-secondary">Medically reviewed</p>
          <p className="mt-2 font-extrabold text-foreground">by <a href="/doctor/pamarthi-krishna-das" className="text-primary underline decoration-primary/25 underline-offset-4">{siteConfig.doctor}</a></p>
          {!compact && <p className="mt-1 text-sm leading-6 text-muted-foreground"><Stethoscope className="mr-1.5 inline size-4" aria-hidden="true" />{siteConfig.credentials} · {siteConfig.role}<br />{siteConfig.name}, Vijayawada</p>}
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><CalendarDays className="size-3.5" aria-hidden="true" />Last reviewed: {formatDate(review.reviewedAt)}</p>
        </div>
      </div>
    </aside>
  );
}

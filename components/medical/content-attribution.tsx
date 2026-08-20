import { BookOpenCheck, CalendarDays } from "lucide-react";
import type { MedicalReview as MedicalReviewData } from "@/data/conditions";
import { MedicalReview } from "@/components/medical/medical-review";
import { formatDate } from "@/lib/utils";

function teluguDate(value: string) {
  return new Intl.DateTimeFormat("te-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));
}

export function ContentAttribution({ updatedAt, review, language = "en" }: { updatedAt: string; review?: MedicalReviewData; language?: "en" | "te" }) {
  const telugu = language === "te";
  return (
    <div className="grid gap-4">
      <aside className="flex flex-wrap gap-x-6 gap-y-3 rounded-2xl border border-border bg-card p-5 text-xs font-bold text-muted-foreground" aria-label={telugu ? "రచన మరియు నవీకరణ సమాచారం" : "Authorship and update information"}>
        <span className="inline-flex items-center gap-1.5"><BookOpenCheck className="size-4 text-primary" aria-hidden="true" />{telugu ? "రచన: కృష్ణ న్యూరో సైకియాట్రిక్ సెంటర్ ఎడిటోరియల్ టీమ్" : "Written by: Krishna Neuro Psychiatric Centre Editorial Team"}</span>
        <span className="inline-flex items-center gap-1.5"><CalendarDays className="size-4 text-primary" aria-hidden="true" />{telugu ? `నవీకరణ: ${teluguDate(updatedAt)}` : `Updated ${formatDate(updatedAt)}`}</span>
      </aside>
      {review?.reviewed && review.reviewedAt ? <MedicalReview review={review} language={language} /> : null}
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoadingSkeleton() {
  return (
    <div className="container-page py-14 md:py-20" aria-label="Loading page" aria-live="polite">
      <Skeleton className="h-5 w-36" />
      <Skeleton className="mt-7 h-14 max-w-3xl" />
      <Skeleton className="mt-4 h-7 max-w-2xl" />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[1, 2, 3].map((item) => <Skeleton key={item} className="h-56" />)}
      </div>
      <span className="sr-only">Loading content…</span>
    </div>
  );
}

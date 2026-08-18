import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  return (
    <>
      <BreadcrumbJsonLd items={all.map((item) => ({ name: item.label, item: item.href || "" }))} />
      <nav aria-label="Breadcrumb" className="overflow-x-auto">
        <ol className="flex min-w-max items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          {all.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
              {item.href && index < all.length - 1 ? (
                <Link href={item.href} className="rounded-md py-1 transition-colors hover:text-primary">
                  {index === 0 ? <span className="inline-flex items-center gap-1"><Home className="size-3.5" aria-hidden="true"/><span className="sr-only sm:not-sr-only">Home</span></span> : item.label}
                </Link>
              ) : (
                <span aria-current="page" className="max-w-56 truncate py-1 text-foreground">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

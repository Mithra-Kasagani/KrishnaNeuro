import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-primary/15 bg-primary/7 px-3 py-1 text-[0.7rem] font-extrabold uppercase tracking-[0.1em] text-primary", className)} {...props} />;
}

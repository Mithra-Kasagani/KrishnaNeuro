import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn("min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/65 hover:border-primary/30 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10", className)} {...props} />,
);
Input.displayName = "Input";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => <textarea ref={ref} className={cn("min-h-28 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm transition placeholder:text-muted-foreground/65 hover:border-primary/30 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10", className)} {...props} />,
);
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => <select ref={ref} className={cn("min-h-12 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground shadow-sm transition hover:border-primary/30 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10", className)} {...props}>{children}</select>,
);
Select.displayName = "Select";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn("mb-2 block text-sm font-bold text-foreground", className)} {...props} />;
}

export function FieldError({ children, id }: { children?: React.ReactNode; id?: string }) {
  if (!children) return null;
  return <p id={id} role="alert" className="mt-1.5 text-xs font-semibold text-amber-700 dark:text-amber-300">{children}</p>;
}

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold tracking-[-0.01em] transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4.5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-[0_12px_30px_-12px_rgb(15_76_129/.65)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0",
        secondary: "bg-secondary text-white shadow-[0_12px_30px_-14px_rgb(40_123_77/.7)] hover:-translate-y-0.5 hover:brightness-105 dark:text-slate-950",
        outline: "border border-border bg-card/70 text-foreground hover:border-accent/50 hover:bg-muted",
        ghost: "text-foreground hover:bg-muted",
        soft: "bg-primary/9 text-primary hover:bg-primary/15 dark:bg-primary/12",
        white: "bg-white text-[#0f4c81] shadow-lg hover:-translate-y-0.5 hover:bg-slate-50",
      },
      size: {
        sm: "min-h-9 px-4 text-xs",
        default: "min-h-11 px-5",
        lg: "min-h-13 px-6 text-[0.95rem]",
        icon: "size-11 min-h-11 p-0",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size }), className)} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { buttonVariants };

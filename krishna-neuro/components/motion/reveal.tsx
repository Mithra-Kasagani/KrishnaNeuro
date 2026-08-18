import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Server-rendered reveal shells keep primary content immediately paintable.
 * Rich client motion is reserved for the appointment flow so the public
 * information pages remain fast on low-end phones and assistive technology.
 */
export function Reveal({ children, className, delay = 0, y = 0, style, ...props }: HTMLAttributes<HTMLDivElement> & { delay?: number; y?: number }) {
  return (
    <div className={cn("content-reveal", className)} style={{ "--reveal-delay": `${delay}s`, "--reveal-y": `${y}px`, ...style } as CSSProperties} {...props}>
      {children}
    </div>
  );
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

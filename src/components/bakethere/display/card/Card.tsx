import { cn } from "@/lib/utils";
import type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from "./card.types";

export function Card({ theme, className, children, ...props }: CardProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn(
        "rounded-[var(--bt-radius-lg)] border border-[var(--bt-border)]",
        "bg-[var(--bt-bg-surface)] shadow-[var(--bt-shadow-sm)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

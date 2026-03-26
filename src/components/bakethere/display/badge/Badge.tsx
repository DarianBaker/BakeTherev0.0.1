import { cn } from "@/lib/utils";
import type { BadgeProps } from "./badge.types";

const variantClasses: Record<string, string> = {
  default: "bg-[var(--bt-accent-muted)] text-[var(--bt-accent)] border-transparent",
  secondary: "bg-[var(--bt-bg-muted)] text-[var(--bt-text-secondary)] border-transparent",
  destructive: "bg-[var(--bt-destructive-bg)] text-[var(--bt-destructive)] border-transparent",
  outline: "bg-transparent text-[var(--bt-text-primary)] border-[var(--bt-border)]",
};

const sizeClasses: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
};

export function Badge({
  variant = "default",
  size = "sm",
  theme,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn(
        "inline-flex items-center font-medium border rounded-[var(--bt-radius-full)]",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

import { cn } from "@/lib/utils";
import type { AlertProps, AlertTitleProps, AlertDescriptionProps, AlertVariant } from "./alert.types";

const variantStyles: Record<AlertVariant, { bg: string; borderColor: string; accent: string }> = {
  default: {
    bg: "var(--bt-bg-surface)",
    borderColor: "var(--bt-border)",
    accent: "var(--bt-text-secondary)",
  },
  info: {
    bg: "color-mix(in srgb, var(--bt-accent) 10%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-accent) 30%, transparent)",
    accent: "var(--bt-accent)",
  },
  success: {
    bg: "color-mix(in srgb, var(--bt-success) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-success) 35%, transparent)",
    accent: "var(--bt-success)",
  },
  warning: {
    bg: "color-mix(in srgb, var(--bt-warning) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-warning) 35%, transparent)",
    accent: "var(--bt-warning)",
  },
  error: {
    bg: "color-mix(in srgb, var(--bt-destructive) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-destructive) 35%, transparent)",
    accent: "var(--bt-destructive)",
  },
};

function DefaultIcon({ variant }: { variant: AlertVariant }) {
  if (variant === "success") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (variant === "error") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );
  }
  // default and info
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function Alert({
  variant = "default",
  icon,
  theme,
  className,
  children,
  style,
  ...props
}: AlertProps) {
  const vs = variantStyles[variant];
  return (
    <div
      role="alert"
      {...(theme ? { "data-bt-theme": theme } : {})}
      style={{
        background: vs.bg,
        borderLeftColor: vs.borderColor,
        ...style,
      }}
      className={cn(
        "flex gap-3 p-4 rounded-[var(--bt-radius-md)] border border-transparent border-l-4",
        className
      )}
      {...props}
    >
      <span style={{ color: vs.accent }} className="mt-0.5 shrink-0">
        {icon ?? <DefaultIcon variant={variant} />}
      </span>
      <div className="flex-1 space-y-1">
        {children}
      </div>
    </div>
  );
}

export function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <p className={cn("font-semibold text-sm text-[var(--bt-text-primary)] leading-tight", className)} {...props}>
      {children}
    </p>
  );
}

export function AlertDescription({ className, children, ...props }: AlertDescriptionProps) {
  return (
    <p className={cn("text-sm text-[var(--bt-text-secondary)]", className)} {...props}>
      {children}
    </p>
  );
}

"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ToastProps } from "./toast.types";

const variantClasses: Record<string, string> = {
  default: "border-[var(--bt-border)] bg-[var(--bt-bg-elevated)]",
  success:
    "border-[var(--bt-success)] bg-[var(--bt-bg-elevated)] text-[var(--bt-success)]",
  destructive:
    "border-[var(--bt-destructive)] bg-[var(--bt-destructive-bg)] text-[var(--bt-destructive)]",
  warning:
    "border-[var(--bt-warning)] bg-[var(--bt-bg-elevated)] text-[var(--bt-warning)]",
};

export function Toast({
  id,
  title,
  description,
  variant = "default",
  duration = 4000,
  onDismiss,
  theme,
}: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...(theme ? { "data-bt-theme": theme } : {})}
      onClick={() => onDismiss(id)}
      className={cn(
        "relative flex flex-col gap-1 rounded-[var(--bt-radius-md)] border p-4",
        "text-[var(--bt-text-primary)] shadow-[var(--bt-shadow-lg)]",
        "cursor-pointer select-none",
        "animate-[bt-toast-in_0.3s_ease-out]",
        variantClasses[variant]
      )}
    >
      {title && <p className="text-sm font-semibold">{title}</p>}
      {description && <p className="text-sm opacity-90">{description}</p>}
    </div>
  );
}

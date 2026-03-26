import { cn } from "@/lib/utils";
import type { ProgressProps } from "./progress.types";

const sizeClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-4",
};

const variantColors: Record<"default" | "success" | "warning" | "error", string> = {
  default: "var(--bt-accent)",
  success: "var(--bt-success)",
  warning: "var(--bt-warning)",
  error: "var(--bt-destructive)",
};

export function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  theme,
  className,
  style,
  ...props
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const pct = isIndeterminate ? undefined : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...(theme ? { "data-bt-theme": theme } : {})}
      style={style}
      className={cn(
        "w-full rounded-full bg-[var(--bt-border)] overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div
        style={{
          width: isIndeterminate ? "50%" : `${pct}%`,
          background: variantColors[variant],
          height: "100%",
          borderRadius: "inherit",
          transition: isIndeterminate ? undefined : "width 0.3s ease",
          animation: isIndeterminate
            ? "bt-progress-indeterminate 1.5s ease-in-out infinite"
            : undefined,
        }}
      />
    </div>
  );
}

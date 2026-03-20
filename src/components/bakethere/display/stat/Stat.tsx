import { cn } from "@/lib/utils";
import type { StatProps } from "./stat.types";

const trendColorMap: Record<string, string> = {
  up:      "var(--bt-success)",
  down:    "var(--bt-destructive)",
  neutral: "var(--bt-text-muted)",
};

export function Stat({
  value,
  label,
  delta,
  trend = "neutral",
  description,
  theme,
  className,
}: StatProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn("flex flex-col gap-1", className)}
    >
      <p className="text-sm font-medium text-[var(--bt-text-muted)]">{label}</p>
      <p className="text-3xl font-bold text-[var(--bt-text-primary)]">{value}</p>
      {delta && (
        <p className="text-sm font-medium" style={{ color: trendColorMap[trend] }}>
          {delta}
        </p>
      )}
      {description && (
        <p className="text-xs text-[var(--bt-text-muted)]">{description}</p>
      )}
    </div>
  );
}

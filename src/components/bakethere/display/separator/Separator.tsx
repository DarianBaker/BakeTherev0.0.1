import { cn } from "@/lib/utils";
import type { SeparatorProps } from "./separator.types";

export function Separator({
  orientation = "horizontal",
  theme,
  className,
  ...props
}: SeparatorProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        {...(theme ? { "data-bt-theme": theme } : {})}
        className={cn("inline-block w-px self-stretch bg-[var(--bt-border)]", className)}
        {...props}
      />
    );
  }

  return (
    <hr
      role="separator"
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn("border-0 border-t border-[var(--bt-border)] w-full", className)}
      {...props}
    />
  );
}

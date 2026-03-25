import { cn } from "@/lib/utils";
import type { LabelProps } from "./label.types";

export function Label({
  theme,
  required,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      data-bt-theme={theme}
      className={cn(
        "text-sm font-medium text-[var(--bt-text-primary)] leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-[var(--bt-destructive)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

import { cn } from "@/lib/utils";
import type { TooltipProps } from "./tooltip.types";

export function Tooltip({
  content,
  side = "top",
  delay = 0,
  theme,
  className,
  children,
}: TooltipProps) {
  return (
    <div
      className={cn("bt-tooltip-wrapper relative inline-block", className)}
      {...(theme ? { "data-bt-theme": theme } : {})}
    >
      {children}
      <div
        data-bt-tooltip=""
        data-side={side}
        role="tooltip"
        style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      >
        {content}
      </div>
    </div>
  );
}

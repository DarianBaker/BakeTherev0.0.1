"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { ToggleProps } from "./toggle.types";

const trackSizes = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-14",
};

const thumbSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-[18px] w-[18px]",
  lg: "h-[22px] w-[22px]",
};

const thumbTranslate = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-7",
};

export function Toggle({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  theme,
  className,
  id: externalId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: ToggleProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const generatedId = useId();
  const id = externalId ?? generatedId;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  }, [disabled, isChecked, controlledChecked, onCheckedChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div
      id={id}
      data-bt-theme={activeTheme}
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center rounded-[var(--bt-radius-full)] cursor-pointer",
        "transition-colors duration-200 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        trackSizes[size],
        isChecked
          ? "bg-[var(--bt-accent)]"
          : "bg-[var(--bt-bg-muted)] border border-[var(--bt-border)]",
        disabled && "opacity-[var(--bt-disabled-opacity)] pointer-events-none",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-0.5",
          "rounded-full bg-white shadow-sm",
          "transition-transform duration-200",
          thumbSizes[size],
          isChecked ? thumbTranslate[size] : "translate-x-0"
        )}
      />
    </div>
  );
}

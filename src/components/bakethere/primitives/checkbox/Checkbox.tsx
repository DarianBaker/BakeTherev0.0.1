"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { CheckboxProps } from "./checkbox.types";

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const checkSizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function Checkbox({
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
}: CheckboxProps) {
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
      if (e.key === " ") {
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
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--bt-radius-sm)] border",
        "cursor-pointer transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        sizeClasses[size],
        isChecked
          ? "bg-[var(--bt-accent)] border-[var(--bt-accent)]"
          : "bg-[var(--bt-bg-surface)] border-[var(--bt-border)]",
        disabled && "opacity-[var(--bt-disabled-opacity)] pointer-events-none",
        className
      )}
    >
      {isChecked && (
        <svg
          className={cn("text-[var(--bt-text-inverse)]", checkSizeClasses[size])}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}

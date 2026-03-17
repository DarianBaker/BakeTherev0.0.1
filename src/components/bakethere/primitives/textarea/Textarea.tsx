"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { TextareaProps } from "./textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      theme,
      autoResize = false,
      maxRows,
      disabled,
      className,
      onInput,
      rows = 3,
      style,
      ...props
    },
    ref
  ) => {
    const { theme: contextTheme } = useBakeThereTheme();
    const activeTheme = theme ?? contextTheme;

    // Fallback for 'line-height: normal' — approximates text-sm * 1.5
    const LINE_HEIGHT_FALLBACK = 21;

    const doResize = useCallback(
      (el: HTMLTextAreaElement) => {
        el.style.height = "auto";
        const lineHeight =
          parseInt(getComputedStyle(el).lineHeight) || LINE_HEIGHT_FALLBACK;
        const newHeight = maxRows
          ? Math.min(el.scrollHeight, maxRows * lineHeight)
          : el.scrollHeight;
        el.style.height = `${newHeight}px`;
      },
      [maxRows]
    );

    return (
      <div data-bt-theme={activeTheme} className="w-full">
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          onInput={(e) => {
            if (autoResize) doResize(e.currentTarget as HTMLTextAreaElement);
            onInput?.(e);
          }}
          style={
            autoResize
              ? { resize: "none", overflow: "hidden", ...style }
              : style
          }
          className={cn(
            "w-full rounded-[var(--bt-radius-md)] border bg-[var(--bt-bg-surface)]",
            "text-[var(--bt-text-primary)] placeholder:text-[var(--bt-text-muted)]",
            "px-3 py-2 text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
            "focus-visible:border-[var(--bt-border-focus)] border-[var(--bt-border)]",
            "disabled:opacity-[var(--bt-disabled-opacity)] disabled:pointer-events-none",
            !autoResize && "resize-y",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { InputProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      theme,
      label,
      helperText,
      errorText,
      leftAddon,
      rightAddon,
      state = "default",
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const { theme: contextTheme } = useBakeThereTheme();
    const activeTheme = theme ?? contextTheme;
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const isError = state === "error" || !!errorText;
    const isDisabled = state === "disabled" || disabled;

    return (
      <div data-bt-theme={activeTheme} className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--bt-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 text-[var(--bt-text-muted)]">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            disabled={isDisabled}
            aria-invalid={isError || undefined}
            aria-describedby={
              errorText ? `${id}-error` : helperText ? `${id}-helper` : undefined
            }
            className={cn(
              "w-full rounded-[var(--bt-radius-md)] border bg-[var(--bt-bg-surface)]",
              "text-[var(--bt-text-primary)] placeholder:text-[var(--bt-text-muted)]",
              "px-3 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
              "disabled:bg-[var(--bt-bg-muted)] disabled:text-[var(--bt-text-muted)] disabled:border-[var(--bt-border-muted)] disabled:pointer-events-none disabled:cursor-not-allowed",
              isError
                ? "border-[var(--bt-destructive)] focus-visible:ring-[var(--bt-destructive)]"
                : "border-[var(--bt-border)] focus-visible:border-[var(--bt-border-focus)]",
              leftAddon ? "pl-9" : "",
              rightAddon ? "pr-9" : "",
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 text-[var(--bt-text-muted)]">
              {rightAddon}
            </div>
          )}
        </div>
        {errorText && (
          <p id={`${id}-error`} className="text-xs text-[var(--bt-destructive)]" role="alert">
            {errorText}
          </p>
        )}
        {!errorText && helperText && (
          <p id={`${id}-helper`} className="text-xs text-[var(--bt-text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

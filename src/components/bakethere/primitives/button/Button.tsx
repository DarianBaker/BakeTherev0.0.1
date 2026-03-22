"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { ButtonProps } from "./button.types";

const variantClasses: Record<string, string> = {
  solid:
    "bg-[var(--bt-accent)] text-[var(--bt-text-inverse)] hover:bg-[var(--bt-accent-hover)] border border-transparent",
  outline:
    "bg-transparent text-[var(--bt-accent)] border border-[var(--bt-accent)] hover:bg-[var(--bt-accent-muted)]",
  ghost:
    "bg-transparent text-[var(--bt-text-primary)] border border-transparent hover:bg-[var(--bt-hover-bg)]",
  destructive:
    "bg-[var(--bt-destructive-bg)] text-[var(--bt-destructive)] border border-[var(--bt-destructive)] hover:opacity-80",
};

const sizeClasses: Record<string, string> = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "solid",
      size = "md",
      theme,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const { theme: contextTheme } = useBakeThereTheme();
    const activeTheme = theme ?? contextTheme;

    return (
      <button
        ref={ref}
        data-bt-theme={activeTheme}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-[var(--bt-radius-md)] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
          "disabled:opacity-[var(--bt-disabled-opacity)] disabled:pointer-events-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        ) : (
          <>
            {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
            {children}
            {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

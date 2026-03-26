"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from "./avatar.types";

const sizeClasses: Record<string, string> = {
  sm: "h-6 w-6 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-[72px] w-[72px] text-lg",
};

export function Avatar({ size = "md", theme, className, children, ...props }: AvatarProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn(
        "relative inline-flex items-center justify-center",
        "rounded-full overflow-hidden",
        "bg-[var(--bt-bg-muted)] text-[var(--bt-text-secondary)]",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "", className, onError, ...props }: AvatarImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      onError={(e) => {
        setErrored(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "font-medium text-[var(--bt-text-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

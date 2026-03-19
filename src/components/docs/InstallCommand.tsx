// src/components/docs/InstallCommand.tsx
"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface InstallCommandProps {
  componentName: string;
}

export function InstallCommand({ componentName }: InstallCommandProps) {
  const [copied, setCopied] = useState(false);
  const command = `npx bakethere add ${componentName}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }, [command]);

  return (
    <div className="flex items-center justify-between gap-3 rounded-[var(--bt-radius-md)] border border-[var(--bt-border)] bg-[var(--bt-bg-surface)] px-4 py-2.5 max-w-sm">
      <code className="text-sm font-mono text-[var(--bt-text-secondary)]">
        <span className="text-[var(--bt-text-muted)] select-none">$ </span>
        {command}
      </code>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied!" : "Copy install command"}
        className={cn(
          "shrink-0 rounded-[var(--bt-radius-sm)] p-1 transition-colors",
          "text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]"
        )}
      >
        {copied ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-7A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}

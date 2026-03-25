"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./CodeBlock";

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  code: string;
  className?: string;
}

export function ComponentPreview({
  title,
  description,
  children,
  code,
  className,
}: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available
    }
  }, [code]);

  return (
    <div className={cn("rounded-[var(--bt-radius-lg)] border border-[var(--bt-border)]", className)}>
      <div className="border-b border-[var(--bt-border)] px-4 pt-3 pb-0 flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--bt-text-primary)]">{title}</h3>
          {description && (
            <p className="text-xs text-[var(--bt-text-muted)] mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy snippet"}
            className="flex items-center gap-1 px-2 py-1 rounded-[var(--bt-radius-sm)] text-xs bg-[var(--bt-bg-muted)] text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)] transition-colors"
          >
            {copied ? (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M3 8L6.5 11.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M11 5V3.5A1.5 1.5 0 009.5 2h-7A1.5 1.5 0 001 3.5v7A1.5 1.5 0 002.5 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Copy
              </>
            )}
          </button>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "preview"
                  ? "border-[var(--bt-accent)] text-[var(--bt-accent)]"
                  : "border-transparent text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]"
              )}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "px-3 py-2 text-sm font-medium border-b-2 transition-colors",
                activeTab === "code"
                  ? "border-[var(--bt-accent)] text-[var(--bt-accent)]"
                  : "border-transparent text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]"
              )}
            >
              Code
            </button>
          </div>
        </div>
      </div>
      {activeTab === "preview" ? (
        <div className="p-8 bg-[var(--bt-bg-base)] flex items-center justify-center min-h-[120px]">
          {children}
        </div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  );
}

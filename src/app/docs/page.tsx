"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Badge } from "@/components/bakethere/display/badge";
import { Card, CardHeader, CardContent } from "@/components/bakethere/display/card";
import { Separator } from "@/components/bakethere/display/separator";
import { cn } from "@/lib/utils";

const COMPONENTS: { category: string; items: { label: string; href: string }[] }[] = [
  {
    category: "Primitives",
    items: [
      { label: "Text", href: "/docs/text" },
      { label: "Button", href: "/docs/button" },
      { label: "ButtonGroup", href: "/docs/button-group" },
      { label: "Input", href: "/docs/input" },
      { label: "Label", href: "/docs/label" },
      { label: "Checkbox", href: "/docs/checkbox" },
      { label: "Toggle", href: "/docs/toggle" },
      { label: "Textarea", href: "/docs/textarea" },
      { label: "Radio", href: "/docs/radio" },
      { label: "Slider", href: "/docs/slider" },
      { label: "Select", href: "/docs/select" },
    ],
  },
  {
    category: "Display",
    items: [
      { label: "Card", href: "/docs/card" },
      { label: "Badge", href: "/docs/badge" },
      { label: "Avatar", href: "/docs/avatar" },
      { label: "Separator", href: "/docs/separator" },
      { label: "Skeleton", href: "/docs/skeleton" },
      { label: "Stat", href: "/docs/stat" },
      { label: "Empty", href: "/docs/empty" },
      { label: "Alert", href: "/docs/alert" },
      { label: "Progress", href: "/docs/progress" },
    ],
  },
  {
    category: "Overlay",
    items: [
      { label: "Dialog", href: "/docs/dialog" },
      { label: "Tooltip", href: "/docs/tooltip" },
      { label: "Toast", href: "/docs/toast" },
      { label: "Popover", href: "/docs/popover" },
    ],
  },
  {
    category: "Navigation",
    items: [
      { label: "Dropdown Menu", href: "/docs/dropdown-menu" },
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Breadcrumb", href: "/docs/breadcrumb" },
    ],
  },
  {
    category: "Data",
    items: [{ label: "Table", href: "/docs/table" }],
  },
  {
    category: "Layout",
    items: [
      { label: "Sidebar", href: "/docs/sidebar" },
      { label: "Header", href: "/docs/header" },
    ],
  },
];

const QUICK_STEPS = [
  {
    step: "01",
    title: "Init your project",
    description: "Set up config and copy shared infrastructure files.",
    code: "npx bakethere init",
  },
  {
    step: "02",
    title: "Add a component",
    description: "Copy any component directly into your project.",
    code: "npx bakethere add button",
  },
  {
    step: "03",
    title: "Use it",
    description: "Import from your own codebase — you own the source.",
    code: 'import { Button } from "@/components/ui/Button"',
  },
];

export default function DocsHomePage() {
  const [copied, setCopied] = useState(false);
  const heroCommand = "npx bakethere add button";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(heroCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }, [heroCommand]);

  return (
    <div className="p-8 max-w-4xl space-y-12">
      {/* Hero */}
      <div className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-[var(--bt-text-primary)] leading-tight">
            Copy-paste React components.<br />
            <span className="text-[var(--bt-accent)]">Own the code.</span>
          </h1>
          <p className="text-lg text-[var(--bt-text-secondary)] max-w-xl">
            BakeThere is a component library you copy into your project — not install as a dependency.
            Pick the components you need, drop them in, and customize freely.
          </p>
        </div>

        {/* Hero install command */}
        <div className="flex items-center gap-3 rounded-[var(--bt-radius-md)] border border-[var(--bt-border)] bg-[var(--bt-bg-surface)] px-4 py-3 max-w-sm">
          <code className="flex-1 text-sm font-mono text-[var(--bt-text-secondary)]">
            <span className="text-[var(--bt-text-muted)] select-none">$ </span>
            {heroCommand}
          </code>
          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? "Copied!" : "Copy command"}
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

        {/* CTAs — use plain styled Links (Button does NOT support asChild) */}
        <div className="flex items-center gap-3">
          <Link
            href="/docs/button"
            className="inline-flex items-center justify-center font-medium rounded-[var(--bt-radius-md)] h-10 px-4 text-sm bg-[var(--bt-accent)] text-[var(--bt-text-inverse)] hover:bg-[var(--bt-accent-hover)] transition-colors"
          >
            Browse Components
          </Link>
          <Link
            href="/docs/cli"
            className="inline-flex items-center justify-center font-medium rounded-[var(--bt-radius-md)] h-10 px-4 text-sm border border-[var(--bt-border)] text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] transition-colors"
          >
            CLI Reference
          </Link>
        </div>
      </div>

      <Separator />

      {/* Quick Start */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">Quick Start</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {QUICK_STEPS.map(({ step, title, description, code }) => (
            <Card key={step}>
              <CardHeader>
                <div className="text-2xl font-bold text-[var(--bt-accent)] opacity-60">{step}</div>
                <h3 className="font-semibold text-[var(--bt-text-primary)]">{title}</h3>
                <p className="text-sm text-[var(--bt-text-secondary)]">{description}</p>
              </CardHeader>
              <CardContent>
                <code className="block text-xs font-mono text-[var(--bt-text-muted)] bg-[var(--bt-bg-muted)] rounded-[var(--bt-radius-sm)] px-3 py-2 break-all">
                  {code}
                </code>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* Component Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">
          31 components across 6 categories
        </h2>
        <div className="space-y-6">
          {COMPONENTS.map(({ category, items }) => (
            <div key={category}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--bt-text-muted)] mb-3">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map(({ label, href }) => (
                  <Link key={href} href={href}>
                    <Badge variant="outline" size="md" className="cursor-pointer hover:bg-[var(--bt-hover-bg)] transition-colors">
                      {label}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

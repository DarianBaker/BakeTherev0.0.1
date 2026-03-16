"use client";

import { useState } from "react";
import { useThemeProps } from "@/components/bakethere/provider";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { CodeBlock } from "@/components/docs/CodeBlock";
import type { BtTheme } from "@/components/bakethere/types";

const useThemePropsCode = `// useThemeProps() - apply BakeThere theme to custom components
import { useThemeProps } from "@/components/bakethere/provider";

function MyCustomCard({ children }) {
  const themeProps = useThemeProps();
  // themeProps = { 'data-bt-theme': 'dark' } (current active theme)

  return (
    <div
      {...themeProps}
      className="bg-[var(--bt-bg-surface)] border border-[var(--bt-border)]
                 rounded-[var(--bt-radius-lg)] p-6 shadow-[var(--bt-shadow-sm)]"
    >
      {children}
    </div>
  );
}

// By spreading themeProps onto your element, it becomes a CSS variable scope root.
// The element inherits the correct --bt-* tokens for the current theme.
// Switch themes via ThemeSwitcher or BakeThereProvider and your component updates automatically.`;

function CustomCard({ children }: { children: React.ReactNode }) {
  const themeProps = useThemeProps();
  return (
    <div
      {...themeProps}
      className="bg-[var(--bt-bg-surface)] border border-[var(--bt-border)] rounded-[var(--bt-radius-lg)] p-6 shadow-[var(--bt-shadow-sm)] w-72"
    >
      {children}
    </div>
  );
}

export default function ThemingPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Theming</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          Use <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">useThemeProps()</code> to
          apply the current BakeThere theme to your own custom components.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">How it works</h2>
        <p className="text-[var(--bt-text-secondary)] text-sm">
          The <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">useThemeProps()</code> hook
          returns <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">{'{ "data-bt-theme": "dark" }'}</code> (or warm/plain).
          Spread it onto any element to make that element a CSS variable scope root - it will inherit the correct{" "}
          <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">--bt-*</code> tokens for the active theme.
        </p>
      </div>

      <ComponentPreview title="Custom component using useThemeProps()" code={useThemePropsCode}>
        <CustomCard>
          <h3 className="font-semibold text-[var(--bt-text-primary)] mb-1">Custom Card</h3>
          <p className="text-sm text-[var(--bt-text-secondary)]">
            This card is not a BakeThere component - it uses{" "}
            <code className="text-xs font-mono text-[var(--bt-accent)]">useThemeProps()</code> to inherit the current theme.
          </p>
          <p className="text-xs text-[var(--bt-text-muted)] mt-3">
            Try switching themes with the switcher in the header.
          </p>
        </CustomCard>
      </ComponentPreview>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">Copyable snippet</h2>
        <CodeBlock code={useThemePropsCode} />
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">BakeThereProvider API</h2>
        <p className="text-[var(--bt-text-secondary)] text-sm">
          Wrap your app (or a section of it) in <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">BakeThereProvider</code>:
        </p>
        <CodeBlock code={`// Global theme (uncontrolled, default "dark"):
<BakeThereProvider defaultTheme="dark">
  <App />
</BakeThereProvider>

// Controlled theme:
const [theme, setTheme] = useState<BtTheme>("dark");
<BakeThereProvider theme={theme}>
  <App />
</BakeThereProvider>

// Per-component override (re-roots CSS variable scope):
<Button theme="plain">Always plain</Button>`} />
      </div>
    </div>
  );
}

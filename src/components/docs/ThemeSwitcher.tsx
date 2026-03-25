"use client";

import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "@/components/bakethere/provider";
import type { BtTheme } from "@/components/bakethere/types";

const themes: { label: string; value: BtTheme }[] = [
  { label: "Dark", value: "dark" },
  { label: "Warm", value: "warm" },
  { label: "Plain", value: "plain" },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useBakeThereTheme();

  return (
    <div className="flex items-center gap-1 rounded-[var(--bt-radius-md)] bg-[var(--bt-bg-muted)] p-1">
      {themes.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => setTheme(value)}
          className={cn(
            "px-3 py-1 rounded-[var(--bt-radius-sm)] text-sm font-medium transition-colors",
            theme === value
              ? "bg-[var(--bt-bg-elevated)] text-[var(--bt-text-primary)] ring-1 ring-[var(--bt-border-focus)]"
              : "text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

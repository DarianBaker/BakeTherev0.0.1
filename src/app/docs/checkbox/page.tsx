"use client";

import { useState } from "react";
import { Checkbox } from "@/components/bakethere/primitives/checkbox";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";

const checkboxCode = `// checkbox.types.ts
export type CheckboxSize = "sm" | "md" | "lg";
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: CheckboxSize;
  theme?: BtTheme;
  className?: string;
}

// Checkbox.tsx
"use client";
import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";

export function Checkbox({ checked: controlledChecked, defaultChecked = false, onCheckedChange, disabled = false, size = "md", theme, className }: CheckboxProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;
  const toggle = () => { if (disabled) return; const next = !isChecked; if (controlledChecked === undefined) setInternalChecked(next); onCheckedChange?.(next); };
  return (
    <div role="checkbox" aria-checked={isChecked} tabIndex={disabled ? -1 : 0}
      onClick={toggle} onKeyDown={(e) => e.key === " " && (e.preventDefault(), toggle())}
      className={cn("inline-flex items-center justify-center rounded-[var(--bt-radius-sm)] border cursor-pointer transition-colors select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        isChecked ? "bg-[var(--bt-accent)] border-[var(--bt-accent)]" : "bg-[var(--bt-bg-surface)] border-[var(--bt-border)]",
        { sm: "h-4 w-4", md: "h-5 w-5", lg: "h-6 w-6" }[size],
        disabled && "opacity-[var(--bt-disabled-opacity)] pointer-events-none", className)}>
      {isChecked && <svg viewBox="0 0 12 12" fill="none" className="text-[var(--bt-text-inverse)] h-3 w-3"><path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
    </div>
  );
}`;

const propsData: PropRow[] = [
  { prop: "checked", type: "boolean", defaultValue: "-", description: "Controlled checked state" },
  { prop: "defaultChecked", type: "boolean", defaultValue: "false", description: "Initial state for uncontrolled usage" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultValue: "-", description: "Callback when checked state changes" },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size of the checkbox" },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the theme" },
];

export default function CheckboxPage() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Checkbox</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          An accessible checkbox with controlled/uncontrolled support, three sizes, and keyboard navigation.
        </p>
      </div>

      <ComponentPreview title="Sizes" code={checkboxCode}>
        <VariantGrid>
          <Checkbox size="sm" defaultChecked />
          <Checkbox size="md" defaultChecked />
          <Checkbox size="lg" defaultChecked />
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Controlled" code={checkboxCode}>
        <div className="flex items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <span className="text-sm text-[var(--bt-text-secondary)]">
            {checked ? "Checked" : "Unchecked"}
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={checkboxCode}>
        <VariantGrid>
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

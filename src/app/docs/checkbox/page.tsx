"use client";

import { useState } from "react";
import { Checkbox } from "@/components/bakethere/primitives/checkbox";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { CheckboxProps } from "./checkbox.types";

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

const checkSizeClasses = {
  sm: "h-2.5 w-2.5",
  md: "h-3 w-3",
  lg: "h-4 w-4",
};

export function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  size = "md",
  theme,
  className,
  id: externalId,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
}: CheckboxProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const generatedId = useId();
  const id = externalId ?? generatedId;

  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const toggle = useCallback(() => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) setInternalChecked(next);
    onCheckedChange?.(next);
  }, [disabled, isChecked, controlledChecked, onCheckedChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === " ") {
        e.preventDefault();
        toggle();
      }
    },
    [toggle]
  );

  return (
    <div
      id={id}
      data-bt-theme={activeTheme}
      role="checkbox"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--bt-radius-sm)] border",
        "cursor-pointer transition-colors select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        sizeClasses[size],
        isChecked
          ? "bg-[var(--bt-accent)] border-[var(--bt-accent)]"
          : "bg-[var(--bt-bg-surface)] border-[var(--bt-border)]",
        disabled && "opacity-[var(--bt-disabled-opacity)] pointer-events-none",
        className
      )}
    >
      {isChecked && (
        <svg
          className={cn("text-[var(--bt-text-inverse)]", checkSizeClasses[size])}
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 6L5 9L10 3"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
}
`;

const sizesCode = `<Checkbox size="sm" defaultChecked />
<Checkbox size="md" defaultChecked />
<Checkbox size="lg" defaultChecked />`;

const controlledCode = `const [checked, setChecked] = useState(false);

<div className="flex items-center gap-3">
  <Checkbox checked={checked} onCheckedChange={setChecked} />
  <span>{checked ? "Checked" : "Unchecked"}</span>
</div>`;

const disabledCheckboxCode = `<Checkbox disabled />
<Checkbox disabled defaultChecked />`;

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

      <ComponentPreview title="Sizes" code={sizesCode}>
        <VariantGrid>
          <Checkbox size="sm" defaultChecked />
          <Checkbox size="md" defaultChecked />
          <Checkbox size="lg" defaultChecked />
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Controlled" code={controlledCode}>
        <div className="flex items-center gap-3">
          <Checkbox checked={checked} onCheckedChange={setChecked} />
          <span className="text-sm text-[var(--bt-text-secondary)]">
            {checked ? "Checked" : "Unchecked"}
          </span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={disabledCheckboxCode}>
        <VariantGrid>
          <Checkbox disabled />
          <Checkbox disabled defaultChecked />
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Checkbox.tsx" />
    </div>
  );
}

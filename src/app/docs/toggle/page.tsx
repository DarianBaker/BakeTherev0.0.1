"use client";

import { useState } from "react";
import { Toggle } from "@/components/bakethere/primitives/toggle";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import { useState, useCallback, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { ToggleProps } from "./toggle.types";

const trackSizes = {
  sm: "h-5 w-9",
  md: "h-6 w-11",
  lg: "h-7 w-14",
};

const thumbSizes = {
  sm: "h-3.5 w-3.5",
  md: "h-[18px] w-[18px]",
  lg: "h-[22px] w-[22px]",
};

const thumbTranslate = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-7",
};

export function Toggle({
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
}: ToggleProps) {
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
      if (e.key === " " || e.key === "Enter") {
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
      role="switch"
      aria-checked={isChecked}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative inline-flex items-center rounded-[var(--bt-radius-full)] cursor-pointer",
        "transition-colors duration-200 select-none",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        trackSizes[size],
        isChecked
          ? "bg-[var(--bt-accent)]"
          : "bg-[var(--bt-bg-muted)] border border-[var(--bt-border)]",
        disabled && "opacity-[var(--bt-disabled-opacity)] pointer-events-none",
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-1/2 -translate-y-1/2 left-0.5",
          "rounded-full bg-white shadow-sm",
          "transition-transform duration-200",
          thumbSizes[size],
          isChecked ? thumbTranslate[size] : "translate-x-0"
        )}
      />
    </div>
  );
}
`;

const toggleSizesCode = `<Toggle size="sm" defaultChecked />
<Toggle size="md" defaultChecked />
<Toggle size="lg" defaultChecked />`;

const toggleControlledCode = `const [on, setOn] = useState(false);

<div className="flex items-center gap-3">
  <Toggle checked={on} onCheckedChange={setOn} />
  <span>{on ? "On" : "Off"}</span>
</div>`;

const toggleDisabledCode = `<Toggle disabled />
<Toggle disabled defaultChecked />`;

const propsData: PropRow[] = [
  { prop: "checked", type: "boolean", defaultValue: "-", description: "Controlled on/off state" },
  { prop: "defaultChecked", type: "boolean", defaultValue: "false", description: "Initial state for uncontrolled usage" },
  { prop: "onCheckedChange", type: "(checked: boolean) => void", defaultValue: "-", description: "Callback when state changes" },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Size of the toggle switch" },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables interaction" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the theme" },
];

export default function TogglePage() {
  const [on, setOn] = useState(false);
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Toggle</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A sliding switch toggle with controlled/uncontrolled support and three sizes.
        </p>
      </div>

      <ComponentPreview title="Sizes" code={toggleSizesCode}>
        <VariantGrid>
          <Toggle size="sm" defaultChecked />
          <Toggle size="md" defaultChecked />
          <Toggle size="lg" defaultChecked />
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Controlled" code={toggleControlledCode}>
        <div className="flex items-center gap-3">
          <Toggle checked={on} onCheckedChange={setOn} />
          <span className="text-sm text-[var(--bt-text-secondary)]">{on ? "On" : "Off"}</span>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={toggleDisabledCode}>
        <VariantGrid>
          <Toggle disabled />
          <Toggle disabled defaultChecked />
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Toggle.tsx" />
    </div>
  );
}

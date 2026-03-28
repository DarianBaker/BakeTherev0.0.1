"use client";

import { Input } from "@/components/bakethere/primitives/input";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { InputProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      theme,
      label,
      helperText,
      errorText,
      leftAddon,
      rightAddon,
      state = "default",
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const { theme: contextTheme } = useBakeThereTheme();
    const activeTheme = theme ?? contextTheme;
    const generatedId = useId();
    const id = externalId ?? generatedId;

    const isError = state === "error" || !!errorText;
    const isDisabled = state === "disabled" || disabled;

    return (
      <div data-bt-theme={activeTheme} className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-[var(--bt-text-primary)]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftAddon && (
            <div className="absolute left-3 text-[var(--bt-text-muted)]">
              {leftAddon}
            </div>
          )}
          <input
            ref={ref}
            id={id}
            disabled={isDisabled}
            aria-invalid={isError || undefined}
            aria-describedby={
              errorText ? \`\${id}-error\` : helperText ? \`\${id}-helper\` : undefined
            }
            className={cn(
              "w-full rounded-[var(--bt-radius-md)] border bg-[var(--bt-bg-surface)]",
              "text-[var(--bt-text-primary)] placeholder:text-[var(--bt-text-muted)]",
              "px-3 py-2 text-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
              "disabled:bg-[var(--bt-bg-muted)] disabled:text-[var(--bt-text-muted)] disabled:border-[var(--bt-border-muted)] disabled:pointer-events-none disabled:cursor-not-allowed",
              isError
                ? "border-[var(--bt-destructive)] focus-visible:ring-[var(--bt-destructive)]"
                : "border-[var(--bt-border)] focus-visible:border-[var(--bt-border-focus)]",
              leftAddon ? "pl-9" : "",
              rightAddon ? "pr-9" : "",
              className
            )}
            {...props}
          />
          {rightAddon && (
            <div className="absolute right-3 text-[var(--bt-text-muted)]">
              {rightAddon}
            </div>
          )}
        </div>
        {errorText && (
          <p id={\`\${id}-error\`} className="text-xs text-[var(--bt-destructive)]" role="alert">
            {errorText}
          </p>
        )}
        {!errorText && helperText && (
          <p id={\`\${id}-helper\`} className="text-xs text-[var(--bt-text-muted)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
`;

const defaultCode = `<Input placeholder="Enter text..." label="Username" helperText="Must be at least 3 characters" />`;

const errorCode = `<Input placeholder="Enter email..." label="Email" errorText="Please enter a valid email address" />`;

const disabledCode = `<Input placeholder="Disabled input" label="Disabled" state="disabled" />`;

const propsData: PropRow[] = [
  { prop: "label", type: "string", defaultValue: "-", description: "Label displayed above the input" },
  { prop: "helperText", type: "string", defaultValue: "-", description: "Helper text shown below the input" },
  { prop: "errorText", type: "string", defaultValue: "-", description: "Error message - also sets error styling" },
  { prop: "state", type: '"default" | "error" | "disabled"', defaultValue: '"default"', description: "Controls the visual state" },
  { prop: "leftAddon", type: "ReactNode", defaultValue: "-", description: "Content overlaid on the left inside the input" },
  { prop: "rightAddon", type: "ReactNode", defaultValue: "-", description: "Content overlaid on the right inside the input" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the BakeThereProvider theme" },
];

export default function InputPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Input</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A text input with built-in label, helper text, error state, and optional left/right add-ons.
        </p>
      </div>

      <ComponentPreview title="Default" code={defaultCode}>
        <div className="w-80">
          <Input placeholder="Enter text..." label="Username" helperText="Must be at least 3 characters" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Error State" code={errorCode}>
        <div className="w-80">
          <Input placeholder="Enter email..." label="Email" errorText="Please enter a valid email address" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={disabledCode}>
        <div className="w-80">
          <Input placeholder="Disabled input" label="Disabled" state="disabled" />
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Input.tsx" />
    </div>
  );
}

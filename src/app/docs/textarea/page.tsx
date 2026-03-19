"use client";

import { Textarea } from "@/components/bakethere/primitives/textarea";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import { forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { TextareaProps } from "./textarea.types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      theme,
      autoResize = false,
      maxRows,
      disabled,
      className,
      onInput,
      rows = 3,
      style,
      ...props
    },
    ref
  ) => {
    const { theme: contextTheme } = useBakeThereTheme();
    const activeTheme = theme ?? contextTheme;

    // Fallback for 'line-height: normal' — approximates text-sm * 1.5
    const LINE_HEIGHT_FALLBACK = 21;

    const doResize = useCallback(
      (el: HTMLTextAreaElement) => {
        el.style.height = "auto";
        const lineHeight =
          parseInt(getComputedStyle(el).lineHeight) || LINE_HEIGHT_FALLBACK;
        const newHeight = maxRows
          ? Math.min(el.scrollHeight, maxRows * lineHeight)
          : el.scrollHeight;
        el.style.height = \`\${newHeight}px\`;
      },
      [maxRows]
    );

    return (
      <div data-bt-theme={activeTheme} className="w-full">
        <textarea
          ref={ref}
          rows={rows}
          disabled={disabled}
          onInput={(e) => {
            if (autoResize) doResize(e.currentTarget as HTMLTextAreaElement);
            onInput?.(e);
          }}
          style={
            autoResize
              ? { resize: "none", overflow: "hidden", ...style }
              : style
          }
          className={cn(
            "w-full rounded-[var(--bt-radius-md)] border bg-[var(--bt-bg-surface)]",
            "text-[var(--bt-text-primary)] placeholder:text-[var(--bt-text-muted)]",
            "px-3 py-2 text-sm transition-colors",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
            "focus-visible:border-[var(--bt-border-focus)] border-[var(--bt-border)]",
            "disabled:bg-[var(--bt-bg-muted)] disabled:text-[var(--bt-text-muted)] disabled:border-[var(--bt-border-muted)] disabled:pointer-events-none disabled:cursor-not-allowed",
            !autoResize && "resize-y",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
`;

const defaultCode = `<Textarea placeholder="Type something..." />`;

const autoResizeCode = `<Textarea
  placeholder="Start typing - this grows as you type..."
  autoResize
/>`;

const autoResizeMaxRowsCode = `<Textarea
  placeholder="Grows up to 5 rows, then scrolls..."
  autoResize
  maxRows={5}
/>`;

const disabledCode = `<Textarea placeholder="Disabled textarea" disabled />`;

const propsData: PropRow[] = [
  {
    prop: "autoResize",
    type: "boolean",
    defaultValue: "false",
    description: "When true, the textarea grows in height to fit its content. resize is disabled.",
  },
  {
    prop: "maxRows",
    type: "number",
    defaultValue: "-",
    description: "Maximum number of rows before the textarea stops growing (requires autoResize).",
  },
  {
    prop: "rows",
    type: "number",
    defaultValue: "3",
    description: "Initial number of visible text rows.",
  },
  {
    prop: "disabled",
    type: "boolean",
    defaultValue: "false",
    description: "Disables the textarea.",
  },
  {
    prop: "theme",
    type: '"dark" | "warm" | "plain"',
    defaultValue: "context",
    description: "Overrides the inherited theme.",
  },
];

export default function TextareaPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Textarea</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A multi-line text input styled to match Input, with optional auto-resize and row clamping.
        </p>
      </div>

      <ComponentPreview title="Default" code={defaultCode}>
        <Textarea placeholder="Type something..." />
      </ComponentPreview>

      <ComponentPreview title="Auto Resize" code={autoResizeCode}>
        <Textarea
          placeholder="Start typing - this grows as you type..."
          autoResize
        />
      </ComponentPreview>

      <ComponentPreview title="Auto Resize with maxRows" code={autoResizeMaxRowsCode}>
        <Textarea
          placeholder="Grows up to 5 rows, then scrolls..."
          autoResize
          maxRows={5}
        />
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={disabledCode}>
        <Textarea placeholder="Disabled textarea" disabled />
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Textarea.tsx" />
    </div>
  );
}

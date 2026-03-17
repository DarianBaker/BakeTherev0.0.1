"use client";

import { Textarea } from "@/components/bakethere/primitives/textarea";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

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
    </div>
  );
}

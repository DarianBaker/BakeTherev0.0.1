"use client";

import { Label } from "@/components/bakethere/primitives/label";
import { Input } from "@/components/bakethere/primitives/input";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `import { cn } from "@/lib/utils";
import type { LabelProps } from "./label.types";

export function Label({
  theme,
  required,
  className,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      data-bt-theme={theme}
      className={cn(
        "text-sm font-medium text-[var(--bt-text-primary)] leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-[var(--bt-destructive)]" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}
`;

const labelCode = `// label.types.ts
import type { LabelHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  theme?: BtTheme;
  required?: boolean;
}

// Label.tsx
// No "use client" - server-component safe
import { cn } from "@/lib/utils";
import type { LabelProps } from "./label.types";

export function Label({ theme, required, className, children, ...props }: LabelProps) {
  return (
    <label
      data-bt-theme={theme}
      className={cn(
        "text-sm font-medium text-[var(--bt-text-primary)] leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-[var(--bt-destructive)]" aria-hidden="true">*</span>}
    </label>
  );
}`;

const propsData: PropRow[] = [
  { prop: "required", type: "boolean", defaultValue: "false", description: "Appends a red asterisk (*) to indicate a required field" },
  { prop: "htmlFor", type: "string", defaultValue: "-", description: "Associates the label with an input by ID" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme for this label" },
];

export default function LabelPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Label</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A semantic label component for form fields. Server-component safe - no client-side JavaScript required.
        </p>
      </div>

      <ComponentPreview title="Basic Label" code={labelCode}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-name">Full name</Label>
          <Input id="demo-name" placeholder="John Doe" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Required Field" code={labelCode}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="demo-email" required>Email address</Label>
          <Input id="demo-email" type="email" placeholder="you@example.com" />
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Label.tsx" />
    </div>
  );
}

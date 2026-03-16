"use client";

import { Separator } from "@/components/bakethere/display/separator";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const separatorCode = `// Separator.tsx (server-component safe)
import { cn } from "@/lib/utils";

export function Separator({ orientation = "horizontal", theme, className, ...props }) {
  if (orientation === "vertical") {
    return <div role="separator" aria-orientation="vertical" {...(theme ? { "data-bt-theme": theme } : {})} className={cn("inline-block w-px self-stretch bg-[var(--bt-border)]", className)} {...props} />;
  }
  return <hr role="separator" {...(theme ? { "data-bt-theme": theme } : {})} className={cn("border-0 border-t border-[var(--bt-border)] w-full", className)} {...props} />;
}`;

const propsData: PropRow[] = [
  { prop: "orientation", type: '"horizontal" | "vertical"', defaultValue: '"horizontal"', description: "Orientation of the divider line" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme" },
];

export default function SeparatorPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Separator</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A simple visual divider supporting horizontal and vertical orientations. Server-component safe.
        </p>
      </div>

      <ComponentPreview title="Horizontal" code={separatorCode}>
        <div className="w-64 space-y-3">
          <p className="text-sm text-[var(--bt-text-secondary)]">Above</p>
          <Separator />
          <p className="text-sm text-[var(--bt-text-secondary)]">Below</p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Vertical" code={separatorCode}>
        <div className="flex items-center gap-4 h-8">
          <span className="text-sm text-[var(--bt-text-secondary)]">Left</span>
          <Separator orientation="vertical" />
          <span className="text-sm text-[var(--bt-text-secondary)]">Right</span>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

"use client";

import { Stat } from "@/components/bakethere/display/stat";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const basicCode = `<Stat label="Total Revenue" value="$48,295" />`;

const trendCode = `<Stat label="Monthly Sales" value="$12,430" delta="+12.5%" trend="up" />
<Stat label="Churn Rate" value="2.4%" delta="-3.2%" trend="down" />
<Stat label="Page Views" value="84,210" delta="0%" trend="neutral" />`;

const descriptionCode = `<Stat
  label="Active Users"
  value="1,284"
  delta="+8%"
  trend="up"
  description="vs last month"
/>`;

const propsData: PropRow[] = [
  { prop: "value", type: "string | number", defaultValue: "-", description: "The primary metric value to display (required)" },
  { prop: "label", type: "string", defaultValue: "-", description: "Small label above the value describing the metric (required)" },
  { prop: "delta", type: "string", defaultValue: "-", description: "Change indicator, e.g. \"+12%\" or \"-3\". Renders below the value." },
  { prop: "trend", type: '"up" | "down" | "neutral"', defaultValue: '"neutral"', description: "Colors the delta text using --bt-success, --bt-destructive, or --bt-text-muted" },
  { prop: "description", type: "string", defaultValue: "-", description: "Tiny sub-label below the delta, e.g. \"vs last month\"" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the inherited theme for this component" },
  { prop: "className", type: "string", defaultValue: "-", description: "Additional Tailwind or custom classes" },
];

const SOURCE = `import { cn } from "@/lib/utils";
import type { StatProps } from "./stat.types";

const trendColorMap: Record<string, string> = {
  up:      "var(--bt-success)",
  down:    "var(--bt-destructive)",
  neutral: "var(--bt-text-muted)",
};

export function Stat({
  value,
  label,
  delta,
  trend = "neutral",
  description,
  theme,
  className,
}: StatProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn("flex flex-col gap-1", className)}
    >
      <p className="text-sm font-medium text-[var(--bt-text-muted)]">{label}</p>
      <p className="text-3xl font-bold text-[var(--bt-text-primary)]">{value}</p>
      {delta && (
        <p className="text-sm font-medium" style={{ color: trendColorMap[trend] }}>
          {delta}
        </p>
      )}
      {description && (
        <p className="text-xs text-[var(--bt-text-muted)]">{description}</p>
      )}
    </div>
  );
}`;

export default function StatPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Stat</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A metric display component with optional trend coloring. Server-component safe.
        </p>
      </div>

      <InstallCommand componentName="stat" />

      <ComponentPreview title="Basic Stat" description="Label and value only" code={basicCode}>
        <Stat label="Total Revenue" value="$48,295" />
      </ComponentPreview>

      <ComponentPreview title="With Trend" description="Delta colored by trend: up (success), down (destructive), neutral (muted)" code={trendCode}>
        <div className="flex flex-wrap gap-8">
          <Stat label="Monthly Sales" value="$12,430" delta="+12.5%" trend="up" />
          <Stat label="Churn Rate" value="2.4%" delta="-3.2%" trend="down" />
          <Stat label="Page Views" value="84,210" delta="0%" trend="neutral" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="With Description" description="Sub-label below the delta for context" code={descriptionCode}>
        <Stat
          label="Active Users"
          value="1,284"
          delta="+8%"
          trend="up"
          description="vs last month"
        />
      </ComponentPreview>

      <ComponentPreview title="Dashboard Row" description="Multiple stats in a grid layout" code={trendCode}>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <Stat label="Revenue" value="$48,295" delta="+9.1%" trend="up" description="vs last month" />
          <Stat label="Orders" value="1,832" delta="+4.3%" trend="up" description="vs last month" />
          <Stat label="Refunds" value="23" delta="+2" trend="down" description="vs last month" />
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Stat.tsx" />
    </div>
  );
}

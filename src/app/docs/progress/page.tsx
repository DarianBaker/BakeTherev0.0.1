"use client";

import { Progress } from "@/components/bakethere/display/progress";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `import { cn } from "@/lib/utils";
import type { ProgressProps } from "./progress.types";

const sizeClasses = {
  sm: "h-1",
  md: "h-2",
  lg: "h-4",
};

const variantColors: Record<"default" | "success" | "warning" | "error", string> = {
  default: "var(--bt-accent)",
  success: "var(--bt-success)",
  warning: "var(--bt-warning)",
  error: "var(--bt-destructive)",
};

export function Progress({
  value,
  max = 100,
  size = "md",
  variant = "default",
  theme,
  className,
  style,
  ...props
}: ProgressProps) {
  const isIndeterminate = value === undefined;
  const pct = isIndeterminate ? undefined : Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      role="progressbar"
      aria-valuenow={isIndeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      {...(theme ? { "data-bt-theme": theme } : {})}
      style={style}
      className={cn(
        "w-full rounded-full bg-[var(--bt-border)] overflow-hidden",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      <div
        style={{
          width: isIndeterminate ? "50%" : \`\${pct}%\`,
          background: variantColors[variant],
          height: "100%",
          borderRadius: "inherit",
          transition: isIndeterminate ? undefined : "width 0.3s ease",
          animation: isIndeterminate
            ? "bt-progress-indeterminate 1.5s ease-in-out infinite"
            : undefined,
        }}
      />
    </div>
  );
}
`;

const determinateCode = `<Progress value={72} aria-label="Loading" />`;
const indeterminateCode = `<Progress aria-label="Loading" />`;
const sizesCode = `<Progress value={60} size="sm" aria-label="Small" />
<Progress value={60} size="md" aria-label="Medium" />
<Progress value={60} size="lg" aria-label="Large" />`;
const variantsCode = `<Progress value={80} variant="default" aria-label="Default" />
<Progress value={80} variant="success" aria-label="Success" />
<Progress value={80} variant="warning" aria-label="Warning" />
<Progress value={80} variant="error" aria-label="Error" />`;

const propsData: PropRow[] = [
  { prop: "value", type: "number", defaultValue: "—", description: "Progress value (0–max). Omit for indeterminate." },
  { prop: "max", type: "number", defaultValue: "100", description: "Maximum value" },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Track height" },
  { prop: "variant", type: '"default" | "success" | "warning" | "error"', defaultValue: '"default"', description: "Bar color" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override" },
];

export default function ProgressPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Progress</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A horizontal progress bar for known loading states. Use Skeleton for unknown-duration loading.
        </p>
      </div>

      <ComponentPreview title="Determinate" code={determinateCode}>
        <div className="p-4 w-full">
          <Progress value={72} aria-label="Loading" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Indeterminate" code={indeterminateCode}>
        <div className="p-4 w-full">
          <Progress aria-label="Loading" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sizes" code={sizesCode}>
        <div className="p-4 space-y-4 w-full">
          <Progress value={60} size="sm" aria-label="Small" />
          <Progress value={60} size="md" aria-label="Medium" />
          <Progress value={60} size="lg" aria-label="Large" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Variants" code={variantsCode}>
        <div className="p-4 space-y-4 w-full">
          <Progress value={80} variant="default" aria-label="Default" />
          <Progress value={80} variant="success" aria-label="Success" />
          <Progress value={80} variant="warning" aria-label="Warning" />
          <Progress value={80} variant="error" aria-label="Error" />
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Progress.tsx" />
    </div>
  );
}

"use client";

import { Badge } from "@/components/bakethere/display/badge";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `import { cn } from "@/lib/utils";
import type { BadgeProps } from "./badge.types";

const variantClasses: Record<string, string> = {
  default: "bg-[var(--bt-accent-muted)] text-[var(--bt-accent)] border-transparent",
  secondary: "bg-[var(--bt-bg-muted)] text-[var(--bt-text-secondary)] border-transparent",
  destructive: "bg-[var(--bt-destructive-bg)] text-[var(--bt-destructive)] border-transparent",
  outline: "bg-transparent text-[var(--bt-text-primary)] border-[var(--bt-border)]",
};

const sizeClasses: Record<string, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-0.5 text-sm",
};

export function Badge({
  variant = "default",
  size = "sm",
  theme,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn(
        "inline-flex items-center font-medium border rounded-[var(--bt-radius-full)]",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
`;

const variantsCode = `<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>`;

const sizesCode = `<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>`;

const propsData: PropRow[] = [
  { prop: "variant", type: '"default" | "secondary" | "destructive" | "outline"', defaultValue: '"default"', description: "Visual style variant" },
  { prop: "size", type: '"sm" | "md"', defaultValue: '"sm"', description: "Size of the badge" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme" },
];

export default function BadgePage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Badge</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A small status or label indicator with multiple visual variants. Server-component safe.
        </p>
      </div>

      <ComponentPreview title="Variants" code={variantsCode}>
        <VariantGrid>
          <Badge variant="default">Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Sizes" code={sizesCode}>
        <VariantGrid>
          <Badge size="sm">Small</Badge>
          <Badge size="md">Medium</Badge>
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Badge.tsx" />
    </div>
  );
}

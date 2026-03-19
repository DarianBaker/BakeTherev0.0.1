"use client";

import { Skeleton } from "@/components/bakethere/display/skeleton";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const lineCode = `<Skeleton />
<Skeleton />
<Skeleton width="75%" />`;

const rectCode = `<Skeleton shape="rect" width={200} height={120} />`;

const circleCode = `<Skeleton shape="circle" width={48} height={48} />
<Skeleton shape="circle" width={64} height={64} />`;

const composedCode = `<div className="flex items-center gap-3">
  <Skeleton shape="circle" width={40} height={40} />
  <div className="flex-1 space-y-2">
    <Skeleton width="60%" />
    <Skeleton width="40%" />
  </div>
</div>
<Skeleton shape="rect" height={120} />`;

const propsData: PropRow[] = [
  { prop: "shape", type: '"line" | "rect" | "circle"', defaultValue: '"line"', description: "Shape of the skeleton placeholder" },
  { prop: "width", type: "string | number", defaultValue: "-", description: "CSS width. Numbers are converted to px." },
  { prop: "height", type: "string | number", defaultValue: "-", description: "CSS height. Numbers are converted to px." },
  { prop: "className", type: "string", defaultValue: "-", description: "Additional Tailwind or custom classes" },
];

import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `import { cn } from "@/lib/utils";
import type { SkeletonProps } from "./skeleton.types";

const shapeClasses: Record<string, string> = {
  line:   "h-4 w-full rounded-full",
  rect:   "rounded-[var(--bt-radius-md)]",
  circle: "rounded-full",
};

export function Skeleton({ shape = "line", width, height, className }: SkeletonProps) {
  return (
    <div
      style={{
        width:  width  ? (typeof width  === "number" ? \`\${width}px\`  : width)  : undefined,
        height: height ? (typeof height === "number" ? \`\${height}px\` : height) : undefined,
        background: "linear-gradient(90deg, var(--bt-skeleton-base) 25%, var(--bt-skeleton-highlight) 50%, var(--bt-skeleton-base) 75%)",
        backgroundSize: "200% 100%",
        animation: "bt-shimmer 1.5s ease-in-out infinite",
      }}
      className={cn(shapeClasses[shape], className)}
    />
  );
}`;

export default function SkeletonPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Skeleton</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          Animated shimmer placeholders for loading states. Server-component safe.
        </p>
      </div>

      <InstallCommand componentName="skeleton" />

      <ComponentPreview title="Line (default)" description="Full-width line skeletons for text content" code={lineCode}>
        <div className="w-full max-w-sm space-y-3">
          <Skeleton />
          <Skeleton />
          <Skeleton width="75%" />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Rect" description="Rectangular skeleton for images or cards" code={rectCode}>
        <Skeleton shape="rect" width={200} height={120} />
      </ComponentPreview>

      <ComponentPreview title="Circle" description="Circular skeleton for avatars or icons" code={circleCode}>
        <div className="flex items-center gap-4">
          <Skeleton shape="circle" width={48} height={48} />
          <Skeleton shape="circle" width={64} height={64} />
        </div>
      </ComponentPreview>

      <ComponentPreview title="Composed" description="Combine shapes to mock a real content layout" code={composedCode}>
        <div className="w-full max-w-sm space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton shape="circle" width={40} height={40} />
            <div className="flex-1 space-y-2">
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </div>
          </div>
          <Skeleton shape="rect" height={120} />
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Skeleton.tsx" />
    </div>
  );
}

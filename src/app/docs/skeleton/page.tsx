"use client";

import { Skeleton } from "@/components/bakethere/display/skeleton";
import { Card } from "@/components/bakethere/display/card";
import { Avatar, AvatarFallback } from "@/components/bakethere/display/avatar";
import { Badge } from "@/components/bakethere/display/badge";
import { Button } from "@/components/bakethere/primitives/button";
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

const wrapCode = `<Skeleton>
  <Card className="p-4 flex items-start gap-3 w-72">
    <Avatar size="md"><AvatarFallback>AB</AvatarFallback></Avatar>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold">Alex Brown</h3>
        <Badge>Admin</Badge>
      </div>
      <p className="text-xs mt-0.5">alex@example.com</p>
      <Button size="sm" className="mt-3">View Profile</Button>
    </div>
  </Card>
</Skeleton>`;

const propsData: PropRow[] = [
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "When provided, enters wrap mode — renders the children but replaces all visual content with the shimmer animation. Layout and structure are fully preserved." },
  { prop: "shape", type: '"line" | "rect" | "circle"', defaultValue: '"line"', description: "Shape of the standalone skeleton placeholder. Ignored in wrap mode." },
  { prop: "width", type: "string | number", defaultValue: "-", description: "CSS width. Numbers are converted to px." },
  { prop: "height", type: "string | number", defaultValue: "-", description: "CSS height. Numbers are converted to px." },
  { prop: "className", type: "string", defaultValue: "-", description: "Additional Tailwind or custom classes" },
];

const SOURCE = `import { cn } from "@/lib/utils";
import type { SkeletonProps } from "./skeleton.types";

const shapeClasses: Record<string, string> = {
  line:   "h-4 w-full rounded-full",
  rect:   "rounded-[var(--bt-radius-md)]",
  circle: "rounded-full",
};

export function Skeleton({ shape = "line", width, height, className, children }: SkeletonProps) {
  const sizeStyle = {
    width:  width  ? (typeof width  === "number" ? \`\${width}px\`  : width)  : undefined,
    height: height ? (typeof height === "number" ? \`\${height}px\` : height) : undefined,
  };

  if (children !== undefined) {
    return (
      <div className={cn("bt-skeleton-wrap", className)} style={sizeStyle}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        ...sizeStyle,
        background: "linear-gradient(90deg, var(--bt-bg-muted) 25%, var(--bt-bg-elevated) 50%, var(--bt-bg-muted) 75%)",
        backgroundSize: "200% 100%",
        animation: "bt-shimmer 1.5s ease-in-out infinite",
      }}
      className={cn(shapeClasses[shape], className)}
    />
  );
}

// Also add to globals.css:
// .bt-skeleton-wrap { pointer-events: none; user-select: none; }
// .bt-skeleton-wrap * { color: transparent !important; border-color: transparent !important; ... }
// .bt-skeleton-wrap *:not(:has(*)) { background: shimmer gradient !important; animation: bt-shimmer ... }`;

export default function SkeletonPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Skeleton</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          Animated shimmer placeholders for loading states. Server-component safe.
        </p>
      </div>

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

      <ComponentPreview title="Wrap Mode" description="Pass any component as children — Skeleton skeletonizes its full tree automatically" code={wrapCode}>
        <Skeleton>
          <Card className="p-4 flex items-start gap-3 w-72">
            <Avatar size="md"><AvatarFallback>AB</AvatarFallback></Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold">Alex Brown</h3>
                <Badge>Admin</Badge>
              </div>
              <p className="text-xs mt-0.5">alex@example.com</p>
              <Button size="sm" className="mt-3">View Profile</Button>
            </div>
          </Card>
        </Skeleton>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Skeleton.tsx" />
    </div>
  );
}

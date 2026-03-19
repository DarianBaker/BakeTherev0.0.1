"use client";

import { Tooltip } from "@/components/bakethere/overlay/tooltip";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `import { cn } from "@/lib/utils";
import type { TooltipProps } from "./tooltip.types";

export function Tooltip({
  content,
  side = "top",
  delay = 0,
  theme,
  className,
  children,
}: TooltipProps) {
  return (
    <div
      className={cn("bt-tooltip-wrapper relative inline-block", className)}
      {...(theme ? { "data-bt-theme": theme } : {})}
    >
      {children}
      <div
        data-bt-tooltip=""
        data-side={side}
        role="tooltip"
        style={delay ? { transitionDelay: \`\${delay}ms\` } : undefined}
      >
        {content}
      </div>
    </div>
  );
}
`;

const placementsCode = `<Tooltip content="Tooltip on top" side="top">
  <Button variant="outline" size="sm">Top</Button>
</Tooltip>
<Tooltip content="Tooltip on bottom" side="bottom">
  <Button variant="outline" size="sm">Bottom</Button>
</Tooltip>
<Tooltip content="Tooltip on left" side="left">
  <Button variant="outline" size="sm">Left</Button>
</Tooltip>
<Tooltip content="Tooltip on right" side="right">
  <Button variant="outline" size="sm">Right</Button>
</Tooltip>`;

const delayCode = `<Tooltip content="Appears after 500ms" side="top" delay={500}>
  <Button variant="outline" size="sm">Hover (500ms delay)</Button>
</Tooltip>`;

const propsData: PropRow[] = [
  { prop: "content", type: "ReactNode", defaultValue: "-", description: "The tooltip content to display" },
  { prop: "side", type: '"top" | "bottom" | "left" | "right"', defaultValue: '"top"', description: "Which side to show the tooltip" },
  { prop: "delay", type: "number", defaultValue: "0", description: "Delay in ms before the tooltip appears" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme" },
];

export default function TooltipPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Tooltip</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A CSS-only hover/focus tooltip with four placement options. No JavaScript positioning - zero runtime cost.
        </p>
      </div>

      <InstallCommand componentName="tooltip" />

      <ComponentPreview title="Placements" code={placementsCode}>
        <VariantGrid className="justify-center gap-6 py-8">
          <Tooltip content="Tooltip on top" side="top">
            <Button variant="outline" size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button variant="outline" size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <Button variant="outline" size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <Button variant="outline" size="sm">Right</Button>
          </Tooltip>
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="With Delay" code={delayCode}>
        <Tooltip content="Appears after 500ms" side="top" delay={500}>
          <Button variant="outline" size="sm">Hover (500ms delay)</Button>
        </Tooltip>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Tooltip.tsx" />
    </div>
  );
}

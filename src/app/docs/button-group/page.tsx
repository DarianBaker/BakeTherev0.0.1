"use client";

import { Button } from "@/components/bakethere/primitives/button";
import { ButtonGroup } from "@/components/bakethere/primitives/button-group";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `import { cn } from "@/lib/utils";
import type { ButtonGroupProps } from "./button-group.types";

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div className={cn("bt-button-group", className)} {...props}>
      {children}
    </div>
  );
}`;

const basicCode = `<ButtonGroup>
  <Button variant="outline">Cut</Button>
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Paste</Button>
</ButtonGroup>`;

const solidCode = `<ButtonGroup>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>`;

const ghostCode = `<ButtonGroup>
  <Button variant="ghost" size="icon">B</Button>
  <Button variant="ghost" size="icon">I</Button>
  <Button variant="ghost" size="icon">U</Button>
</ButtonGroup>`;

const propsData: PropRow[] = [
  { prop: "className", type: "string", defaultValue: "-", description: "Additional Tailwind or custom classes" },
  { prop: "children", type: "ReactNode", defaultValue: "-", description: "<Button> elements to group" },
];

export default function ButtonGroupPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">ButtonGroup</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A visual wrapper that connects multiple Button elements into a single cohesive control — collapsed borders, shared outer radius, horizontal layout.
        </p>
      </div>

      <ComponentPreview title="Outline" code={basicCode}>
        <ButtonGroup>
          <Button variant="outline">Cut</Button>
          <Button variant="outline">Copy</Button>
          <Button variant="outline">Paste</Button>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview title="Solid" code={solidCode}>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </ComponentPreview>

      <ComponentPreview title="Ghost Icon" code={ghostCode}>
        <ButtonGroup>
          <Button variant="ghost" size="icon">B</Button>
          <Button variant="ghost" size="icon">I</Button>
          <Button variant="ghost" size="icon">U</Button>
        </ButtonGroup>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="ButtonGroup.tsx" />
    </div>
  );
}

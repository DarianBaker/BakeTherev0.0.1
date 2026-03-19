"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/bakethere/navigation/accordion";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const singleCode = `<Accordion type="single" defaultValue="item-1">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is BakeThere?</AccordionTrigger>
    <AccordionContent>
      BakeThere is a production-quality copy-paste React component library built with
      Tailwind CSS v4, React 19, and TypeScript 5.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it free?</AccordionTrigger>
    <AccordionContent>
      Yes. BakeThere is open source and free to use in personal and commercial projects.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>
      Copy the component files into your project and import them directly - no package
      installation required.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const multipleCode = `<Accordion type="multiple">
  <AccordionItem value="item-1">
    <AccordionTrigger>What is BakeThere?</AccordionTrigger>
    <AccordionContent>
      BakeThere is a production-quality copy-paste React component library built with
      Tailwind CSS v4, React 19, and TypeScript 5.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it free?</AccordionTrigger>
    <AccordionContent>
      Yes. BakeThere is open source and free to use in personal and commercial projects.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>How do I install it?</AccordionTrigger>
    <AccordionContent>
      Copy the component files into your project and import them directly - no package
      installation required.
    </AccordionContent>
  </AccordionItem>
</Accordion>`;

const accordionPropsData: PropRow[] = [
  { prop: "type", type: '"single" | "multiple"', defaultValue: '"single"', description: "Controls whether one or multiple items can be open simultaneously." },
  { prop: "value", type: "string | string[]", defaultValue: "-", description: "Controlled open value(s)." },
  { prop: "defaultValue", type: "string | string[]", defaultValue: "-", description: "Initial open value(s) for uncontrolled usage." },
  { prop: "onValueChange", type: "(value: string | string[]) => void", defaultValue: "-", description: "Callback when open state changes." },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the inherited theme." },
];

const itemPropsData: PropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Unique identifier for this item (required)." },
];

const SOURCE = `"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./accordion.types";

// ... (see full source at src/components/bakethere/navigation/accordion/Accordion.tsx)

export function Accordion({ type = "single", value: controlledValue, defaultValue, onValueChange, theme, className, children, ...props }: AccordionProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [internalOpen, setInternalOpen] = useState<string[]>(
    defaultValue ? (Array.isArray(defaultValue) ? defaultValue : [defaultValue]) : []
  );
  const openValues = controlledValue !== undefined
    ? (Array.isArray(controlledValue) ? controlledValue : [controlledValue])
    : internalOpen;
  const toggle = useCallback((val: string) => {
    const next = type === "single"
      ? (openValues.includes(val) ? [] : [val])
      : (openValues.includes(val) ? openValues.filter(v => v !== val) : [...openValues, val]);
    if (controlledValue === undefined) setInternalOpen(next);
    onValueChange?.(type === "single" ? (next[0] ?? "") : next);
  }, [openValues, type, controlledValue, onValueChange]);
  return (
    <AccordionContext.Provider value={{ openValues, toggle, type }}>
      <div data-bt-theme={activeTheme} className={cn("divide-y divide-[var(--bt-border)] border border-[var(--bt-border)] rounded-[var(--bt-radius-md)]", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}`;

export default function AccordionPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Accordion</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A compound accordion with single and multiple open modes, animated height via the CSS
          grid-rows trick, and controlled/uncontrolled support.
        </p>
      </div>

      <InstallCommand componentName="accordion" />

      <ComponentPreview title="Single (default)" description="Only one item open at a time" code={singleCode}>
        <Accordion type="single" defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is BakeThere?</AccordionTrigger>
            <AccordionContent>
              BakeThere is a production-quality copy-paste React component library built with
              Tailwind CSS v4, React 19, and TypeScript 5.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>
              Yes. BakeThere is open source and free to use in personal and commercial projects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I install it?</AccordionTrigger>
            <AccordionContent>
              Copy the component files into your project and import them directly - no package
              installation required.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentPreview>

      <ComponentPreview title="Multiple" description="Any number of items can be open simultaneously" code={multipleCode}>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is BakeThere?</AccordionTrigger>
            <AccordionContent>
              BakeThere is a production-quality copy-paste React component library built with
              Tailwind CSS v4, React 19, and TypeScript 5.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>
              Yes. BakeThere is open source and free to use in personal and commercial projects.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I install it?</AccordionTrigger>
            <AccordionContent>
              Copy the component files into your project and import them directly - no package
              installation required.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Accordion Props</h2>
        <PropsTable rows={accordionPropsData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">AccordionItem Props</h2>
        <PropsTable rows={itemPropsData} />
      </div>

      <SourceSection source={SOURCE} filename="Accordion.tsx" />
    </div>
  );
}

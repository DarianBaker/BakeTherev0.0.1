"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  AccordionProps,
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./accordion.types";

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
  type: "single" | "multiple";
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion sub-components must be used inside <Accordion>");
  return ctx;
}

interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error("AccordionTrigger/AccordionContent must be used inside <AccordionItem>");
  return ctx;
}

export function Accordion({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  theme,
  className,
  children,
  ...props
}: AccordionProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;

  const getInitial = (): string[] => {
    if (defaultValue) return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    return [];
  };

  const [internalOpen, setInternalOpen] = useState<string[]>(getInitial);
  const openValues =
    controlledValue !== undefined
      ? Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue]
      : internalOpen;

  const toggle = useCallback(
    (val: string) => {
      let next: string[];
      if (type === "single") {
        next = openValues.includes(val) ? [] : [val];
      } else {
        next = openValues.includes(val)
          ? openValues.filter((v) => v !== val)
          : [...openValues, val];
      }
      if (controlledValue === undefined) setInternalOpen(next);
      onValueChange?.(type === "single" ? (next[0] ?? "") : next);
    },
    [openValues, type, controlledValue, onValueChange]
  );

  return (
    <AccordionContext.Provider value={{ openValues, toggle, type }}>
      <div
        data-bt-theme={activeTheme}
        className={cn(
          "divide-y divide-[var(--bt-border)] border border-[var(--bt-border)] rounded-[var(--bt-radius-md)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  const { openValues } = useAccordionContext();
  const isOpen = openValues.includes(value);
  return (
    <AccordionItemContext.Provider value={{ value, isOpen }}>
      <div className={cn("overflow-hidden", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

export function AccordionTrigger({ className, children, ...props }: AccordionTriggerProps) {
  const { toggle } = useAccordionContext();
  const { value, isOpen } = useAccordionItemContext();
  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(value)}
      className={cn(
        "flex w-full items-center justify-between px-4 py-3 text-sm font-medium",
        "text-[var(--bt-text-primary)] hover:bg-[var(--bt-bg-muted)]",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)] focus-visible:ring-inset",
        className
      )}
      {...props}
    >
      {children}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}

export function AccordionContent({ className, children, ...props }: AccordionContentProps) {
  const { isOpen } = useAccordionItemContext();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: isOpen ? "1fr" : "0fr",
        transition: "grid-template-rows 0.2s ease",
      }}
    >
      <div style={{ overflow: "hidden" }}>
        <div
          className={cn("px-4 pb-3 pt-0 text-sm text-[var(--bt-text-secondary)]", className)}
          {...props}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

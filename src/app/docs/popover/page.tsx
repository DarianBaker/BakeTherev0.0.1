"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/bakethere/overlay/popover";
import { Button } from "@/components/bakethere/primitives/button";
import { Input } from "@/components/bakethere/primitives/input";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
  type ReactElement,
} from "react";
import React from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
} from "./popover.types";

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentId: string;
  activeTheme: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error("Popover sub-components must be used inside <Popover>");
  return ctx;
}

export function Popover({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  theme,
  children,
}: PopoverProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const triggerRef = useRef<HTMLElement | null>(null);
  const contentId = useId();

  const handleOpenChange = useCallback(
    (val: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [controlledOpen, onOpenChange]
  );

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      const content = document.getElementById(contentId);
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !content?.contains(e.target as Node)
      ) {
        handleOpenChange(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleOpenChange(false);
    }
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, contentId, handleOpenChange]);

  return (
    <PopoverContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerRef, contentId, activeTheme }}>
      {children}
    </PopoverContext.Provider>
  );
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, onOpenChange, triggerRef, contentId } = usePopoverContext();
  const childProps = children.props as { onClick?: (e: React.MouseEvent) => void };
  return React.cloneElement(children as ReactElement<Record<string, unknown>>, {
    ref: triggerRef,
    onClick: (e: React.MouseEvent) => {
      onOpenChange(!open);
      childProps.onClick?.(e);
    },
    "aria-expanded": open,
    "aria-haspopup": "dialog",
    "aria-controls": contentId,
  });
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 8,
  children,
  className,
  style,
  ...props
}: PopoverContentProps) {
  const { open, triggerRef, contentId, activeTheme } = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }

    function recalculate() {
      if (!triggerRef.current || !contentRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const cw = contentRef.current.offsetWidth;
      const ch = contentRef.current.offsetHeight;

      let top = 0;
      let left = 0;

      if (side === "bottom") {
        top = rect.bottom + sideOffset;
      } else if (side === "top") {
        top = rect.top - ch - sideOffset;
      } else if (side === "right") {
        left = rect.right + sideOffset;
      } else {
        left = rect.left - cw - sideOffset;
      }

      if (side === "bottom" || side === "top") {
        if (align === "start") left = rect.left;
        else if (align === "center") left = rect.left + rect.width / 2 - cw / 2;
        else left = rect.right - cw;
      } else {
        if (align === "start") top = rect.top;
        else if (align === "center") top = rect.top + rect.height / 2 - ch / 2;
        else top = rect.bottom - ch;
      }

      setPos({ top, left });
    }

    recalculate();
    window.addEventListener("scroll", recalculate, { passive: true, capture: true });
    window.addEventListener("resize", recalculate, { passive: true });
    return () => {
      window.removeEventListener("scroll", recalculate, { capture: true });
      window.removeEventListener("resize", recalculate);
    };
  }, [open, side, align, sideOffset]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="dialog"
      data-bt-theme={activeTheme}
      style={{
        position: "fixed",
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        zIndex: 60,
        visibility: pos ? "visible" : "hidden",
        pointerEvents: pos ? "auto" : "none",
        animation: "bt-fade-in 0.15s ease-out",
        ...style,
      }}
      className={cn(
        "bg-[var(--bt-bg-surface)] border border-[var(--bt-border)]",
        "shadow-[var(--bt-shadow-md)] rounded-[var(--bt-radius-md)] p-3",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
`;

const basicCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p className="text-sm text-[var(--bt-text-primary)]">This is the popover content.</p>
  </PopoverContent>
</Popover>`;

const sidesCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline" size="sm">Bottom (default)</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom">
    <p className="text-sm">Bottom</p>
  </PopoverContent>
</Popover>
<Popover>
  <PopoverTrigger>
    <Button variant="outline" size="sm">Top</Button>
  </PopoverTrigger>
  <PopoverContent side="top">
    <p className="text-sm">Top</p>
  </PopoverContent>
</Popover>`;

const withFormCode = `<Popover>
  <PopoverTrigger>
    <Button variant="outline">Edit name</Button>
  </PopoverTrigger>
  <PopoverContent className="w-64">
    <div className="space-y-3">
      <p className="text-sm font-medium text-[var(--bt-text-primary)]">Edit your name</p>
      <Input placeholder="Enter name..." />
      <Button size="sm" className="w-full">Save</Button>
    </div>
  </PopoverContent>
</Popover>`;

const propsData: PropRow[] = [
  { prop: "open", type: "boolean", defaultValue: "—", description: "Controlled open state" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultValue: "—", description: "Callback when open changes" },
  { prop: "defaultOpen", type: "boolean", defaultValue: "false", description: "Initial open state (uncontrolled)" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override" },
];

const contentPropsData: PropRow[] = [
  { prop: "side", type: '"top" | "bottom" | "left" | "right"', defaultValue: '"bottom"', description: "Which side the panel appears on" },
  { prop: "align", type: '"start" | "center" | "end"', defaultValue: '"center"', description: "Alignment along the side axis" },
  { prop: "sideOffset", type: "number", defaultValue: "8", description: "Gap between trigger and panel (px)" },
];

export default function PopoverPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Popover</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A click-triggered floating panel. More generic than DropdownMenu — accepts any content.
        </p>
      </div>

      <ComponentPreview title="Basic" code={basicCode}>
        <div className="p-8 flex justify-center">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Open popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm text-[var(--bt-text-primary)]">This is the popover content.</p>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sides" code={sidesCode}>
        <div className="p-8 flex justify-center gap-4 flex-wrap">
          {(["bottom", "top", "left", "right"] as const).map((s) => (
            <Popover key={s}>
              <PopoverTrigger>
                <Button variant="outline" size="sm">{s}</Button>
              </PopoverTrigger>
              <PopoverContent side={s}>
                <p className="text-sm text-[var(--bt-text-primary)] capitalize">{s}</p>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </ComponentPreview>

      <ComponentPreview title="With Form Content" code={withFormCode}>
        <div className="p-8 flex justify-center">
          <Popover>
            <PopoverTrigger>
              <Button variant="outline">Edit name</Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <p className="text-sm font-medium text-[var(--bt-text-primary)]">Edit your name</p>
                <Input placeholder="Enter name..." />
                <Button size="sm" className="w-full">Save</Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Popover)</h2>
        <PropsTable rows={propsData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (PopoverContent)</h2>
        <PropsTable rows={contentPropsData} />
      </div>

      <SourceSection source={SOURCE} filename="Popover.tsx" />
    </div>
  );
}

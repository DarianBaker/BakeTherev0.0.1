"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/bakethere/navigation/dropdown-menu";
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
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuLabelProps,
} from "./dropdown-menu.types";

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error("DropdownMenu sub-components must be used inside <DropdownMenu>");
  return ctx;
}

export function DropdownMenu({ children, theme }: DropdownMenuProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} data-bt-theme={activeTheme} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({ children, onClick, className, ...props }: DropdownMenuTriggerProps) {
  const { open, setOpen } = useDropdownContext();
  return (
    <button
      type="button"
      aria-haspopup="true"
      aria-expanded={open}
      onClick={(e) => {
        setOpen(!open);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-[var(--bt-radius-md)]",
        "border border-[var(--bt-border)] text-[var(--bt-text-primary)] bg-transparent",
        "hover:bg-[var(--bt-hover-bg)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        "disabled:opacity-[var(--bt-disabled-opacity)] disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  align = "start",
  className,
  ...props
}: DropdownMenuContentProps) {
  const { open } = useDropdownContext();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const items = contentRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="menuitem"]:not(:disabled)'
    );
    if (!items || items.length === 0) return;
    const focused = document.activeElement;
    const idx = Array.from(items).indexOf(focused as HTMLButtonElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(idx + 1) % items.length].focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length].focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      // Find and focus the trigger
      const trigger = contentRef.current?.closest(".relative")?.querySelector<HTMLButtonElement>(
        '[aria-haspopup="true"]'
      );
      trigger?.focus();
    }
  }, []);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      role="menu"
      aria-orientation="vertical"
      onKeyDown={handleKeyDown}
      className={cn(
        "absolute z-50 mt-1 min-w-[160px] rounded-[var(--bt-radius-md)]",
        "border border-[var(--bt-border)] bg-[var(--bt-bg-elevated)]",
        "shadow-[var(--bt-shadow-md)] py-1",
        "animate-[bt-dropdown-in_0.15s_ease-out]",
        align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuItem({
  children,
  destructive = false,
  onClick,
  className,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdownContext();
  return (
    <button
      type="button"
      role="menuitem"
      onClick={(e) => {
        onClick?.(e);
        setOpen(false);
      }}
      className={cn(
        "w-full flex items-center px-3 py-2 text-sm text-left",
        "focus-visible:outline-none focus-visible:bg-[var(--bt-hover-bg)]",
        "hover:bg-[var(--bt-hover-bg)] transition-colors",
        destructive
          ? "text-[var(--bt-destructive)] hover:bg-[var(--bt-destructive-bg)]"
          : "text-[var(--bt-text-primary)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DropdownMenuSeparator({ className, ...props }: DropdownMenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("my-1 h-px bg-[var(--bt-border)]", className)}
      {...props}
    />
  );
}

export function DropdownMenuLabel({ children, className, ...props }: DropdownMenuLabelProps) {
  return (
    <div
      className={cn("px-3 py-1.5 text-xs font-semibold text-[var(--bt-text-muted)]", className)}
      {...props}
    >
      {children}
    </div>
  );
}
`;

const dropdownCode = `// DropdownMenu.tsx ("use client")
"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

export function DropdownMenu({ children, theme }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  // Click-outside closes via mousedown listener
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (!containerRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} data-bt-theme={activeTheme} className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}
// DropdownMenuTrigger: aria-haspopup + aria-expanded
// DropdownMenuContent: role="menu", Arrow key navigation, Escape closes
// DropdownMenuItem: role="menuitem", auto-closes on click
// DropdownMenuSeparator: role="separator"
// DropdownMenuLabel: section heading`;

const propsData: PropRow[] = [
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override for the dropdown" },
  { prop: "align", type: '"start" | "end" | "center"', defaultValue: '"start"', description: "Alignment of DropdownMenuContent" },
  { prop: "destructive", type: "boolean", defaultValue: "false", description: "DropdownMenuItem: apply destructive styling" },
];

export default function DropdownMenuPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Dropdown Menu</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A compound dropdown menu with keyboard navigation (Arrow keys, Escape), click-outside close, and ARIA roles.
        </p>
      </div>

      <ComponentPreview title="Basic Dropdown" code={dropdownCode}>
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="DropdownMenu.tsx" />
    </div>
  );
}

"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./tabs.types";

interface TabsContextValue {
  activeValue: string;
  setActiveValue: (value: string) => void;
  variant: "line" | "pill";
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs sub-components must be used inside <Tabs>");
  return ctx;
}

export function Tabs({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  variant = "line",
  theme,
  className,
  children,
}: TabsProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = controlledValue ?? internalValue;

  const setActiveValue = useCallback(
    (val: string) => {
      if (controlledValue === undefined) setInternalValue(val);
      onValueChange?.(val);
    },
    [controlledValue, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, variant }}>
      <div data-bt-theme={activeTheme} className={cn("flex flex-col gap-4", className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children, ...props }: TabsListProps) {
  const { variant } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
    const triggers = listRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="tab"]:not([disabled])'
    );
    if (!triggers || triggers.length === 0) return;
    const idx = Array.from(triggers).indexOf(document.activeElement as HTMLButtonElement);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      triggers[(idx + 1) % triggers.length].focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      triggers[(idx - 1 + triggers.length) % triggers.length].focus();
    }
  }, []);

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-orientation="horizontal"
      onKeyDown={handleKeyDown}
      className={cn(
        "flex items-center",
        variant === "pill"
          ? "gap-1 bg-[var(--bt-bg-muted)] p-1 rounded-[var(--bt-radius-md)]"
          : "border-b border-[var(--bt-border)] gap-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  disabled = false,
  className,
  children,
  onClick,
  ...props
}: TabsTriggerProps) {
  const { activeValue, setActiveValue, variant } = useTabsContext();
  const isActive = activeValue === value;

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      id={`tab-${value}`}
      disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      onClick={(e) => {
        setActiveValue(value);
        (onClick as React.MouseEventHandler<HTMLButtonElement>)?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center px-3 py-2 text-sm font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        "disabled:opacity-[var(--bt-disabled-opacity)] disabled:pointer-events-none",
        variant === "pill"
          ? cn(
              "rounded-[var(--bt-radius-sm)]",
              isActive
                ? "bg-[var(--bt-bg-elevated)] text-[var(--bt-text-primary)] shadow-[var(--bt-shadow-sm)]"
                : "text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]"
            )
          : cn(
              "border-b-2 rounded-none -mb-px",
              isActive
                ? "border-[var(--bt-accent)] text-[var(--bt-accent)]"
                : "border-transparent text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]"
            ),
        className
      )}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { activeValue } = useTabsContext();
  if (activeValue !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      className={cn("focus-visible:outline-none animate-[bt-fade-in_0.15s_ease-out]", className)}
      {...props}
    >
      {children}
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/bakethere/primitives/select";
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
  useLayoutEffect,
  useCallback,
  useId,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  SelectProps,
  SelectTriggerProps,
  SelectContentProps,
  SelectItemProps,
  SelectGroupProps,
  SelectLabelProps,
} from "./select.types";

interface SelectItem {
  value: string;
  label: string;
}

interface SelectContextValue {
  value: string | undefined;
  selectedLabel: string | undefined;
  onSelect: (value: string, label: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentId: string;
  highlightedIndex: number | null;
  setHighlightedIndex: (i: number | null) => void;
  items: SelectItem[];
  registerItem: (value: string, label: string) => void;
  unregisterItem: (value: string) => void;
  disabled: boolean;
}

const SelectContext = createContext<SelectContextValue | null>(null);

function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error("Select sub-components must be used inside <Select>");
  return ctx;
}

export function Select({
  value: controlledValue,
  onValueChange,
  defaultValue,
  disabled = false,
  theme,
  children,
}: SelectProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [internalValue, setInternalValue] = useState<string | undefined>(defaultValue);
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const [selectedLabel, setSelectedLabel] = useState<string | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  const [items, setItems] = useState<SelectItem[]>([]);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentId = useId();

  const handleSelect = useCallback(
    (val: string, label: string) => {
      if (controlledValue === undefined) setInternalValue(val);
      setSelectedLabel(label);
      onValueChange?.(val);
      setOpen(false);
      setHighlightedIndex(null);
      setTimeout(() => triggerRef.current?.focus(), 0);
    },
    [controlledValue, onValueChange]
  );

  const handleOpenChange = useCallback(
    (val: boolean) => {
      setOpen(val);
      if (val) {
        const idx = items.findIndex((i) => i.value === value);
        setHighlightedIndex(idx >= 0 ? idx : null);
      } else {
        setHighlightedIndex(null);
      }
    },
    [items, value]
  );

  const registerItem = useCallback((itemValue: string, label: string) => {
    setItems((prev) => [...prev, { value: itemValue, label }]);
  }, []);

  const unregisterItem = useCallback((itemValue: string) => {
    setItems((prev) => prev.filter((i) => i.value !== itemValue));
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      const content = document.getElementById(contentId);
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        !content?.contains(e.target as Node)
      ) {
        setOpen(false);
        setHighlightedIndex(null);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [open, contentId]);

  return (
    <SelectContext.Provider
      value={{
        value,
        selectedLabel,
        onSelect: handleSelect,
        open,
        onOpenChange: handleOpenChange,
        triggerRef,
        contentId,
        highlightedIndex,
        setHighlightedIndex,
        items,
        registerItem,
        unregisterItem,
        disabled,
      }}
    >
      <div data-bt-theme={activeTheme}>
        {children}
      </div>
    </SelectContext.Provider>

  );
}

export function SelectTrigger({ placeholder = "Select...", className, ...props }: SelectTriggerProps) {
  const {
    selectedLabel,
    onSelect,
    open,
    onOpenChange,
    triggerRef,
    contentId,
    highlightedIndex,
    setHighlightedIndex,
    items,
    disabled,
  } = useSelectContext();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;
    const count = items.length;

    if (!open) {
      if (
        e.key === " " ||
        e.key === "Enter" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowUp"
      ) {
        e.preventDefault();
        onOpenChange(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex(
        highlightedIndex === null ? 0 : (highlightedIndex + 1) % count
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex(
        highlightedIndex === null
          ? count - 1
          : (highlightedIndex - 1 + count) % count
      );
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (highlightedIndex !== null && items[highlightedIndex]) {
        onSelect(items[highlightedIndex].value, items[highlightedIndex].label);
      }
    } else if (e.key === "Escape" || e.key === "Tab") {
      if (e.key === "Tab") e.preventDefault();
      onOpenChange(false);
      triggerRef.current?.focus();
    }
  };

  return (
    <button
      ref={triggerRef}
      type="button"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      onKeyDown={handleKeyDown}
      onClick={() => onOpenChange(!open)}
      className={cn(
        "h-10 px-3 text-sm border border-[var(--bt-border)] rounded-[var(--bt-radius-md)]",
        "bg-[var(--bt-bg-base)] text-[var(--bt-text-primary)] inline-flex items-center justify-between gap-2",
        "min-w-[120px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "transition-colors",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "truncate",
          selectedLabel
            ? "text-[var(--bt-text-primary)]"
            : "text-[var(--bt-text-muted)]"
        )}
      >
        {selectedLabel ?? placeholder}
      </span>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn(
          "shrink-0 text-[var(--bt-text-muted)] transition-transform duration-200",
          open && "rotate-180"
        )}
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  );
}

export function SelectContent({ children, className, style, ...props }: SelectContentProps) {
  const { open, triggerRef, contentId, highlightedIndex, items } = useSelectContext();
  const contentRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number; width: number } | null>(null);

  const highlightedItemId =
    highlightedIndex !== null && items[highlightedIndex]
      ? \`select-item-\${items[highlightedIndex].value}\`
      : undefined;

  useEffect(() => {
    if (!open) {
      setPos(null);
      return;
    }

    function recalculate() {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 4, left: rect.left, width: rect.width });
    }

    recalculate();
    window.addEventListener("scroll", recalculate, { passive: true, capture: true });
    window.addEventListener("resize", recalculate, { passive: true });
    return () => {
      window.removeEventListener("scroll", recalculate, { capture: true });
      window.removeEventListener("resize", recalculate);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="listbox"
      aria-activedescendant={highlightedItemId}
      style={{
        position: "fixed",
        top: pos?.top ?? 0,
        left: pos?.left ?? 0,
        width: pos?.width ?? 0,
        visibility: pos ? "visible" : "hidden",
        pointerEvents: pos ? "auto" : "none",
        zIndex: 60,
        animation: "bt-fade-in 0.15s ease-out",
        ...style,
      }}
      className={cn(
        "bg-[var(--bt-bg-surface)] border border-[var(--bt-border)]",
        "shadow-[var(--bt-shadow-md)] rounded-[var(--bt-radius-md)] py-1",
        "max-h-[300px] overflow-y-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SelectItem({
  value: itemValue,
  disabled = false,
  children,
  className,
  ...props
}: SelectItemProps) {
  const {
    value,
    onSelect,
    registerItem,
    unregisterItem,
    highlightedIndex,
    setHighlightedIndex,
    items,
  } = useSelectContext();

  const isSelected = value === itemValue;
  const itemIndex = items.findIndex((i) => i.value === itemValue);
  const isHighlighted = highlightedIndex !== null && itemIndex === highlightedIndex;
  const itemId = \`select-item-\${itemValue}\`;

  useLayoutEffect(() => {
    if (disabled) return;
    const label =
      typeof children === "string" ? children : itemValue;
    registerItem(itemValue, label);
    return () => unregisterItem(itemValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemValue, disabled]);

  return (
    <div
      id={itemId}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled || undefined}
      data-highlighted={isHighlighted ? "true" : undefined}
      tabIndex={-1}
      onClick={() => {
        if (!disabled) {
          const label = typeof children === "string" ? children : itemValue;
          onSelect(itemValue, label);
        }
      }}
      onMouseEnter={() => {
        if (!disabled && itemIndex >= 0) setHighlightedIndex(itemIndex);
      }}
      className={cn(
        "px-3 py-2 text-sm cursor-pointer flex items-center justify-between",
        "text-[var(--bt-text-primary)]",
        isHighlighted && "bg-[var(--bt-hover-bg)]",
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {isSelected && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 text-[var(--bt-accent)]"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  );
}

export function SelectGroup({ className, children, ...props }: SelectGroupProps) {
  return (
    <div role="group" className={cn("py-1", className)} {...props}>
      {children}
    </div>
  );
}

export function SelectLabel({ className, children, ...props }: SelectLabelProps) {
  return (
    <p
      className={cn(
        "px-3 py-1 text-xs font-semibold text-[var(--bt-text-muted)] uppercase tracking-wider",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
`;

const basicCode = `const [fruit, setFruit] = useState("");
<Select value={fruit} onValueChange={setFruit}>
  <SelectTrigger placeholder="Pick a fruit..." />
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="cherry">Cherry</SelectItem>
    <SelectItem value="mango">Mango</SelectItem>
  </SelectContent>
</Select>`;

const groupsCode = `<Select>
  <SelectTrigger placeholder="Pick a food..." />
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Vegetables</SelectLabel>
      <SelectItem value="carrot">Carrot</SelectItem>
      <SelectItem value="broccoli">Broccoli</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`;

const disabledSelectCode = `<Select disabled>
  <SelectTrigger placeholder="Disabled select" />
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
  </SelectContent>
</Select>`;

const disabledItemsCode = `<Select>
  <SelectTrigger placeholder="Pick a plan..." />
  <SelectContent>
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
    <SelectItem value="enterprise" disabled>Enterprise (contact us)</SelectItem>
  </SelectContent>
</Select>`;

const propsData: PropRow[] = [
  { prop: "value", type: "string", defaultValue: "—", description: "Controlled selected value" },
  { prop: "onValueChange", type: "(value: string) => void", defaultValue: "—", description: "Callback when value changes" },
  { prop: "defaultValue", type: "string", defaultValue: "—", description: "Initial value (uncontrolled)" },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables the entire select" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override" },
];

const itemPropsData: PropRow[] = [
  { prop: "value", type: "string", defaultValue: "—", description: "Value passed to onValueChange when selected (required)" },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables this specific option" },
];

export default function SelectPage() {
  const [fruit, setFruit] = useState("");

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Select</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A styled dropdown select for form use. Supports keyboard navigation, groups, and disabled items.
        </p>
      </div>

      <ComponentPreview title="Basic" code={basicCode}>
        <div className="p-4">
          <Select value={fruit} onValueChange={setFruit}>
            <SelectTrigger placeholder="Pick a fruit..." />
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="cherry">Cherry</SelectItem>
              <SelectItem value="mango">Mango</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview title="With Groups and Labels" code={groupsCode}>
        <div className="p-4">
          <Select>
            <SelectTrigger placeholder="Pick a food..." />
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="broccoli">Broccoli</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Select" code={disabledSelectCode}>
        <div className="p-4">
          <Select disabled>
            <SelectTrigger placeholder="Disabled select" />
            <SelectContent>
              <SelectItem value="a">Option A</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Items" code={disabledItemsCode}>
        <div className="p-4">
          <Select>
            <SelectTrigger placeholder="Pick a plan..." />
            <SelectContent>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="pro">Pro</SelectItem>
              <SelectItem value="enterprise" disabled>Enterprise (contact us)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Select)</h2>
        <PropsTable rows={propsData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (SelectItem)</h2>
        <PropsTable rows={itemPropsData} />
      </div>

      <SourceSection source={SOURCE} filename="Select.tsx" />
    </div>
  );
}

"use client";

import { useToast } from "@/components/bakethere/overlay/toast";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { ToastProps } from "./toast.types";

const variantClasses: Record<string, string> = {
  default: "border-[var(--bt-border)] bg-[var(--bt-bg-elevated)]",
  success:
    "border-[var(--bt-success)] bg-[var(--bt-bg-elevated)] text-[var(--bt-success)]",
  destructive:
    "border-[var(--bt-destructive)] bg-[var(--bt-destructive-bg)] text-[var(--bt-destructive)]",
  warning:
    "border-[var(--bt-warning)] bg-[var(--bt-bg-elevated)] text-[var(--bt-warning)]",
};

export function Toast({
  id,
  title,
  description,
  variant = "default",
  duration = 4000,
  onDismiss,
  theme,
}: ToastProps) {
  useEffect(() => {
    if (duration <= 0) return;
    const timer = setTimeout(() => onDismiss(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onDismiss]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      {...(theme ? { "data-bt-theme": theme } : {})}
      onClick={() => onDismiss(id)}
      className={cn(
        "relative flex flex-col gap-1 rounded-[var(--bt-radius-md)] border p-4",
        "text-[var(--bt-text-primary)] shadow-[var(--bt-shadow-lg)]",
        "cursor-pointer select-none",
        "animate-[bt-toast-in_0.3s_ease-out]",
        variantClasses[variant]
      )}
    >
      {title && <p className="text-sm font-semibold">{title}</p>}
      {description && <p className="text-sm opacity-90">{description}</p>}
    </div>
  );
}
`;

const toastCode = `// useToast.ts - useSyncExternalStore pattern (required for React Compiler)
"use client";
import { useSyncExternalStore, useCallback } from "react";

let toasts: ToastItem[] = [];
const listeners = new Set<() => void>();
function notify() { listeners.forEach(l => l()); }

const store = {
  subscribe(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener); },
  getSnapshot(): ToastItem[] { return toasts; },
};

function addToast(options: ToastOptions): string {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, ...options }];
  notify();
  return id;
}

export function useToast() {
  const items = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const toast = useCallback((options: ToastOptions) => addToast(options), []);
  const dismiss = useCallback((id: string) => { toasts = toasts.filter(t => t.id !== id); notify(); }, []);
  return { toasts: items, toast, dismiss };
}

// Add ToastProvider to your layout:
// <ToastProvider /> - renders a portal into document.body`;

const propsData: PropRow[] = [
  { prop: "title", type: "string", defaultValue: "-", description: "Main toast heading" },
  { prop: "description", type: "string", defaultValue: "-", description: "Secondary descriptive text" },
  { prop: "variant", type: '"default" | "success" | "destructive" | "warning"', defaultValue: '"default"', description: "Visual style of the toast" },
  { prop: "duration", type: "number", defaultValue: "4000", description: "Auto-dismiss delay in milliseconds" },
];

export default function ToastPage() {
  const { toast } = useToast();
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Toast</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          Imperative toast notifications via <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">useToast()</code>.
          Add <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">&lt;ToastProvider /&gt;</code> once in your layout.
        </p>
      </div>

      <ComponentPreview title="Variants" code={toastCode}>
        <VariantGrid>
          <Button onClick={() => toast({ title: "Default", description: "A default notification." })}>
            Default
          </Button>
          <Button onClick={() => toast({ title: "Success!", description: "Operation completed.", variant: "success" })}>
            Success
          </Button>
          <Button variant="destructive" onClick={() => toast({ title: "Error", description: "Something went wrong.", variant: "destructive" })}>
            Destructive
          </Button>
          <Button onClick={() => toast({ title: "Warning", description: "Please review your input.", variant: "warning" })}>
            Warning
          </Button>
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">toast() Options</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Toast.tsx" />
    </div>
  );
}

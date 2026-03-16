"use client";

import { useToast } from "@/components/bakethere/overlay/toast";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";

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
    </div>
  );
}

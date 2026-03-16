"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/bakethere/overlay/dialog";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const dialogCode = `// Dialog.tsx ("use client", uses native <dialog> element)
"use client";
import { createContext, useContext, useRef, useEffect, useCallback, useId } from "react";
import { cn } from "@/lib/utils";

// Context, Dialog (root), DialogTrigger, DialogContent, DialogHeader,
// DialogTitle, DialogDescription, DialogFooter, DialogClose

export function Dialog({ open = false, onOpenChange, children, theme }) {
  // Wraps children in a context with open state + ARIA IDs
}
export function DialogContent({ children, className, ...props }) {
  // Uses native <dialog> showModal()/close(), closes on backdrop click
  // ::backdrop styles are set in globals.css
}
// ...rest of compound components`;

const propsData: PropRow[] = [
  { prop: "open", type: "boolean", defaultValue: "false", description: "Controlled open state" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-", description: "Callback when open state changes" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the theme" },
];

export default function DialogPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Dialog</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A modal dialog built on the native HTML{" "}
          <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1 rounded">&lt;dialog&gt;</code>{" "}
          element - built-in focus trap, Escape key, and backdrop.
        </p>
      </div>

      <ComponentPreview title="Basic Dialog" code={dialogCode}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Action</DialogTitle>
              <DialogDescription>
                Are you sure you want to proceed? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose>Cancel</DialogClose>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Dialog)</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

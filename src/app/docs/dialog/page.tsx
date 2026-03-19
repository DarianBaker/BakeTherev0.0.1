"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/bakethere/overlay/dialog";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `"use client";

import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useCallback,
  useId,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from "./dialog.types";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("Dialog sub-components must be used inside <Dialog>");
  return ctx;
}

export function Dialog({ open = false, onOpenChange, children, theme }: DialogProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const titleId = useId();
  const descriptionId = useId();

  const handleOpenChange = useCallback(
    (val: boolean) => onOpenChange?.(val),
    [onOpenChange]
  );

  return (
    <DialogContext.Provider
      value={{ open, onOpenChange: handleOpenChange, titleId, descriptionId }}
    >
      <div data-bt-theme={activeTheme}>{children}</div>
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ children, onClick, className, ...props }: DialogTriggerProps) {
  const { onOpenChange } = useDialogContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        onOpenChange(true);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium",
        "rounded-[var(--bt-radius-md)] border border-[var(--bt-border)]",
        "text-[var(--bt-text-primary)] bg-transparent hover:bg-[var(--bt-hover-bg)]",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        "disabled:opacity-[var(--bt-disabled-opacity)] disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function DialogContent({ children, onClose, className, ...props }: DialogContentProps) {
  const { open, onOpenChange, titleId, descriptionId } = useDialogContext();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => onOpenChange(false);
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onOpenChange]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-modal="true"
      className={cn(
        "rounded-[var(--bt-radius-lg)] border border-[var(--bt-border)]",
        "bg-[var(--bt-bg-elevated)] text-[var(--bt-text-primary)]",
        "shadow-[var(--bt-shadow-lg)] p-0 max-w-lg w-full",
        "open:flex open:flex-col",
        className
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) onOpenChange(false);
      }}
      {...props}
    >
      <div className="flex flex-col p-6 gap-4 animate-[bt-dialog-in_0.2s_ease-out]">{children}</div>
    </dialog>
  );
}

export function DialogHeader({ className, children, ...props }: DialogHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function DialogTitle({ className, children, ...props }: DialogTitleProps) {
  const { titleId } = useDialogContext();
  return (
    <h2
      id={titleId}
      className={cn("text-lg font-semibold text-[var(--bt-text-primary)]", className)}
      {...props}
    >
      {children}
    </h2>
  );
}

export function DialogDescription({ className, children, ...props }: DialogDescriptionProps) {
  const { descriptionId } = useDialogContext();
  return (
    <p
      id={descriptionId}
      className={cn("text-sm text-[var(--bt-text-muted)]", className)}
      {...props}
    >
      {children}
    </p>
  );
}

export function DialogFooter({ className, children, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn("flex items-center justify-end gap-3 pt-2", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function DialogClose({ children, onClick, className, ...props }: DialogCloseProps) {
  const { onOpenChange } = useDialogContext();
  return (
    <button
      type="button"
      onClick={(e) => {
        onOpenChange(false);
        onClick?.(e);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--bt-radius-md)]",
        "text-sm font-medium transition-colors",
        "text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
`;

const dialogCode = `const [open, setOpen] = useState(false);

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
</Dialog>`;

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

      <InstallCommand componentName="dialog" />

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

      <SourceSection source={SOURCE} filename="Dialog.tsx" />
    </div>
  );
}

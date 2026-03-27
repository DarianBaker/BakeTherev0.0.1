"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type {
  SidebarProps, SidebarTriggerProps, SidebarContentProps,
  SidebarHeaderProps, SidebarBodyProps, SidebarFooterProps, SidebarCloseProps,
} from "./sidebar.types";

interface SidebarContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side: "left" | "right";
  closeOnBackdrop: boolean;
  size: "sm" | "md" | "lg";
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebarContext() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("Sidebar sub-components must be used inside <Sidebar>");
  return ctx;
}

const sizeWidths = { sm: "240px", md: "288px", lg: "360px" };

export function Sidebar({
  open: controlledOpen,
  onOpenChange,
  defaultOpen = false,
  side = "left",
  closeOnBackdrop = true,
  size = "md",
  theme,
  className,
  children,
}: SidebarProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpenChange = useCallback(
    (val: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(val);
      onOpenChange?.(val);
    },
    [controlledOpen, onOpenChange]
  );

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <SidebarContext.Provider value={{ open, onOpenChange: handleOpenChange, side, closeOnBackdrop, size }}>
      <div data-bt-theme={activeTheme} className={className}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

export function SidebarTrigger({ children, onClick, className, ...props }: SidebarTriggerProps) {
  const { onOpenChange } = useSidebarContext();
  return (
    <button
      type="button"
      onClick={(e) => { onOpenChange(true); onClick?.(e); }}
      className={cn(
        "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium",
        "rounded-[var(--bt-radius-md)] border border-[var(--bt-border)]",
        "text-[var(--bt-text-primary)] bg-transparent hover:bg-[var(--bt-hover-bg)]",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function SidebarContent({ children, className }: SidebarContentProps) {
  const { open, onOpenChange, side, closeOnBackdrop, size } = useSidebarContext();

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={() => closeOnBackdrop && onOpenChange(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
          willChange: "opacity",
        }}
      />
      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed",
          top: 0,
          bottom: 0,
          [side]: 0,
          width: sizeWidths[size],
          maxWidth: "90vw",
          zIndex: 50,
          transform: open
            ? "translateX(0)"
            : side === "left"
            ? "translateX(-100%)"
            : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "transform",
        }}
        className={cn(
          "flex flex-col",
          "bg-[var(--bt-bg-surface)]",
          side === "left" ? "border-r border-[var(--bt-border)]" : "border-l border-[var(--bt-border)]",
          "shadow-[var(--bt-shadow-lg)]",
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

export function SidebarHeader({ children, className, ...props }: SidebarHeaderProps) {
  return (
    <div
      className={cn("flex items-center justify-between px-4 py-3 border-b border-[var(--bt-border)] shrink-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarBody({ children, className, ...props }: SidebarBodyProps) {
  return (
    <div className={cn("flex-1 overflow-y-auto px-4 py-3", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarFooter({ children, className, ...props }: SidebarFooterProps) {
  return (
    <div className={cn("shrink-0 px-4 py-3 border-t border-[var(--bt-border)]", className)} {...props}>
      {children}
    </div>
  );
}

export function SidebarClose({ children, onClick, className, ...props }: SidebarCloseProps) {
  const { onOpenChange } = useSidebarContext();
  return (
    <button
      type="button"
      aria-label="Close sidebar"
      onClick={(e) => { onOpenChange(false); onClick?.(e); }}
      className={cn(
        "inline-flex items-center justify-center rounded-[var(--bt-radius-sm)]",
        "w-8 h-8 text-[var(--bt-text-muted)] hover:text-[var(--bt-text-primary)]",
        "hover:bg-[var(--bt-hover-bg)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
        className
      )}
      {...props}
    >
      {children ?? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
    </button>
  );
}

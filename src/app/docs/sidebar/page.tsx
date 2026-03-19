"use client";

import { useState } from "react";
import {
  Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarBody, SidebarFooter, SidebarClose,
} from "@/components/bakethere/layout/sidebar";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `"use client";

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
`;

const basicCode = `const [open, setOpen] = useState(false);

<Sidebar open={open} onOpenChange={setOpen}>
  <SidebarTrigger>Open Sidebar</SidebarTrigger>
  <SidebarContent>
    <SidebarHeader>
      <span className="font-semibold text-[var(--bt-text-primary)]">Navigation</span>
      <SidebarClose />
    </SidebarHeader>
    <SidebarBody>
      <nav className="space-y-1">
        {["Dashboard", "Projects", "Team", "Settings"].map((item) => (
          <button key={item} className="w-full text-left px-3 py-2 rounded-[var(--bt-radius-sm)] text-sm text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)] transition-colors">
            {item}
          </button>
        ))}
      </nav>
    </SidebarBody>
  </SidebarContent>
</Sidebar>`;

const rightCode = `const [open, setOpen] = useState(false);

<Sidebar open={open} onOpenChange={setOpen} side="right">
  <SidebarTrigger>Open Right Panel</SidebarTrigger>
  <SidebarContent>
    <SidebarHeader>
      <span className="font-semibold text-[var(--bt-text-primary)]">Details</span>
      <SidebarClose />
    </SidebarHeader>
    <SidebarBody>
      <p className="text-sm text-[var(--bt-text-muted)]">Slides in from the right side.</p>
    </SidebarBody>
  </SidebarContent>
</Sidebar>`;

const largeCode = `const [open, setOpen] = useState(false);

<Sidebar open={open} onOpenChange={setOpen} size="lg">
  <SidebarTrigger>Open Large Sidebar</SidebarTrigger>
  <SidebarContent>
    <SidebarHeader>
      <span className="font-semibold text-[var(--bt-text-primary)]">Menu</span>
      <SidebarClose />
    </SidebarHeader>
    <SidebarBody>
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--bt-text-muted)]">Main</p>
        <nav className="space-y-1">
          {["Dashboard", "Analytics", "Projects", "Team"].map((item) => (
            <button key={item} className="w-full text-left px-3 py-2 rounded-[var(--bt-radius-sm)] text-sm text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)] transition-colors">
              {item}
            </button>
          ))}
        </nav>
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--bt-text-muted)]">Account</p>
        <nav className="space-y-1">
          {["Profile", "Settings", "Billing"].map((item) => (
            <button key={item} className="w-full text-left px-3 py-2 rounded-[var(--bt-radius-sm)] text-sm text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)] transition-colors">
              {item}
            </button>
          ))}
        </nav>
      </div>
    </SidebarBody>
    <SidebarFooter>
      <p className="text-xs text-[var(--bt-text-muted)]">v1.0.0</p>
    </SidebarFooter>
  </SidebarContent>
</Sidebar>`;

const noDismissCode = `const [open, setOpen] = useState(false);

<Sidebar open={open} onOpenChange={setOpen} closeOnBackdrop={false}>
  <SidebarTrigger>Open (No Backdrop Dismiss)</SidebarTrigger>
  <SidebarContent>
    <SidebarHeader>
      <span className="font-semibold text-[var(--bt-text-primary)]">Locked Panel</span>
      <SidebarClose />
    </SidebarHeader>
    <SidebarBody>
      <p className="text-sm text-[var(--bt-text-muted)]">Clicking the backdrop won't close this panel — use the X button.</p>
    </SidebarBody>
  </SidebarContent>
</Sidebar>`;

const propsData: PropRow[] = [
  { prop: "open", type: "boolean", defaultValue: "-", description: "Controlled open state" },
  { prop: "onOpenChange", type: "(open: boolean) => void", defaultValue: "-", description: "Callback when open changes" },
  { prop: "defaultOpen", type: "boolean", defaultValue: "false", description: "Uncontrolled default open" },
  { prop: "side", type: '"left" | "right"', defaultValue: '"left"', description: "Side the panel slides from" },
  { prop: "closeOnBackdrop", type: "boolean", defaultValue: "true", description: "Whether clicking backdrop closes" },
  { prop: "size", type: '"sm" | "md" | "lg"', defaultValue: '"md"', description: "Width of the panel (240/288/360px)" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override" },
];

const navItems = ["Dashboard", "Projects", "Team", "Settings"];
const largeNavMain = ["Dashboard", "Analytics", "Projects", "Team"];
const largeNavAccount = ["Profile", "Settings", "Billing"];

export default function SidebarPage() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [largeOpen, setLargeOpen] = useState(false);
  const [noDismissOpen, setNoDismissOpen] = useState(false);

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Sidebar</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A slide-in overlay panel with backdrop, scroll lock, and composable slots. Supports left/right side, three sizes, and controlled or uncontrolled open state.
        </p>
      </div>

      <InstallCommand componentName="sidebar" />

      <ComponentPreview title="Basic" code={basicCode}>
        <Sidebar open={basicOpen} onOpenChange={setBasicOpen}>
          <SidebarTrigger>Open Sidebar</SidebarTrigger>
          <SidebarContent>
            <SidebarHeader>
              <span className="font-semibold text-[var(--bt-text-primary)]">Navigation</span>
              <SidebarClose />
            </SidebarHeader>
            <SidebarBody>
              <nav className="space-y-1">
                {navItems.map((item) => (
                  <button key={item} className="w-full text-left px-3 py-2 rounded-[var(--bt-radius-sm)] text-sm text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)] transition-colors">
                    {item}
                  </button>
                ))}
              </nav>
            </SidebarBody>
          </SidebarContent>
        </Sidebar>
      </ComponentPreview>

      <ComponentPreview title="Right Side" code={rightCode}>
        <Sidebar open={rightOpen} onOpenChange={setRightOpen} side="right">
          <SidebarTrigger>Open Right Panel</SidebarTrigger>
          <SidebarContent>
            <SidebarHeader>
              <span className="font-semibold text-[var(--bt-text-primary)]">Details</span>
              <SidebarClose />
            </SidebarHeader>
            <SidebarBody>
              <p className="text-sm text-[var(--bt-text-muted)]">Slides in from the right side.</p>
            </SidebarBody>
          </SidebarContent>
        </Sidebar>
      </ComponentPreview>

      <ComponentPreview title="Large with Footer" code={largeCode}>
        <Sidebar open={largeOpen} onOpenChange={setLargeOpen} size="lg">
          <SidebarTrigger>Open Large Sidebar</SidebarTrigger>
          <SidebarContent>
            <SidebarHeader>
              <span className="font-semibold text-[var(--bt-text-primary)]">Menu</span>
              <SidebarClose />
            </SidebarHeader>
            <SidebarBody>
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--bt-text-muted)]">Main</p>
                <nav className="space-y-1">
                  {largeNavMain.map((item) => (
                    <button key={item} className="w-full text-left px-3 py-2 rounded-[var(--bt-radius-sm)] text-sm text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)] transition-colors">
                      {item}
                    </button>
                  ))}
                </nav>
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--bt-text-muted)]">Account</p>
                <nav className="space-y-1">
                  {largeNavAccount.map((item) => (
                    <button key={item} className="w-full text-left px-3 py-2 rounded-[var(--bt-radius-sm)] text-sm text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)] transition-colors">
                      {item}
                    </button>
                  ))}
                </nav>
              </div>
            </SidebarBody>
            <SidebarFooter>
              <p className="text-xs text-[var(--bt-text-muted)]">v1.0.0</p>
            </SidebarFooter>
          </SidebarContent>
        </Sidebar>
      </ComponentPreview>

      <ComponentPreview title="No Backdrop Dismiss" code={noDismissCode}>
        <Sidebar open={noDismissOpen} onOpenChange={setNoDismissOpen} closeOnBackdrop={false}>
          <SidebarTrigger>Open (No Backdrop Dismiss)</SidebarTrigger>
          <SidebarContent>
            <SidebarHeader>
              <span className="font-semibold text-[var(--bt-text-primary)]">Locked Panel</span>
              <SidebarClose />
            </SidebarHeader>
            <SidebarBody>
              <p className="text-sm text-[var(--bt-text-muted)]">Clicking the backdrop won&apos;t close this panel — use the X button.</p>
            </SidebarBody>
          </SidebarContent>
        </Sidebar>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Sidebar)</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Sidebar.tsx" />
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { HeaderProps, HeaderBrandProps, HeaderNavProps, HeaderActionsProps } from "./header.types";

export function Header({
  sticky = false,
  variant = "bordered",
  scrollFade = false,
  theme,
  className,
  children,
  ...props
}: HeaderProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!scrollFade || !el) return;

    // Walk up the DOM to find the nearest scrollable ancestor.
    // Terminates when el becomes null (reached top of the tree without finding one).
    let scrollEl: Element | null = el.parentElement;
    while (scrollEl) {
      const { overflowY } = window.getComputedStyle(scrollEl);
      // "overlay" is a legacy WebKit alias for "scroll"; harmless to include.
      if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") break;
      scrollEl = scrollEl.parentElement;
    }

    // Use found container, or fall back to window (e.g. full-page layouts).
    const target: Element | Window = scrollEl ?? window;

    const getScrollTop = () =>
      target instanceof Window ? target.scrollY : (target as Element).scrollTop;

    const handle = () => setScrolled(getScrollTop() > 20);

    // Initialize immediately — container may already be scrolled on mount.
    handle();

    target.addEventListener("scroll", handle, { passive: true });
    return () => target.removeEventListener("scroll", handle);
  }, [scrollFade]);

  const visible = !scrollFade || scrolled;

  return (
    <header
      ref={headerRef}
      data-bt-theme={activeTheme}
      style={scrollFade ? { transition: "background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease" } : undefined}
      className={cn(
        "w-full z-30",
        sticky ? "sticky top-0" : "relative",
        visible ? "bg-[var(--bt-bg-base)]" : "bg-transparent",
        variant === "bordered" && visible && "border-b border-[var(--bt-border)]",
        variant === "elevated" && visible && "shadow-[var(--bt-shadow-sm)]",
        className
      )}
      {...props}
    >
      <div className="flex items-center h-14 px-4 gap-4">
        {children}
      </div>
    </header>
  );
}

export function HeaderBrand({ className, children, ...props }: HeaderBrandProps) {
  return (
    <div className={cn("flex items-center gap-2 shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

export function HeaderNav({ className, children, ...props }: HeaderNavProps) {
  return (
    <nav className={cn("flex-1 flex items-center gap-1", className)} {...props}>
      {children}
    </nav>
  );
}

export function HeaderActions({ className, children, ...props }: HeaderActionsProps) {
  return (
    <div className={cn("flex items-center gap-2 ml-auto shrink-0", className)} {...props}>
      {children}
    </div>
  );
}

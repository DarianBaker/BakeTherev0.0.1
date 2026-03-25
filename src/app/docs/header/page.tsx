"use client";

import { Header, HeaderBrand, HeaderNav, HeaderActions } from "@/components/bakethere/layout/header";
import { Button } from "@/components/bakethere/primitives/button";
import { Badge } from "@/components/bakethere/display/badge";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

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

    let scrollEl: Element | null = el.parentElement;
    while (scrollEl) {
      const { overflowY } = window.getComputedStyle(scrollEl);
      if (overflowY === "auto" || overflowY === "scroll" || overflowY === "overlay") break;
      scrollEl = scrollEl.parentElement;
    }

    const target: Element | Window = scrollEl ?? window;

    const getScrollTop = () =>
      target instanceof Window ? target.scrollY : (target as Element).scrollTop;

    const handle = () => setScrolled(getScrollTop() > 20);

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
`;

const borderedCode = `<Header variant="bordered">
  <HeaderBrand>
    <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
    <Badge variant="secondary">Beta</Badge>
  </HeaderBrand>
  <HeaderNav>
    <button className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">Home</button>
    <button className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">Docs</button>
    <button className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">Blog</button>
  </HeaderNav>
  <HeaderActions>
    <Button size="sm" variant="outline">Sign in</Button>
    <Button size="sm">Get started</Button>
  </HeaderActions>
</Header>`;

const elevatedCode = `<Header variant="elevated">
  <HeaderBrand>
    <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
  </HeaderBrand>
  <HeaderActions>
    <Button size="sm" variant="ghost">Sign in</Button>
    <Button size="sm">Get started</Button>
  </HeaderActions>
</Header>`;

const flatCode = `<Header variant="flat">
  <HeaderBrand>
    <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
  </HeaderBrand>
  <HeaderNav>
    <button className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">Features</button>
    <button className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">Pricing</button>
  </HeaderNav>
  <HeaderActions>
    <Button size="sm">Sign up</Button>
  </HeaderActions>
</Header>`;

const scrollFadeCode = `// scrollFade: transparent until scrolled > 20px, then fades to bg-base
// sticky: header stays at top of viewport on scroll
<Header sticky scrollFade variant="bordered">
  <HeaderBrand>
    <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
  </HeaderBrand>
  <HeaderActions>
    <Button size="sm">Sign up</Button>
  </HeaderActions>
</Header>`;

const propsData: PropRow[] = [
  { prop: "sticky", type: "boolean", defaultValue: "false", description: "Fixes header to top of viewport on scroll" },
  { prop: "variant", type: '"flat" | "bordered" | "elevated"', defaultValue: '"bordered"', description: "Visual style of the header" },
  { prop: "scrollFade", type: "boolean", defaultValue: "false", description: "Transparent until scrolled past 20px" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override" },
];

const navLinks = ["Home", "Docs", "Blog"];
const flatNavLinks = ["Features", "Pricing"];

export default function HeaderPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Header</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A sticky or static header bar with Brand, Nav, and Actions slots. Supports three visual variants and an optional scroll-fade effect.
        </p>
      </div>

      <ComponentPreview title="Bordered (Default)" code={borderedCode}>
        <div className="rounded-[var(--bt-radius-md)] overflow-hidden border border-[var(--bt-border)]">
          <Header variant="bordered">
            <HeaderBrand>
              <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
              <Badge variant="secondary">Beta</Badge>
            </HeaderBrand>
            <HeaderNav>
              {navLinks.map((link) => (
                <button key={link} className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">
                  {link}
                </button>
              ))}
            </HeaderNav>
            <HeaderActions>
              <Button size="sm" variant="outline">Sign in</Button>
              <Button size="sm">Get started</Button>
            </HeaderActions>
          </Header>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Elevated" code={elevatedCode}>
        <div className="rounded-[var(--bt-radius-md)] overflow-hidden border border-[var(--bt-border)]">
          <Header variant="elevated">
            <HeaderBrand>
              <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
            </HeaderBrand>
            <HeaderActions>
              <Button size="sm" variant="ghost">Sign in</Button>
              <Button size="sm">Get started</Button>
            </HeaderActions>
          </Header>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Flat" code={flatCode}>
        <div className="rounded-[var(--bt-radius-md)] overflow-hidden border border-[var(--bt-border)]">
          <Header variant="flat">
            <HeaderBrand>
              <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
            </HeaderBrand>
            <HeaderNav>
              {flatNavLinks.map((link) => (
                <button key={link} className="px-3 py-1.5 text-sm text-[var(--bt-text-secondary)] hover:text-[var(--bt-text-primary)] hover:bg-[var(--bt-hover-bg)] rounded-[var(--bt-radius-sm)] transition-colors">
                  {link}
                </button>
              ))}
            </HeaderNav>
            <HeaderActions>
              <Button size="sm">Sign up</Button>
            </HeaderActions>
          </Header>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Sticky + ScrollFade" code={scrollFadeCode}>
        <div className="rounded-[var(--bt-radius-md)] overflow-hidden border border-[var(--bt-border)] h-40 overflow-y-auto relative">
          <Header sticky scrollFade variant="bordered">
            <HeaderBrand>
              <span className="font-bold text-[var(--bt-text-primary)]">MyApp</span>
            </HeaderBrand>
            <HeaderActions>
              <Button size="sm">Sign up</Button>
            </HeaderActions>
          </Header>
          <div className="p-4 space-y-2">
            {Array.from({ length: 8 }, (_, i) => (
              <p key={i} className="text-sm text-[var(--bt-text-muted)]">Scroll down to see the header fade in...</p>
            ))}
          </div>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Header)</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Header.tsx" />
    </div>
  );
}

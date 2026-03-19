"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navSections = [
  {
    title: "CLI",
    items: [
      { label: "CLI Reference", href: "/docs/cli" },
    ],
  },
  {
    title: "Primitives",
    items: [
      { label: "Text", href: "/docs/text" },
      { label: "Button", href: "/docs/button" },
      { label: "ButtonGroup", href: "/docs/button-group" },
      { label: "Input", href: "/docs/input" },
      { label: "Label", href: "/docs/label" },
      { label: "Checkbox", href: "/docs/checkbox" },
      { label: "Toggle", href: "/docs/toggle" },
      { label: "Textarea", href: "/docs/textarea" },
      { label: "Radio", href: "/docs/radio" },
      { label: "Slider", href: "/docs/slider" },
      { label: "Select", href: "/docs/select" },
    ],
  },
  {
    title: "Display",
    items: [
      { label: "Card", href: "/docs/card" },
      { label: "Badge", href: "/docs/badge" },
      { label: "Avatar", href: "/docs/avatar" },
      { label: "Separator", href: "/docs/separator" },
      { label: "Skeleton", href: "/docs/skeleton" },
      { label: "Stat", href: "/docs/stat" },
      { label: "Empty", href: "/docs/empty" },
      { label: "Alert", href: "/docs/alert" },
      { label: "Progress", href: "/docs/progress" },
    ],
  },
  {
    title: "Overlay",
    items: [
      { label: "Dialog", href: "/docs/dialog" },
      { label: "Tooltip", href: "/docs/tooltip" },
      { label: "Toast", href: "/docs/toast" },
      { label: "Popover", href: "/docs/popover" },
    ],
  },
  {
    title: "Navigation",
    items: [
      { label: "Dropdown Menu", href: "/docs/dropdown-menu" },
      { label: "Tabs", href: "/docs/tabs" },
      { label: "Accordion", href: "/docs/accordion" },
      { label: "Breadcrumb", href: "/docs/breadcrumb" },
    ],
  },
  {
    title: "Data",
    items: [
      { label: "Table", href: "/docs/table" },
    ],
  },
  {
    title: "Layout",
    items: [
      { label: "Sidebar", href: "/docs/sidebar" },
      { label: "Header", href: "/docs/header" },
    ],
  },
  {
    title: "Theming",
    items: [
      { label: "useThemeProps", href: "/docs/theming" },
    ],
  },
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-[var(--bt-border)] bg-[var(--bt-bg-base)] overflow-y-auto">
      <nav className="p-4 space-y-6">
        {navSections.map((section) => (
          <div key={section.title}>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[var(--bt-text-muted)]">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-[var(--bt-radius-sm)] px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-[var(--bt-active-bg)] text-[var(--bt-accent)] font-medium"
                          : "text-[var(--bt-text-secondary)] hover:bg-[var(--bt-hover-bg)] hover:text-[var(--bt-text-primary)]"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

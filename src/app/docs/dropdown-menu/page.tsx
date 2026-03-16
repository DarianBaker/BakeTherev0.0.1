"use client";

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from "@/components/bakethere/navigation/dropdown-menu";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const dropdownCode = `// DropdownMenu.tsx ("use client")
"use client";
import { createContext, useContext, useState, useRef, useEffect } from "react";

export function DropdownMenu({ children, theme }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  // Click-outside closes via mousedown listener
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (!containerRef.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} data-bt-theme={activeTheme} className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
}
// DropdownMenuTrigger: aria-haspopup + aria-expanded
// DropdownMenuContent: role="menu", Arrow key navigation, Escape closes
// DropdownMenuItem: role="menuitem", auto-closes on click
// DropdownMenuSeparator: role="separator"
// DropdownMenuLabel: section heading`;

const propsData: PropRow[] = [
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override for the dropdown" },
  { prop: "align", type: '"start" | "end" | "center"', defaultValue: '"start"', description: "Alignment of DropdownMenuContent" },
  { prop: "destructive", type: "boolean", defaultValue: "false", description: "DropdownMenuItem: apply destructive styling" },
];

export default function DropdownMenuPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Dropdown Menu</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A compound dropdown menu with keyboard navigation (Arrow keys, Escape), click-outside close, and ARIA roles.
        </p>
      </div>

      <ComponentPreview title="Basic Dropdown" code={dropdownCode}>
        <DropdownMenu>
          <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem destructive>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

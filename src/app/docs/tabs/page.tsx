"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/bakethere/navigation/tabs";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";

const tabsCode = `// Tabs.tsx ("use client")
"use client";
import { createContext, useContext, useState, useRef } from "react";

export function Tabs({ value, defaultValue = "", onValueChange, variant = "line", theme, className, children }) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value ?? internalValue;
  // Controlled + uncontrolled support
  return (
    <TabsContext.Provider value={{ activeValue, setActiveValue, variant }}>
      <div data-bt-theme={activeTheme} className={cn("flex flex-col gap-4", className)}>{children}</div>
    </TabsContext.Provider>
  );
}
// TabsList: role="tablist", Arrow key navigation
// TabsTrigger: role="tab", aria-selected, roving tabIndex
// TabsContent: role="tabpanel", aria-labelledby, hidden when inactive`;

const propsData: PropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Controlled active tab value" },
  { prop: "defaultValue", type: "string", defaultValue: '""', description: "Initial active tab for uncontrolled usage" },
  { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: "Callback when active tab changes" },
  { prop: "variant", type: '"line" | "pill"', defaultValue: '"line"', description: "Visual style of the tab list" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the theme" },
];

export default function TabsPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Tabs</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          Accessible tabs with line and pill variants, keyboard navigation, and controlled/uncontrolled support.
        </p>
      </div>

      <ComponentPreview title="Line Variant" code={tabsCode}>
        <Tabs defaultValue="overview" variant="line">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <p className="text-sm text-[var(--bt-text-secondary)]">Overview content goes here.</p>
          </TabsContent>
          <TabsContent value="analytics">
            <p className="text-sm text-[var(--bt-text-secondary)]">Analytics content goes here.</p>
          </TabsContent>
          <TabsContent value="settings">
            <p className="text-sm text-[var(--bt-text-secondary)]">Settings content goes here.</p>
          </TabsContent>
        </Tabs>
      </ComponentPreview>

      <ComponentPreview title="Pill Variant" code={tabsCode}>
        <Tabs defaultValue="all" variant="pill">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <p className="text-sm text-[var(--bt-text-secondary)]">All items.</p>
          </TabsContent>
          <TabsContent value="active">
            <p className="text-sm text-[var(--bt-text-secondary)]">Active items only.</p>
          </TabsContent>
          <TabsContent value="draft">
            <p className="text-sm text-[var(--bt-text-secondary)]">Draft items only.</p>
          </TabsContent>
        </Tabs>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Tabs)</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

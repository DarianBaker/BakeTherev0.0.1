"use client";

import { Empty } from "@/components/bakethere/display/empty";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const basicCode = `<Empty
  title="No items found"
  description="Add your first item to get started."
/>`;

const customIconCode = `const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

<Empty
  title="No files here"
  description="Upload your first file to this folder."
  icon={<FolderIcon />}
/>`;

const withActionCode = `<Empty
  title="No results"
  description="Your search returned no matches."
  action={<Button size="sm">Add Item</Button>}
/>`;

const FolderIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

const SearchIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const propsData: PropRow[] = [
  { prop: "title", type: "string", defaultValue: "-", description: "Primary heading text (required)" },
  { prop: "description", type: "string", defaultValue: "-", description: "Secondary body text below the title" },
  { prop: "icon", type: "ReactNode", defaultValue: "inbox SVG", description: "Custom icon node. Defaults to an inbox/tray SVG if omitted." },
  { prop: "action", type: "ReactNode", defaultValue: "-", description: "Call-to-action node, typically a <Button>. Rendered below the description." },
  { prop: "className", type: "string", defaultValue: "-", description: "Additional Tailwind or custom classes applied to the wrapper div" },
];

const SOURCE = `import { cn } from "@/lib/utils";
import type { EmptyProps } from "./empty.types";

const DefaultIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7" />
    <path d="M2 13h4l2 3h8l2-3h4" />
  </svg>
);

export function Empty({ title, description, icon, action, className }: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 max-w-xs mx-auto text-center py-12",
        className
      )}
    >
      <div className="text-[var(--bt-text-muted)]">
        {icon ?? <DefaultIcon />}
      </div>
      <h3 className="text-base font-semibold text-[var(--bt-text-primary)]">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--bt-text-muted)]">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}`;

export default function EmptyPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Empty State</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A centered call-to-action layout for empty lists, search results, or zero-data views.
          Server-component safe.
        </p>
      </div>

      <ComponentPreview title="Basic" description="Title and description, default inbox icon" code={basicCode}>
        <Empty
          title="No items found"
          description="Add your first item to get started."
        />
      </ComponentPreview>

      <ComponentPreview title="With Custom Icon" description="Pass any ReactNode as the icon" code={customIconCode}>
        <Empty
          title="No files here"
          description="Upload your first file to this folder."
          icon={<FolderIcon />}
        />
      </ComponentPreview>

      <ComponentPreview title="With Action" description="Use the action prop to render a Button or link" code={withActionCode}>
        <Empty
          title="No results"
          description="Your search returned no matches. Try a different query or create a new item."
          icon={<SearchIcon />}
          action={<Button size="sm">Add Item</Button>}
        />
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Empty.tsx" />
    </div>
  );
}

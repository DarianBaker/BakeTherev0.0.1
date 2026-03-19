"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/bakethere/navigation/breadcrumb";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const basicCode = `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/docs/button">Components</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrentPage>Button</BreadcrumbItem>
</Breadcrumb>`;

const customSeparatorCode = `<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator separator=">" />
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbSeparator separator=">" />
  <BreadcrumbItem isCurrentPage>Button</BreadcrumbItem>
</Breadcrumb>

<Breadcrumb>
  <BreadcrumbItem href="/">Home</BreadcrumbItem>
  <BreadcrumbSeparator separator="•" />
  <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
  <BreadcrumbSeparator separator="•" />
  <BreadcrumbItem isCurrentPage>Button</BreadcrumbItem>
</Breadcrumb>`;

const breadcrumbPropsData: PropRow[] = [
  { prop: "className", type: "string", defaultValue: "-", description: "Additional CSS classes for the nav element." },
];

const itemPropsData: PropRow[] = [
  { prop: "href", type: "string", defaultValue: "-", description: "Link destination. Omit when isCurrentPage is true." },
  { prop: "isCurrentPage", type: "boolean", defaultValue: "false", description: "Marks this item as the current page. Renders as a non-linked span with aria-current=\"page\"." },
];

const separatorPropsData: PropRow[] = [
  { prop: "separator", type: "string", defaultValue: '"/"', description: "Character(s) to use as the separator between breadcrumb items." },
];

const SOURCE = `import { cn } from "@/lib/utils";
import type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
} from "./breadcrumb.types";

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--bt-text-muted)]">
        {children}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({ href, isCurrentPage = false, className, children, ...props }: BreadcrumbItemProps) {
  if (isCurrentPage) {
    return (
      <li aria-current="page" className={cn("font-medium text-[var(--bt-text-primary)]", className)}>
        {children}
      </li>
    );
  }
  return (
    <li className={cn("", className)}>
      <a href={href} className="transition-colors hover:text-[var(--bt-text-primary)]" {...props}>
        {children}
      </a>
    </li>
  );
}

export function BreadcrumbSeparator({ separator = "/", className, ...props }: BreadcrumbSeparatorProps) {
  return (
    <li aria-hidden="true" className={cn("text-[var(--bt-text-muted)]", className)} {...props}>
      {separator}
    </li>
  );
}`;

export default function BreadcrumbPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Breadcrumb</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A server-component-safe compound breadcrumb navigation with configurable separators and
          accessible current-page marking.
        </p>
      </div>

      <InstallCommand componentName="breadcrumb" />

      <ComponentPreview title="Basic" description="Home / Docs / Components / current page" code={basicCode}>
        <Breadcrumb>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem href="/docs/button">Components</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem isCurrentPage>Button</BreadcrumbItem>
        </Breadcrumb>
      </ComponentPreview>

      <ComponentPreview title="Custom Separator" description="Pass any string as the separator prop" code={customSeparatorCode}>
        <div className="flex flex-col gap-4">
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbSeparator separator=">" />
            <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
            <BreadcrumbSeparator separator=">" />
            <BreadcrumbItem href="/docs/button">Components</BreadcrumbItem>
            <BreadcrumbSeparator separator=">" />
            <BreadcrumbItem isCurrentPage>Button</BreadcrumbItem>
          </Breadcrumb>
          <Breadcrumb>
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbSeparator separator="•" />
            <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
            <BreadcrumbSeparator separator="•" />
            <BreadcrumbItem href="/docs/button">Components</BreadcrumbItem>
            <BreadcrumbSeparator separator="•" />
            <BreadcrumbItem isCurrentPage>Button</BreadcrumbItem>
          </Breadcrumb>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Breadcrumb Props</h2>
        <PropsTable rows={breadcrumbPropsData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">BreadcrumbItem Props</h2>
        <PropsTable rows={itemPropsData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">BreadcrumbSeparator Props</h2>
        <PropsTable rows={separatorPropsData} />
      </div>

      <SourceSection source={SOURCE} filename="Breadcrumb.tsx" />
    </div>
  );
}

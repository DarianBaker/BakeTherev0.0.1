"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/bakethere/display/alert";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `import { cn } from "@/lib/utils";
import type { AlertProps, AlertTitleProps, AlertDescriptionProps, AlertVariant } from "./alert.types";

const variantStyles: Record<AlertVariant, { bg: string; borderColor: string; accent: string }> = {
  default: {
    bg: "var(--bt-bg-surface)",
    borderColor: "var(--bt-border)",
    accent: "var(--bt-text-secondary)",
  },
  info: {
    bg: "color-mix(in srgb, var(--bt-accent) 10%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-accent) 30%, transparent)",
    accent: "var(--bt-accent)",
  },
  success: {
    bg: "color-mix(in srgb, var(--bt-success) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-success) 35%, transparent)",
    accent: "var(--bt-success)",
  },
  warning: {
    bg: "color-mix(in srgb, var(--bt-warning) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-warning) 35%, transparent)",
    accent: "var(--bt-warning)",
  },
  error: {
    bg: "color-mix(in srgb, var(--bt-destructive) 12%, transparent)",
    borderColor: "color-mix(in srgb, var(--bt-destructive) 35%, transparent)",
    accent: "var(--bt-destructive)",
  },
};

function DefaultIcon({ variant }: { variant: AlertVariant }) {
  if (variant === "success") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    );
  }
  if (variant === "warning") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    );
  }
  if (variant === "error") {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  );
}

export function Alert({
  variant = "default",
  icon,
  theme,
  className,
  children,
  style,
  ...props
}: AlertProps) {
  const vs = variantStyles[variant];
  return (
    <div
      role="alert"
      {...(theme ? { "data-bt-theme": theme } : {})}
      style={{
        background: vs.bg,
        borderLeftColor: vs.borderColor,
        ...style,
      }}
      className={cn(
        "flex gap-3 p-4 rounded-[var(--bt-radius-md)] border border-transparent border-l-4",
        className
      )}
      {...props}
    >
      <span style={{ color: vs.accent }} className="mt-0.5 shrink-0">
        {icon ?? <DefaultIcon variant={variant} />}
      </span>
      <div className="flex-1 space-y-1">
        {children}
      </div>
    </div>
  );
}

export function AlertTitle({ className, children, ...props }: AlertTitleProps) {
  return (
    <p className={cn("font-semibold text-sm text-[var(--bt-text-primary)] leading-tight", className)} {...props}>
      {children}
    </p>
  );
}

export function AlertDescription({ className, children, ...props }: AlertDescriptionProps) {
  return (
    <p className={cn("text-sm text-[var(--bt-text-secondary)]", className)} {...props}>
      {children}
    </p>
  );
}
`;

const defaultCode = `<Alert>
  <AlertTitle>Heads up</AlertTitle>
  <AlertDescription>You can use components and more right here.</AlertDescription>
</Alert>`;

const variantsCode = `<Alert variant="info">
  <AlertTitle>Info</AlertTitle>
  <AlertDescription>This is an informational message.</AlertDescription>
</Alert>
<Alert variant="success">
  <AlertTitle>Success</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>
<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>This action may have side effects.</AlertDescription>
</Alert>
<Alert variant="error">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Something went wrong. Please try again.</AlertDescription>
</Alert>`;

const customIconCode = `<Alert variant="info" icon={
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
}>
  <AlertTitle>Custom Icon</AlertTitle>
  <AlertDescription>You can pass any ReactNode as the icon.</AlertDescription>
</Alert>`;

const descOnlyCode = `<Alert variant="success">
  <AlertDescription>Profile updated successfully.</AlertDescription>
</Alert>`;

const propsData: PropRow[] = [
  { prop: "variant", type: '"default" | "info" | "success" | "warning" | "error"', defaultValue: '"default"', description: "Visual style and semantic meaning" },
  { prop: "icon", type: "ReactNode", defaultValue: "auto", description: "Override the default variant icon" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Theme override" },
];

export default function AlertPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Alert</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          An inline feedback banner for persistent messages. Unlike Toast (transient), Alert lives in the document flow.
        </p>
      </div>

      <InstallCommand componentName="alert" />

      <ComponentPreview title="Default" code={defaultCode}>
        <div className="p-4">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>You can use components and more right here.</AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Variants" code={variantsCode}>
        <div className="p-4 space-y-3">
          <Alert variant="info">
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>This is an informational message.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>Your changes have been saved.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>This action may have side effects.</AlertDescription>
          </Alert>
          <Alert variant="error">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Something went wrong. Please try again.</AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Custom Icon" code={customIconCode}>
        <div className="p-4">
          <Alert variant="info" icon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
          }>
            <AlertTitle>Custom Icon</AlertTitle>
            <AlertDescription>You can pass any ReactNode as the icon.</AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Description Only" code={descOnlyCode}>
        <div className="p-4">
          <Alert variant="success">
            <AlertDescription>Profile updated successfully.</AlertDescription>
          </Alert>
        </div>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Alert)</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Alert.tsx" />
    </div>
  );
}

"use client";

import { Card, CardHeader, CardContent, CardFooter } from "@/components/bakethere/display/card";
import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `import { cn } from "@/lib/utils";
import type { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from "./card.types";

export function Card({ theme, className, children, ...props }: CardProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn(
        "rounded-[var(--bt-radius-lg)] border border-[var(--bt-border)]",
        "bg-[var(--bt-bg-surface)] shadow-[var(--bt-shadow-sm)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}
`;

const cardCode = `<Card className="w-80">
  <CardHeader>
    <h3 className="font-semibold text-[var(--bt-text-primary)]">Card Title</h3>
    <p className="text-sm text-[var(--bt-text-muted)]">Card description goes here.</p>
  </CardHeader>
  <CardContent>
    <p className="text-sm text-[var(--bt-text-secondary)]">
      This is the main content area of the card.
    </p>
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="ghost" size="sm">Cancel</Button>
    <Button size="sm">Confirm</Button>
  </CardFooter>
</Card>`;

const propsData: PropRow[] = [
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme for this card and its children" },
  { prop: "className", type: "string", defaultValue: "-", description: "Additional CSS classes" },
];

export default function CardPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Card</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A compound card component with Header, Content, and Footer sub-components. Server-component safe.
        </p>
      </div>

      <InstallCommand componentName="card" />

      <ComponentPreview title="Basic Card" code={cardCode}>
        <Card className="w-80">
          <CardHeader>
            <h3 className="font-semibold text-[var(--bt-text-primary)]">Card Title</h3>
            <p className="text-sm text-[var(--bt-text-muted)]">Card description goes here.</p>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-[var(--bt-text-secondary)]">
              This is the main content area of the card.
            </p>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button variant="ghost" size="sm">Cancel</Button>
            <Button size="sm">Confirm</Button>
          </CardFooter>
        </Card>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Card.tsx" />
    </div>
  );
}

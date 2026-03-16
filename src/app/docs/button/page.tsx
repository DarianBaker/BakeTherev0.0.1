"use client";

import { Button } from "@/components/bakethere/primitives/button";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";

const buttonCode = `// button.types.ts
import type { ButtonHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export type ButtonVariant = "solid" | "outline" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  theme?: BtTheme;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Button.tsx
"use client";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { ButtonProps } from "./button.types";

const variantClasses = {
  solid: "bg-[var(--bt-accent)] text-[var(--bt-text-inverse)] hover:bg-[var(--bt-accent-hover)] border border-transparent",
  outline: "bg-transparent text-[var(--bt-accent)] border border-[var(--bt-accent)] hover:bg-[var(--bt-accent-muted)]",
  ghost: "bg-transparent text-[var(--bt-text-primary)] border border-transparent hover:bg-[var(--bt-hover-bg)]",
  destructive: "bg-[var(--bt-destructive-bg)] text-[var(--bt-destructive)] border border-[var(--bt-destructive)] hover:opacity-80",
};

const sizeClasses = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  icon: "h-10 w-10 p-0",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", size = "md", theme, isLoading = false, leftIcon, rightIcon, disabled, className, children, ...props }, ref) => {
    const { theme: contextTheme } = useBakeThereTheme();
    const activeTheme = theme ?? contextTheme;
    return (
      <button
        ref={ref}
        data-bt-theme={activeTheme}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-[var(--bt-radius-md)] transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--bt-ring)]",
          "disabled:opacity-[var(--bt-disabled-opacity)] disabled:pointer-events-none",
          variantClasses[variant], sizeClasses[size], className
        )}
        {...props}
      >
        {isLoading ? <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> : <>{leftIcon && <span aria-hidden="true">{leftIcon}</span>}{children}{rightIcon && <span aria-hidden="true">{rightIcon}</span>}</>}
      </button>
    );
  }
);
Button.displayName = "Button";`;

const propsData: PropRow[] = [
  { prop: "variant", type: '"solid" | "outline" | "ghost" | "destructive"', defaultValue: '"solid"', description: "Visual style of the button" },
  { prop: "size", type: '"sm" | "md" | "lg" | "icon"', defaultValue: '"md"', description: "Size of the button" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the BakeThereProvider theme" },
  { prop: "isLoading", type: "boolean", defaultValue: "false", description: "Shows a spinner and disables the button" },
  { prop: "leftIcon", type: "ReactNode", defaultValue: "-", description: "Icon rendered before children" },
  { prop: "rightIcon", type: "ReactNode", defaultValue: "-", description: "Icon rendered after children" },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables the button" },
];

export default function ButtonPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Button</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A versatile button component supporting multiple visual variants, sizes, loading states, and icon slots.
        </p>
      </div>

      <ComponentPreview title="Variants" code={buttonCode}>
        <VariantGrid>
          <Button variant="solid">Solid</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Sizes" code={buttonCode}>
        <VariantGrid>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Loading State" code={buttonCode}>
        <VariantGrid>
          <Button isLoading>Loading</Button>
          <Button isLoading variant="outline">Loading</Button>
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={buttonCode}>
        <VariantGrid>
          <Button disabled>Disabled</Button>
          <Button disabled variant="outline">Disabled</Button>
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

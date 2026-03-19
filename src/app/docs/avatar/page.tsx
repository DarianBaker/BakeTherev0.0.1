"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/bakethere/display/avatar";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { VariantGrid } from "@/components/docs/VariantGrid";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { AvatarProps, AvatarImageProps, AvatarFallbackProps } from "./avatar.types";

const sizeClasses: Record<string, string> = {
  sm: "h-6 w-6 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-[72px] w-[72px] text-lg",
};

export function Avatar({ size = "md", theme, className, children, ...props }: AvatarProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className={cn(
        "relative inline-flex items-center justify-center",
        "rounded-full overflow-hidden",
        "bg-[var(--bt-bg-muted)] text-[var(--bt-text-secondary)]",
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt = "", className, onError, ...props }: AvatarImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-cover", className)}
      onError={(e) => {
        setErrored(true);
        onError?.(e);
      }}
      {...props}
    />
  );
}

export function AvatarFallback({ className, children, ...props }: AvatarFallbackProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        "font-medium text-[var(--bt-text-secondary)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
`;

const fallbackCode = `<Avatar size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
<Avatar size="md"><AvatarFallback>AB</AvatarFallback></Avatar>
<Avatar size="lg"><AvatarFallback>CD</AvatarFallback></Avatar>
<Avatar size="xl"><AvatarFallback>EF</AvatarFallback></Avatar>`;

const imageCode = `<Avatar>
  <AvatarImage src="https://i.pravatar.cc/40?img=1" alt="User" />
  <AvatarFallback>U1</AvatarFallback>
</Avatar>
<Avatar>
  <AvatarImage src="https://broken-url.example.com/img.jpg" alt="Error" />
  <AvatarFallback>ER</AvatarFallback>
</Avatar>`;

const propsData: PropRow[] = [
  { prop: "size", type: '"sm" | "md" | "lg" | "xl"', defaultValue: '"md"', description: "Size of the avatar (24px / 40px / 56px / 72px)" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme" },
];

export default function AvatarPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Avatar</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A compound avatar component with image and fallback support. Images gracefully fall back to initials on error.
        </p>
      </div>

      <InstallCommand componentName="avatar" />

      <ComponentPreview title="With Fallback" code={fallbackCode}>
        <VariantGrid>
          <Avatar size="sm"><AvatarFallback>JD</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarFallback>AB</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>CD</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarFallback>EF</AvatarFallback></Avatar>
        </VariantGrid>
      </ComponentPreview>

      <ComponentPreview title="With Image (fallback on error)" code={imageCode}>
        <VariantGrid>
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/40?img=1" alt="User" />
            <AvatarFallback>U1</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://broken-url.example.com/img.jpg" alt="Error" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </VariantGrid>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props (Avatar)</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Avatar.tsx" />
    </div>
  );
}

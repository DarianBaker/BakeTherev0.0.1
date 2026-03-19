"use client";

import { Text } from "@/components/bakethere/primitives/text";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `import type { ElementType, JSX } from "react";
import { cn } from "@/lib/utils";
import type { TextVariant, TextFont, TextProps } from "./text.types";

const elementMap: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  "display-lg": "h1",
  "display":    "h1",
  "h1":         "h1",
  "h2":         "h2",
  "h3":         "h3",
  "h4":         "h4",
  "h5":         "h5",
  "h6":         "h6",
  "body-lg":    "p",
  "body":       "p",
  "body-sm":    "p",
  "caption":    "span",
  "overline":   "span",
  "code":       "code",
};

const sizeMap: Record<TextVariant, string> = {
  "display-lg": "clamp(3rem, 6vw + 1rem, 6rem)",
  "display":    "clamp(2.25rem, 4vw + 1rem, 4.5rem)",
  "h1":         "clamp(1.875rem, 3vw + 1rem, 3rem)",
  "h2":         "clamp(1.5rem, 2vw + 1rem, 2.25rem)",
  "h3":         "clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)",
  "h4":         "clamp(1.125rem, 1vw + 0.75rem, 1.5rem)",
  "h5":         "clamp(1rem, 0.5vw + 0.75rem, 1.25rem)",
  "h6":         "clamp(0.875rem, 0.5vw + 0.625rem, 1rem)",
  "body-lg":    "clamp(1rem, 0.5vw + 0.75rem, 1.25rem)",
  "body":       "1rem",
  "body-sm":    "0.875rem",
  "caption":    "0.75rem",
  "overline":   "0.6875rem",
  "code":       "0.875rem",
};

const weightMap: Record<TextVariant, number> = {
  "display-lg": 800,
  "display":    700,
  "h1":         700,
  "h2":         600,
  "h3":         600,
  "h4":         600,
  "h5":         500,
  "h6":         500,
  "body-lg":    400,
  "body":       400,
  "body-sm":    400,
  "caption":    400,
  "overline":   600,
  "code":       400,
};

const lineHeightMap: Record<TextVariant, string> = {
  "display-lg": "1.1",
  "display":    "1.1",
  "h1":         "1.2",
  "h2":         "1.25",
  "h3":         "1.3",
  "h4":         "1.35",
  "h5":         "1.4",
  "h6":         "1.4",
  "body-lg":    "1.7",
  "body":       "1.6",
  "body-sm":    "1.6",
  "caption":    "1.5",
  "overline":   "1.4",
  "code":       "1.5",
};

const fontStacks: Record<TextFont, string> = {
  sans:  "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', ui-serif, serif",
  mono:  "var(--font-geist-mono), ui-monospace, monospace",
};

export function Text({
  variant = "body",
  font,
  as,
  theme,
  style,
  className,
  children,
  ...props
}: TextProps) {
  const Tag = (as ?? elementMap[variant]) as ElementType;
  const isCode = variant === "code";
  const resolvedFont = isCode
    ? fontStacks.mono
    : font
    ? fontStacks[font]
    : undefined;

  return (
    <Tag
      {...(theme ? { "data-bt-theme": theme } : {})}
      style={{
        fontSize:   sizeMap[variant],
        fontWeight: weightMap[variant],
        lineHeight: lineHeightMap[variant],
        ...(resolvedFont ? { fontFamily: resolvedFont } : {}),
        ...(variant === "overline"
          ? { textTransform: "uppercase" as const, letterSpacing: "0.1em" }
          : {}),
        ...style,
      }}
      className={cn("text-[var(--bt-text-primary)]", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
`;

const headingsCode = `<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="h5">Heading 5</Text>
<Text variant="h6">Heading 6</Text>`;

const displayCode = `<Text variant="display-lg">Display Large</Text>
<Text variant="display">Display</Text>`;

const bodyCode = `<Text variant="body-lg">Body Large - slightly larger paragraph text.</Text>
<Text variant="body">Body - standard paragraph text.</Text>
<Text variant="body-sm">Body Small - compact secondary text.</Text>
<Text variant="caption">Caption - tiny label or image caption.</Text>
<Text variant="overline">Overline label</Text>
<Text variant="code">const x = 42;</Text>`;

const fontCode = `<Text variant="h3" font="sans">Sans-serif heading</Text>
<Text variant="h3" font="serif">Serif heading</Text>
<Text variant="h3" font="mono">Mono heading</Text>`;

const asCode = `{/* Renders a <div> but looks like an h2 */}
<Text variant="h2" as="div">Styled as h2, renders as div</Text>`;

const propsData: PropRow[] = [
  {
    prop: "variant",
    type: '"display-lg" | "display" | "h1"-"h6" | "body-lg" | "body" | "body-sm" | "caption" | "overline" | "code"',
    defaultValue: '"body"',
    description: "Typography style and scale. Determines font size, weight, line height, and default HTML element.",
  },
  {
    prop: "font",
    type: '"sans" | "serif" | "mono"',
    defaultValue: "-",
    description: 'Named font stack. "code" variant always uses mono regardless of this prop.',
  },
  {
    prop: "as",
    type: "keyof JSX.IntrinsicElements",
    defaultValue: "auto",
    description: "Override the rendered HTML element while keeping variant styles (e.g. as=\"div\" for SEO control).",
  },
  {
    prop: "theme",
    type: '"dark" | "warm" | "plain"',
    defaultValue: "-",
    description: "Overrides the inherited theme for this element.",
  },
];

export default function TextPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Text</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A typographic component with 14 variants, fluid clamp() sizing, and named font stacks.
          Server-component safe.
        </p>
      </div>

      <InstallCommand componentName="text" />

      <ComponentPreview title="Headings" description="h1-h6 with fluid clamp() sizing" code={headingsCode}>
        <div className="flex flex-col gap-2 w-full">
          <Text variant="h1">Heading 1</Text>
          <Text variant="h2">Heading 2</Text>
          <Text variant="h3">Heading 3</Text>
          <Text variant="h4">Heading 4</Text>
          <Text variant="h5">Heading 5</Text>
          <Text variant="h6">Heading 6</Text>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Display" description="Larger-than-h1 for hero sections" code={displayCode}>
        <div className="flex flex-col gap-2 w-full">
          <Text variant="display-lg">Display Large</Text>
          <Text variant="display">Display</Text>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Body & Utility" description="Paragraph and label variants" code={bodyCode}>
        <div className="flex flex-col gap-3 w-full">
          <Text variant="body-lg">Body Large - slightly larger paragraph text.</Text>
          <Text variant="body">Body - standard paragraph text.</Text>
          <Text variant="body-sm">Body Small - compact secondary text.</Text>
          <Text variant="caption">Caption - tiny label or image caption.</Text>
          <Text variant="overline">Overline label</Text>
          <Text variant="code">const x = 42;</Text>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Font Stacks" description="font prop switches between sans, serif, mono" code={fontCode}>
        <div className="flex flex-col gap-2 w-full">
          <Text variant="h3" font="sans">Sans-serif heading</Text>
          <Text variant="h3" font="serif">Serif heading</Text>
          <Text variant="h3" font="mono">Mono heading</Text>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Element Override (as prop)" description="Keep variant styles, change the HTML element" code={asCode}>
        <Text variant="h2" as="div">Styled as h2, renders as div</Text>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Text.tsx" />
    </div>
  );
}

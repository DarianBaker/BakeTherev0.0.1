"use client";

import { Text } from "@/components/bakethere/primitives/text";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const headingsCode = `<Text variant="h1">Heading 1</Text>
<Text variant="h2">Heading 2</Text>
<Text variant="h3">Heading 3</Text>
<Text variant="h4">Heading 4</Text>
<Text variant="h5">Heading 5</Text>
<Text variant="h6">Heading 6</Text>`;

const displayCode = `<Text variant="display-lg">Display Large</Text>
<Text variant="display">Display</Text>`;

const bodyCode = `<Text variant="body-lg">Body Large — slightly larger paragraph text.</Text>
<Text variant="body">Body — standard paragraph text.</Text>
<Text variant="body-sm">Body Small — compact secondary text.</Text>
<Text variant="caption">Caption — tiny label or image caption.</Text>
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
    type: '"display-lg" | "display" | "h1"–"h6" | "body-lg" | "body" | "body-sm" | "caption" | "overline" | "code"',
    defaultValue: '"body"',
    description: "Typography style and scale. Determines font size, weight, and default HTML element.",
  },
  {
    prop: "font",
    type: '"sans" | "serif" | "mono"',
    defaultValue: "—",
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
    defaultValue: "—",
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

      <ComponentPreview title="Headings" description="h1–h6 with fluid clamp() sizing" code={headingsCode}>
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
          <Text variant="body-lg">Body Large — slightly larger paragraph text.</Text>
          <Text variant="body">Body — standard paragraph text.</Text>
          <Text variant="body-sm">Body Small — compact secondary text.</Text>
          <Text variant="caption">Caption — tiny label or image caption.</Text>
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
    </div>
  );
}

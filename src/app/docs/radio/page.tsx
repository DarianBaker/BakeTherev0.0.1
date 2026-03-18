"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/bakethere/primitives/radio";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const basicCode = `<RadioGroup defaultValue="option-1">
  <RadioGroupItem value="option-1" label="Option One" />
  <RadioGroupItem value="option-2" label="Option Two" />
  <RadioGroupItem value="option-3" label="Option Three" />
</RadioGroup>`;

const controlledCode = `const [plan, setPlan] = useState("monthly");

<RadioGroup value={plan} onValueChange={setPlan}>
  <RadioGroupItem value="monthly" label="Monthly billing" />
  <RadioGroupItem value="yearly" label="Yearly billing" />
</RadioGroup>`;

const disabledItemCode = `<RadioGroup defaultValue="option-1">
  <RadioGroupItem value="option-1" label="Available" />
  <RadioGroupItem value="option-2" label="Disabled item" disabled />
  <RadioGroupItem value="option-3" label="Also available" />
</RadioGroup>`;

const disabledGroupCode = `<RadioGroup defaultValue="option-1" disabled>
  <RadioGroupItem value="option-1" label="Option One" />
  <RadioGroupItem value="option-2" label="Option Two" />
</RadioGroup>`;

const groupPropsData: PropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "Controlled selected value." },
  { prop: "defaultValue", type: "string", defaultValue: '""', description: "Initial selected value for uncontrolled usage." },
  { prop: "onValueChange", type: "(value: string) => void", defaultValue: "-", description: "Callback when the selected value changes." },
  { prop: "name", type: "string", defaultValue: "auto (useId)", description: "HTML name attribute shared by all radio inputs in the group. Defaults to a unique generated ID." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables the entire group." },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the inherited theme." },
];

const itemPropsData: PropRow[] = [
  { prop: "value", type: "string", defaultValue: "-", description: "The value this item represents (required)." },
  { prop: "label", type: "string", defaultValue: "-", description: "Visible label text (required)." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables this item individually." },
];

export default function RadioPage() {
  const [plan, setPlan] = useState("monthly");

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">RadioGroup</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A compound radio group with keyboard arrow-key navigation, controlled/uncontrolled support, and accessible hidden inputs.
        </p>
      </div>

      <ComponentPreview title="Basic" code={basicCode}>
        <RadioGroup defaultValue="option-1">
          <RadioGroupItem value="option-1" label="Option One" />
          <RadioGroupItem value="option-2" label="Option Two" />
          <RadioGroupItem value="option-3" label="Option Three" />
        </RadioGroup>
      </ComponentPreview>

      <ComponentPreview title="Controlled" code={controlledCode}>
        <div className="flex flex-col gap-4">
          <RadioGroup value={plan} onValueChange={setPlan}>
            <RadioGroupItem value="monthly" label="Monthly billing" />
            <RadioGroupItem value="yearly" label="Yearly billing" />
          </RadioGroup>
          <p className="text-sm text-[var(--bt-text-secondary)]">
            Selected: <span className="font-medium text-[var(--bt-text-primary)]">{plan}</span>
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Disabled Item" code={disabledItemCode}>
        <RadioGroup defaultValue="option-1">
          <RadioGroupItem value="option-1" label="Available" />
          <RadioGroupItem value="option-2" label="Disabled item" disabled />
          <RadioGroupItem value="option-3" label="Also available" />
        </RadioGroup>
      </ComponentPreview>

      <ComponentPreview title="Disabled Group" code={disabledGroupCode}>
        <RadioGroup defaultValue="option-1" disabled>
          <RadioGroupItem value="option-1" label="Option One" />
          <RadioGroupItem value="option-2" label="Option Two" />
        </RadioGroup>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">RadioGroup Props</h2>
        <PropsTable rows={groupPropsData} />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">RadioGroupItem Props</h2>
        <PropsTable rows={itemPropsData} />
      </div>
    </div>
  );
}

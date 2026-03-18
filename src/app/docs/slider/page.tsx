"use client";

import { useState } from "react";
import { Slider } from "@/components/bakethere/primitives/slider";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const defaultCode = `<Slider defaultValue={40} />`;

const controlledCode = `const [volume, setVolume] = useState(60);

<div className="flex flex-col gap-2">
  <Slider value={volume} onChange={setVolume} />
  <p className="text-sm text-[var(--bt-text-secondary)]">Value: {volume}</p>
</div>`;

const minMaxStepCode = `<Slider defaultValue={25} min={0} max={200} step={25} />`;

const disabledCode = `<Slider defaultValue={30} disabled />`;

const propsData: PropRow[] = [
  { prop: "value", type: "number", defaultValue: "-", description: "Controlled value." },
  { prop: "defaultValue", type: "number", defaultValue: "50", description: "Initial value for uncontrolled usage." },
  { prop: "min", type: "number", defaultValue: "0", description: "Minimum value." },
  { prop: "max", type: "number", defaultValue: "100", description: "Maximum value." },
  { prop: "step", type: "number", defaultValue: "1", description: "Step increment." },
  { prop: "disabled", type: "boolean", defaultValue: "false", description: "Disables the slider." },
  { prop: "onChange", type: "(value: number) => void", defaultValue: "-", description: "Callback when the value changes." },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "context", description: "Overrides the inherited theme." },
];

export default function SliderPage() {
  const [volume, setVolume] = useState(60);

  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Slider</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A range slider with a filled track, custom thumb, controlled/uncontrolled support, and cross-browser styling via globals.css.
        </p>
      </div>

      <ComponentPreview title="Default" code={defaultCode}>
        <Slider defaultValue={40} />
      </ComponentPreview>

      <ComponentPreview title="Controlled with Value Display" code={controlledCode}>
        <div className="flex flex-col gap-2 w-full">
          <Slider value={volume} onChange={setVolume} />
          <p className="text-sm text-[var(--bt-text-secondary)]">
            Value: <span className="font-medium text-[var(--bt-text-primary)]">{volume}</span>
          </p>
        </div>
      </ComponentPreview>

      <ComponentPreview title="Min / Max / Step" code={minMaxStepCode}>
        <Slider defaultValue={25} min={0} max={200} step={25} />
      </ComponentPreview>

      <ComponentPreview title="Disabled" code={disabledCode}>
        <Slider defaultValue={30} disabled />
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>
    </div>
  );
}

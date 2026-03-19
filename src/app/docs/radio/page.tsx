"use client";

import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/bakethere/primitives/radio";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";

const SOURCE = `"use client";

import {
  createContext,
  useContext,
  useId,
  useState,
  useCallback,
  useRef,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { useBakeThereTheme } from "../../provider";
import type { RadioGroupProps, RadioGroupItemProps } from "./radio.types";

interface RadioContextValue {
  value: string;
  setSelected: (value: string) => void;
  name: string;
  groupDisabled: boolean;
}

const RadioContext = createContext<RadioContextValue | null>(null);

function useRadioContext() {
  const ctx = useContext(RadioContext);
  if (!ctx) throw new Error("RadioGroupItem must be used inside <RadioGroup>");
  return ctx;
}

export function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  name,
  disabled = false,
  theme,
  className,
  children,
}: RadioGroupProps) {
  const { theme: contextTheme } = useBakeThereTheme();
  const activeTheme = theme ?? contextTheme;
  const groupRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const generatedName = useId();
  const groupName = name ?? generatedName;

  const setSelected = useCallback(
    (val: string) => {
      if (controlledValue === undefined) setInternalValue(val);
      onValueChange?.(val);
    },
    [controlledValue, onValueChange]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const inputs = groupRef.current?.querySelectorAll<HTMLInputElement>(
        'input[type="radio"]:not(:disabled)'
      );
      if (!inputs || inputs.length === 0) return;
      const arr = Array.from(inputs);
      const idx = arr.findIndex((el) => el.value === value);

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const next = arr[(idx + 1) % arr.length];
        next.focus();
        setSelected(next.value);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = arr[(idx - 1 + arr.length) % arr.length];
        prev.focus();
        setSelected(prev.value);
      }
    },
    [value, setSelected]
  );

  return (
    <RadioContext.Provider
      value={{ value, setSelected, name: groupName, groupDisabled: disabled }}
    >
      <div
        ref={groupRef}
        data-bt-theme={activeTheme}
        role="radiogroup"
        onKeyDown={handleKeyDown}
        className={cn("flex flex-col gap-2", className)}
      >
        {children}
      </div>
    </RadioContext.Provider>
  );
}

export function RadioGroupItem({
  value,
  label,
  disabled: itemDisabled = false,
  className,
}: RadioGroupItemProps) {
  const { value: selectedValue, setSelected, name, groupDisabled } =
    useRadioContext();
  const isSelected = selectedValue === value;
  const isDisabled = groupDisabled || itemDisabled;

  return (
    <label
      className={cn(
        "flex items-center gap-2 cursor-pointer select-none",
        isDisabled && "opacity-[var(--bt-disabled-opacity)] pointer-events-none",
        className
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        disabled={isDisabled}
        onChange={() => setSelected(value)}
        className="sr-only peer"
      />
      <div
        aria-hidden="true"
        className={cn(
          "h-4 w-4 rounded-full border-2 flex items-center justify-center",
          "transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--bt-ring)] peer-focus-visible:ring-offset-1",
          isSelected
            ? "border-[var(--bt-accent)]"
            : "border-[var(--bt-border)]"
        )}
      >
        {isSelected && (
          <div className="h-2 w-2 rounded-full bg-[var(--bt-accent)]" />
        )}
      </div>
      <span className="text-sm text-[var(--bt-text-primary)]">{label}</span>
    </label>
  );
}
`;

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

      <SourceSection source={SOURCE} filename="Radio.tsx" />
    </div>
  );
}

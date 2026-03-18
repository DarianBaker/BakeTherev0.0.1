"use client";

import {
  createContext,
  useContext,
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

  const groupName = name ?? "bt-radio-group";

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

import type { BtTheme } from "../../types";

export type CheckboxSize = "sm" | "md" | "lg";

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: CheckboxSize;
  theme?: BtTheme;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

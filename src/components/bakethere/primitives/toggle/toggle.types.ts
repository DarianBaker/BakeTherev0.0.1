import type { BtTheme } from "../../types";

export type ToggleSize = "sm" | "md" | "lg";

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  size?: ToggleSize;
  theme?: BtTheme;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

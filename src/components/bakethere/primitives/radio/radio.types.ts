import type { ReactNode } from "react";
import type { BtTheme } from "../../types";

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  theme?: BtTheme;
  className?: string;
  children?: ReactNode;
}

export interface RadioGroupItemProps {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
}

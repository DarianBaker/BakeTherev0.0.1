import type { BtTheme } from "../../types";

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  theme?: BtTheme;
  className?: string;
}

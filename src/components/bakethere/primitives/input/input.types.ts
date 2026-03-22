import type { InputHTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export type InputState = "default" | "error" | "disabled";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  theme?: BtTheme;
  label?: string;
  helperText?: string;
  errorText?: string;
  leftAddon?: ReactNode;
  rightAddon?: ReactNode;
  state?: InputState;
}

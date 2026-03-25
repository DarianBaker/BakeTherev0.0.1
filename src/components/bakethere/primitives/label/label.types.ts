import type { LabelHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  theme?: BtTheme;
  required?: boolean;
}

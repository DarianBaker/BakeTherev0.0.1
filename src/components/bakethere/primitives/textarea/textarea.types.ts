import type { TextareaHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  theme?: BtTheme;
  autoResize?: boolean;
  maxRows?: number;
}

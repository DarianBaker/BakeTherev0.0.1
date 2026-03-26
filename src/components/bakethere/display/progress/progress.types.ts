import type { HTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "error";
  theme?: BtTheme;
}

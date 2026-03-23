import type { HTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export type TooltipSide = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  delay?: number;
  theme?: BtTheme;
  className?: string;
  children: ReactNode;
}

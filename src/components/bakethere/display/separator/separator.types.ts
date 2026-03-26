import type { HTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export type SeparatorOrientation = "horizontal" | "vertical";

export interface SeparatorProps extends HTMLAttributes<HTMLElement> {
  orientation?: SeparatorOrientation;
  theme?: BtTheme;
}

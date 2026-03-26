import type { HTMLAttributes, ReactElement, ReactNode } from "react";
import type { BtTheme } from "../../types";

export interface PopoverProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  theme?: BtTheme;
  children: ReactNode;
}

export interface PopoverTriggerProps {
  children: ReactElement;
}

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

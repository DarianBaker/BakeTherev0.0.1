import type { HTMLAttributes, ButtonHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  theme?: BtTheme;
}

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export interface AccordionTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {}

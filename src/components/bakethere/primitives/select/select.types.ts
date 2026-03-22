import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  theme?: BtTheme;
  children: ReactNode;
}

export interface SelectTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
}

export type SelectContentProps = HTMLAttributes<HTMLDivElement>;

export interface SelectItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  disabled?: boolean;
}

export type SelectGroupProps = HTMLAttributes<HTMLDivElement>;

export interface SelectLabelProps extends HTMLAttributes<HTMLParagraphElement> {}

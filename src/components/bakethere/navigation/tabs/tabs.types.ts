import type { HTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export type TabsVariant = "line" | "pill";

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  theme?: BtTheme;
  className?: string;
  children: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  disabled?: boolean;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export interface DropdownMenuProps {
  children: ReactNode;
  theme?: BtTheme;
}

export interface DropdownMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export interface DropdownMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  align?: "start" | "end" | "center";
}

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean;
}

export interface DropdownMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export interface DropdownMenuLabelProps extends HTMLAttributes<HTMLDivElement> {}

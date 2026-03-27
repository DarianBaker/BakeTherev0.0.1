import type { HTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  side?: "left" | "right";
  closeOnBackdrop?: boolean;
  size?: "sm" | "md" | "lg";
  theme?: BtTheme;
  className?: string;
  children: ReactNode;
}

export interface SidebarTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {}
export interface SidebarContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface SidebarBodyProps extends HTMLAttributes<HTMLDivElement> {}
export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {}
export interface SidebarCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

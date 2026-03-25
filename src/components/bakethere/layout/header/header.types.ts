import type { HTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  variant?: "flat" | "bordered" | "elevated";
  scrollFade?: boolean;
  theme?: BtTheme;
}

export interface HeaderBrandProps extends HTMLAttributes<HTMLDivElement> {}
export interface HeaderNavProps extends HTMLAttributes<HTMLElement> {}
export interface HeaderActionsProps extends HTMLAttributes<HTMLDivElement> {}

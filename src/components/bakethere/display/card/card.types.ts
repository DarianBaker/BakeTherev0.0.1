import type { HTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  theme?: BtTheme;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}
export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

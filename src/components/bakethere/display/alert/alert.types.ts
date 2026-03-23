import type { HTMLAttributes, ReactNode } from "react";
import type { BtTheme } from "../../types";

export type AlertVariant = "default" | "info" | "success" | "warning" | "error";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  icon?: ReactNode;
  theme?: BtTheme;
}

export type AlertTitleProps = HTMLAttributes<HTMLParagraphElement>;
export type AlertDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

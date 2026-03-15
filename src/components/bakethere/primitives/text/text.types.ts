import type { HTMLAttributes, JSX } from "react";
import type { BtTheme } from "../../types";

export type TextVariant =
  | "display-lg"
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-lg"
  | "body"
  | "body-sm"
  | "caption"
  | "overline"
  | "code";

export type TextFont = "sans" | "serif" | "mono";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  font?: TextFont;
  as?: keyof JSX.IntrinsicElements;
  theme?: BtTheme;
}

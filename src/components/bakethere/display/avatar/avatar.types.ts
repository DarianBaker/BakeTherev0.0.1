import type { HTMLAttributes, ImgHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  size?: AvatarSize;
  theme?: BtTheme;
}

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {}

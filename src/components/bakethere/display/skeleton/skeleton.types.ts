import type { ReactNode } from "react";

export type SkeletonShape = "line" | "rect" | "circle";

export interface SkeletonProps {
  shape?: SkeletonShape;
  width?: string | number;
  height?: string | number;
  className?: string;
  children?: ReactNode;
}

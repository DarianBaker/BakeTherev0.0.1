import { cn } from "@/lib/utils";
import type { SkeletonProps } from "./skeleton.types";

const shapeClasses: Record<string, string> = {
  line:   "h-4 w-full rounded-full",
  rect:   "rounded-[var(--bt-radius-md)]",
  circle: "rounded-full",
};

export function Skeleton({ shape = "line", width, height, className }: SkeletonProps) {
  return (
    <div
      style={{
        width:  width  ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
        height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
        background: "linear-gradient(90deg, var(--bt-bg-muted) 25%, var(--bt-bg-elevated) 50%, var(--bt-bg-muted) 75%)",
        backgroundSize: "200% 100%",
        animation: "bt-shimmer 1.5s ease-in-out infinite",
      }}
      className={cn(shapeClasses[shape], className)}
    />
  );
}

import { cn } from "@/lib/utils";
import type { SkeletonProps } from "./skeleton.types";

const shapeClasses: Record<string, string> = {
  line:   "h-4 w-full rounded-full",
  rect:   "rounded-[var(--bt-radius-md)]",
  circle: "rounded-full",
};

export function Skeleton({ shape = "line", width, height, className, children }: SkeletonProps) {
  const sizeStyle = {
    width:  width  ? (typeof width  === "number" ? `${width}px`  : width)  : undefined,
    height: height ? (typeof height === "number" ? `${height}px` : height) : undefined,
  };

  if (children !== undefined) {
    return (
      <div className={cn("bt-skeleton-wrap", className)} style={sizeStyle}>
        {children}
      </div>
    );
  }

  return (
    <div
      style={{
        ...sizeStyle,
        background: "linear-gradient(90deg, var(--bt-skeleton-base) 25%, var(--bt-skeleton-highlight) 50%, var(--bt-skeleton-base) 75%)",
        backgroundSize: "200% 100%",
        animation: "bt-shimmer 1.5s ease-in-out infinite",
      }}
      className={cn(shapeClasses[shape], className)}
    />
  );
}

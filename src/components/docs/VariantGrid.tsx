import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface VariantGridProps {
  children: ReactNode;
  className?: string;
}

export function VariantGrid({ children, className }: VariantGridProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {children}
    </div>
  );
}

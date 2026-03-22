import { cn } from "@/lib/utils";
import type { ButtonGroupProps } from "./button-group.types";

export function ButtonGroup({ className, children, ...props }: ButtonGroupProps) {
  return (
    <div className={cn("bt-button-group", className)} {...props}>
      {children}
    </div>
  );
}

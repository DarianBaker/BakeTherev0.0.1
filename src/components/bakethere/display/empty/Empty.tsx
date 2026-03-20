import { cn } from "@/lib/utils";
import type { EmptyProps } from "./empty.types";

const DefaultIcon = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7" />
    <path d="M2 13h4l2 3h8l2-3h4" />
  </svg>
);

export function Empty({ title, description, icon, action, className }: EmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 max-w-xs mx-auto text-center py-12",
        className
      )}
    >
      <div className="text-[var(--bt-text-muted)]">
        {icon ?? <DefaultIcon />}
      </div>
      <h3 className="text-base font-semibold text-[var(--bt-text-primary)]">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--bt-text-muted)]">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

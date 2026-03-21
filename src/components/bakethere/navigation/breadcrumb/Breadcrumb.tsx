import { cn } from "@/lib/utils";
import type {
  BreadcrumbProps,
  BreadcrumbItemProps,
  BreadcrumbSeparatorProps,
} from "./breadcrumb.types";

export function Breadcrumb({ className, children, ...props }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("", className)} {...props}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--bt-text-muted)]">
        {children}
      </ol>
    </nav>
  );
}

export function BreadcrumbItem({
  href,
  isCurrentPage = false,
  className,
  children,
  ...props
}: BreadcrumbItemProps) {
  if (isCurrentPage) {
    return (
      <li aria-current="page" className={cn("font-medium text-[var(--bt-text-primary)]", className)}>
        {children}
      </li>
    );
  }
  return (
    <li className={cn("", className)}>
      <a
        href={href}
        className="transition-colors hover:text-[var(--bt-text-primary)]"
        {...props}
      >
        {children}
      </a>
    </li>
  );
}

export function BreadcrumbSeparator({
  separator = "/",
  className,
  ...props
}: BreadcrumbSeparatorProps) {
  return (
    <li aria-hidden="true" className={cn("text-[var(--bt-text-muted)]", className)} {...props}>
      {separator}
    </li>
  );
}

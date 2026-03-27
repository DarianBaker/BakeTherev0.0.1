import { cn } from "@/lib/utils";
import type {
  TableProps, TableHeaderProps, TableBodyProps, TableFooterProps,
  TableRowProps, TableHeadProps, TableCellProps, TableCaptionProps,
} from "./table.types";

export function Table({ striped = false, theme, className, children, ...props }: TableProps) {
  return (
    <div
      {...(theme ? { "data-bt-theme": theme } : {})}
      className="w-full overflow-auto rounded-[var(--bt-radius-md)] border border-[var(--bt-border)]"
    >
      <table
        className={cn(
          "w-full caption-bottom text-sm text-[var(--bt-text-primary)]",
          striped && "[&_tbody_tr:nth-child(odd)]:bg-[var(--bt-bg-muted)]",
          className
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ sticky = false, className, children, ...props }: TableHeaderProps) {
  return (
    <thead
      className={cn(
        "bg-[var(--bt-bg-elevated)] text-[var(--bt-text-secondary)]",
        sticky && "sticky top-0 z-10",
        className
      )}
      {...props}
    >
      {children}
    </thead>
  );
}

export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn("divide-y divide-[var(--bt-border)]", className)} {...props}>
      {children}
    </tbody>
  );
}

export function TableFooter({ className, children, ...props }: TableFooterProps) {
  return (
    <tfoot
      className={cn("bg-[var(--bt-bg-elevated)] text-[var(--bt-text-secondary)] font-medium", className)}
      {...props}
    >
      {children}
    </tfoot>
  );
}

export function TableRow({ className, children, ...props }: TableRowProps) {
  return (
    <tr
      className={cn(
        "border-b border-[var(--bt-border)] transition-colors hover:bg-[var(--bt-hover-bg)]",
        className
      )}
      {...props}
    >
      {children}
    </tr>
  );
}

export function TableHead({ className, children, ...props }: TableHeadProps) {
  return (
    <th
      scope="col"
      className={cn(
        "h-10 px-4 text-left align-middle font-semibold text-xs uppercase tracking-wide text-[var(--bt-text-muted)]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }: TableCellProps) {
  return (
    <td className={cn("px-4 py-3 align-middle", className)} {...props}>
      {children}
    </td>
  );
}

export function TableCaption({ className, children, ...props }: TableCaptionProps) {
  return (
    <caption className={cn("mt-4 text-sm text-[var(--bt-text-muted)] text-center", className)} {...props}>
      {children}
    </caption>
  );
}

"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/bakethere/data/table";
import { Badge } from "@/components/bakethere/display/badge";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";
import { SourceSection } from "@/components/docs/SourceSection";
import { InstallCommand } from "@/components/docs/InstallCommand";

const SOURCE = `import { cn } from "@/lib/utils";
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
`;

const basicTableCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell className="text-[var(--bt-text-muted)]">{user.email}</TableCell>
        <TableCell>
          <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableCaption>A list of team members.</TableCaption>
</Table>`;

const stripedTableCode = `<Table striped>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.email}>
        <TableCell>{user.name}</TableCell>
        <TableCell className="text-[var(--bt-text-muted)]">{user.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>`;

const propsData: PropRow[] = [
  { prop: "striped", type: "boolean", defaultValue: "false", description: "Alternates row background on odd rows" },
  { prop: "sticky", type: "boolean", defaultValue: "false", description: "TableHeader: sticks to top when scrolling" },
  { prop: "theme", type: '"dark" | "warm" | "plain"', defaultValue: "-", description: "Overrides the theme" },
];

const users = [
  { name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
  { name: "Bob Smith", email: "bob@example.com", role: "User" },
  { name: "Carol White", email: "carol@example.com", role: "Editor" },
  { name: "Dave Brown", email: "dave@example.com", role: "User" },
];

export default function TablePage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">Table</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          A semantic table component with striped rows and sticky header support. Server-component safe.
        </p>
      </div>

      <InstallCommand componentName="table" />

      <ComponentPreview title="Basic Table" code={basicTableCode}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-[var(--bt-text-muted)]">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableCaption>A list of team members.</TableCaption>
        </Table>
      </ComponentPreview>

      <ComponentPreview title="Striped Rows" code={stripedTableCode}>
        <Table striped>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.name}</TableCell>
                <TableCell className="text-[var(--bt-text-muted)]">{user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ComponentPreview>

      <div>
        <h2 className="text-xl font-semibold text-[var(--bt-text-primary)] mb-4">Props</h2>
        <PropsTable rows={propsData} />
      </div>

      <SourceSection source={SOURCE} filename="Table.tsx" />
    </div>
  );
}

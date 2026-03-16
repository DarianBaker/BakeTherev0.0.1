"use client";

import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption } from "@/components/bakethere/data/table";
import { Badge } from "@/components/bakethere/display/badge";
import { ComponentPreview } from "@/components/docs/ComponentPreview";
import { PropsTable, type PropRow } from "@/components/docs/PropsTable";

const tableCode = `// Table.tsx (server-component safe)
import { cn } from "@/lib/utils";

export function Table({ striped = false, theme, className, children, ...props }) {
  return (
    <div {...(theme ? { "data-bt-theme": theme } : {})} className="w-full overflow-auto rounded-[var(--bt-radius-md)] border border-[var(--bt-border)]">
      <table className={cn("w-full caption-bottom text-sm text-[var(--bt-text-primary)]",
        striped && "[&_tbody_tr:nth-child(odd)]:bg-[var(--bt-bg-muted)]", className)} {...props}>
        {children}
      </table>
    </div>
  );
}
// TableHeader (sticky prop), TableBody, TableFooter
// TableRow, TableHead (scope="col"), TableCell
// TableCaption`;

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

      <ComponentPreview title="Basic Table" code={tableCode}>
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

      <ComponentPreview title="Striped Rows" code={tableCode}>
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
    </div>
  );
}

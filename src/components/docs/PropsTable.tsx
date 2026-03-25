import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/bakethere/data/table";

export interface PropRow {
  prop: string;
  type: string;
  defaultValue: string;
  description: string;
}

interface PropsTableProps {
  rows: PropRow[];
}

export function PropsTable({ rows }: PropsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.prop}>
            <TableCell>
              <code className="text-xs font-mono bg-[var(--bt-bg-muted)] px-1.5 py-0.5 rounded text-[var(--bt-accent)]">
                {row.prop}
              </code>
            </TableCell>
            <TableCell>
              <code className="text-xs font-mono text-[var(--bt-text-secondary)]">{row.type}</code>
            </TableCell>
            <TableCell>
              <code className="text-xs font-mono text-[var(--bt-text-muted)]">{row.defaultValue}</code>
            </TableCell>
            <TableCell className="text-sm text-[var(--bt-text-secondary)]">{row.description}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

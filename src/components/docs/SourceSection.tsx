import { CodeBlock } from "./CodeBlock";

interface SourceSectionProps {
  source: string;
  filename: string;
}

export function SourceSection({ source, filename }: SourceSectionProps) {
  return (
    <div className="rounded-[var(--bt-radius-lg)] border border-[var(--bt-border)] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--bt-border)] bg-[var(--bt-bg-surface)]">
        <span className="text-sm font-semibold text-[var(--bt-text-primary)]">Component source</span>
        <span className="text-xs font-mono text-[var(--bt-text-muted)] bg-[var(--bt-bg-muted)] px-2 py-0.5 rounded-[var(--bt-radius-sm)]">
          {filename}
        </span>
      </div>
      <CodeBlock code={source} />
    </div>
  );
}

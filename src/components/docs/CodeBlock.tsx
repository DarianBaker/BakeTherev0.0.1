import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock({ code, className }: CodeBlockProps) {
  return (
    <div className="relative">
      <CopyButton text={code} />
      <pre
        className="overflow-x-auto bg-[var(--bt-bg-elevated)] text-[var(--bt-text-primary)] text-sm p-4 m-0 font-mono leading-relaxed"
        style={{ fontFamily: "var(--font-mono, monospace)" }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

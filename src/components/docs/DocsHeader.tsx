import { ThemeSwitcher } from "./ThemeSwitcher";

export function DocsHeader() {
  return (
    <header className="h-14 shrink-0 border-b border-[var(--bt-border)] bg-[var(--bt-bg-base)] flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-[var(--bt-text-primary)] tracking-tight">
          BakeThere
        </span>
        <span className="text-xs text-[var(--bt-text-muted)] font-mono">v1.0</span>
      </div>
      <ThemeSwitcher />
    </header>
  );
}

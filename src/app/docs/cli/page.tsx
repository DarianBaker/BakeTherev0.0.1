import { Card, CardHeader, CardContent } from "@/components/bakethere/display/card";
import { CodeBlock } from "@/components/docs/CodeBlock";

export default function CliPage() {
  return (
    <div className="p-8 max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[var(--bt-text-primary)]">CLI Reference</h1>
        <p className="mt-2 text-[var(--bt-text-secondary)]">
          <code className="font-mono text-[var(--bt-accent)]">npx bakethere</code> — copy components directly into your project. No package dependency. You own the source.
        </p>
      </div>

      {/* list */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">bakethere list</h2>
          <p className="text-sm text-[var(--bt-text-secondary)]">
            Shows all available components grouped by category. No options needed.
          </p>
        </CardHeader>
        <CardContent>
          <CodeBlock code="npx bakethere list" />
        </CardContent>
      </Card>

      {/* init */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">bakethere init</h2>
          <p className="text-sm text-[var(--bt-text-secondary)]">
            Sets up BakeThere in your project. Writes <code className="font-mono text-[var(--bt-accent)]">bakethere.json</code> and copies shared infrastructure files: <code className="font-mono text-[var(--bt-accent)]">tokens.css</code>, <code className="font-mono text-[var(--bt-accent)]">globals.css</code>, <code className="font-mono text-[var(--bt-accent)]">BakeThereProvider.tsx</code>, <code className="font-mono text-[var(--bt-accent)]">utils.ts</code>. Only needs to be run once.
          </p>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="text-xs font-medium text-[var(--bt-text-muted)] uppercase tracking-wider mb-2">Interactive — prompts for all paths</p>
            <CodeBlock code="npx bakethere init" />
          </div>
          <div>
            <p className="text-xs font-medium text-[var(--bt-text-muted)] uppercase tracking-wider mb-2">Silent — uses defaults (src/components/ui, src/styles)</p>
            <CodeBlock code="npx bakethere init --yes" />
          </div>
        </CardContent>
      </Card>

      {/* add */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold text-[var(--bt-text-primary)]">bakethere add</h2>
          <p className="text-sm text-[var(--bt-text-secondary)]">
            Copies one or more components into your project. Rewrites internal imports to match your path alias. The component files become yours to edit freely.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <p className="text-xs font-medium text-[var(--bt-text-muted)] uppercase tracking-wider mb-2">Add a single component</p>
              <CodeBlock code="npx bakethere add button" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--bt-text-muted)] uppercase tracking-wider mb-2">Add multiple at once</p>
              <CodeBlock code="npx bakethere add card dialog toast" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--bt-text-muted)] uppercase tracking-wider mb-2">Interactive picker — choose from all components</p>
              <CodeBlock code="npx bakethere add" />
            </div>
            <div>
              <p className="text-xs font-medium text-[var(--bt-text-muted)] uppercase tracking-wider mb-2">Overwrite existing files</p>
              <CodeBlock code="npx bakethere add button --overwrite" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--bt-text-primary)] mb-3">Flags</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--bt-border)]">
                  <th className="text-left py-2 pr-4 font-medium text-[var(--bt-text-muted)] text-xs uppercase tracking-wider">Flag</th>
                  <th className="text-left py-2 font-medium text-[var(--bt-text-muted)] text-xs uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[var(--bt-border)]">
                  <td className="py-2 pr-4">
                    <code className="font-mono text-xs bg-[var(--bt-bg-muted)] px-1.5 py-0.5 rounded text-[var(--bt-text-secondary)]">(no args)</code>
                  </td>
                  <td className="py-2 text-[var(--bt-text-secondary)]">Opens interactive multi-select picker</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">
                    <code className="font-mono text-xs bg-[var(--bt-bg-muted)] px-1.5 py-0.5 rounded text-[var(--bt-accent)]">--overwrite</code>
                  </td>
                  <td className="py-2 text-[var(--bt-text-secondary)]">Overwrite files that already exist in your project</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

"use client";

import { BakeThereProvider } from "@/components/bakethere/provider";
import { ToastProvider } from "@/components/bakethere/overlay/toast";
import { DocsHeader } from "@/components/docs/DocsHeader";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import type { ReactNode } from "react";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <BakeThereProvider defaultTheme="dark">
      <ToastProvider />
      <div className="flex flex-col h-screen bg-[var(--bt-bg-base)] text-[var(--bt-text-primary)]">
        <DocsHeader />
        <div className="flex flex-1 overflow-hidden">
          <DocsSidebar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </BakeThereProvider>
  );
}

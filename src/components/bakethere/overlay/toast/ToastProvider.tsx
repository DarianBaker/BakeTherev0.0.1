"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { Toast } from "./Toast";
import type { BtTheme } from "../../types";

interface ToastProviderProps {
  theme?: BtTheme;
}

export function ToastProvider({ theme }: ToastProviderProps) {
  const { toasts, dismiss } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      aria-label="Notifications"
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onDismiss={dismiss} theme={theme} />
      ))}
    </div>,
    document.body
  );
}

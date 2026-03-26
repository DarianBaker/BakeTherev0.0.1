"use client";

import { useSyncExternalStore, useCallback } from "react";
import type { ToastItem, ToastOptions } from "./toast.types";

let toasts: ToastItem[] = [];
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

const store = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): ToastItem[] {
    return toasts;
  },
};

function addToast(options: ToastOptions): string {
  const id = Math.random().toString(36).slice(2);
  toasts = [...toasts, { id, ...options }];
  notify();
  return id;
}

function removeToast(id: string): void {
  toasts = toasts.filter((t) => t.id !== id);
  notify();
}

export function useToast() {
  const items = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);

  const toast = useCallback((options: ToastOptions) => {
    return addToast(options);
  }, []);

  const dismiss = useCallback((id: string) => {
    removeToast(id);
  }, []);

  return { toasts: items, toast, dismiss };
}

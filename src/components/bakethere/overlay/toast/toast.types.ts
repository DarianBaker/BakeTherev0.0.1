import type { BtTheme } from "../../types";

export type ToastVariant = "default" | "success" | "destructive" | "warning";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export interface ToastProps extends ToastItem {
  onDismiss: (id: string) => void;
  theme?: BtTheme;
}

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

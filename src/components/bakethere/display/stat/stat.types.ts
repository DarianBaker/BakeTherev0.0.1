import type { BtTheme } from "../../types";

export type StatTrend = "up" | "down" | "neutral";

export interface StatProps {
  value: string | number;
  label: string;
  delta?: string;
  trend?: StatTrend;
  description?: string;
  theme?: BtTheme;
  className?: string;
}

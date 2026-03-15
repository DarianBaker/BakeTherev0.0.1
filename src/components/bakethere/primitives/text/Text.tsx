import type { ElementType, JSX } from "react";
import { cn } from "@/lib/utils";
import type { TextVariant, TextFont, TextProps } from "./text.types";

const elementMap: Record<TextVariant, keyof JSX.IntrinsicElements> = {
  "display-lg": "h1",
  "display":    "h1",
  "h1":         "h1",
  "h2":         "h2",
  "h3":         "h3",
  "h4":         "h4",
  "h5":         "h5",
  "h6":         "h6",
  "body-lg":    "p",
  "body":       "p",
  "body-sm":    "p",
  "caption":    "span",
  "overline":   "span",
  "code":       "code",
};

const sizeMap: Record<TextVariant, string> = {
  "display-lg": "clamp(3rem, 6vw + 1rem, 6rem)",
  "display":    "clamp(2.25rem, 4vw + 1rem, 4.5rem)",
  "h1":         "clamp(1.875rem, 3vw + 1rem, 3rem)",
  "h2":         "clamp(1.5rem, 2vw + 1rem, 2.25rem)",
  "h3":         "clamp(1.25rem, 1.5vw + 0.75rem, 1.875rem)",
  "h4":         "clamp(1.125rem, 1vw + 0.75rem, 1.5rem)",
  "h5":         "clamp(1rem, 0.5vw + 0.75rem, 1.25rem)",
  "h6":         "clamp(0.875rem, 0.5vw + 0.625rem, 1rem)",
  "body-lg":    "clamp(1rem, 0.5vw + 0.75rem, 1.25rem)",
  "body":       "1rem",
  "body-sm":    "0.875rem",
  "caption":    "0.75rem",
  "overline":   "0.6875rem",
  "code":       "0.875rem",
};

const weightMap: Record<TextVariant, number> = {
  "display-lg": 800,
  "display":    700,
  "h1":         700,
  "h2":         600,
  "h3":         600,
  "h4":         600,
  "h5":         500,
  "h6":         500,
  "body-lg":    400,
  "body":       400,
  "body-sm":    400,
  "caption":    400,
  "overline":   600,
  "code":       400,
};

const fontStacks: Record<TextFont, string> = {
  sans:  "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  serif: "Georgia, 'Times New Roman', ui-serif, serif",
  mono:  "var(--font-geist-mono), ui-monospace, monospace",
};

export function Text({
  variant = "body",
  font,
  as,
  theme,
  style,
  className,
  children,
  ...props
}: TextProps) {
  const Tag = (as ?? elementMap[variant]) as ElementType;
  const isCode = variant === "code";
  const resolvedFont = isCode
    ? fontStacks.mono
    : font
    ? fontStacks[font]
    : undefined;

  return (
    <Tag
      {...(theme ? { "data-bt-theme": theme } : {})}
      style={{
        fontSize:   sizeMap[variant],
        fontWeight: weightMap[variant],
        ...(resolvedFont ? { fontFamily: resolvedFont } : {}),
        ...(variant === "overline"
          ? { textTransform: "uppercase" as const, letterSpacing: "0.1em" }
          : {}),
        ...style,
      }}
      className={cn("text-[var(--bt-text-primary)]", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}

import type { HTMLAttributes, DialogHTMLAttributes, ReactNode, ButtonHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  theme?: BtTheme;
}

export interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

export interface DialogContentProps extends DialogHTMLAttributes<HTMLDialogElement> {
  onClose?: () => void;
}

export interface DialogHeaderProps extends HTMLAttributes<HTMLDivElement> {}
export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {}
export interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}
export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {}
export interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

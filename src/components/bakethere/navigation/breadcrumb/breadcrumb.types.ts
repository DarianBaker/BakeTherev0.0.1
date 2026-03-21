import type { HTMLAttributes, AnchorHTMLAttributes } from "react";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {}

export interface BreadcrumbItemProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  isCurrentPage?: boolean;
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLLIElement> {
  separator?: string;
}

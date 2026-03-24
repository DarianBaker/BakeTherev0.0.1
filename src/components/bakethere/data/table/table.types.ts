import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, TableHTMLAttributes } from "react";
import type { BtTheme } from "../../types";

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  theme?: BtTheme;
}

export interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  sticky?: boolean;
}

export interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableFooterProps extends HTMLAttributes<HTMLTableSectionElement> {}
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {}
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {}
export interface TableCaptionProps extends HTMLAttributes<HTMLTableCaptionElement> {}

import { ChipVariantProps } from "@nextui-org/react";

export type CellState = {
  name: string;
  color: ChipVariantProps["color"];
};

export interface DataTableColumnsMapping {
  [columnKey: string]: ColumnsDataTable[];
}

export type ColumnsDataTable = {
  field: string;
  header: string;
  type: DataTableRenderStrategy;
};

export type DataTableRenderStrategy = "currency" | "states" | "default";

interface RenderStrategy<T> {
  render: (props: T) => React.ReactNode;
}

export interface StateCellProps {
  complement: CellState[];
  value: unknown;
}

export interface CurrencyCellProps {
  value: unknown;
}

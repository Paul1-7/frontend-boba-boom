import {
  CurrencyCell,
  CellProps,
  DataTableRenderStrategy,
  RenderStrategy,
  StateCell,
  StateCellProps,
  DefaultCell,
} from "@/components";

export const renderStrategies: Record<
  DataTableRenderStrategy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RenderStrategy<any>
> = {
  default: {
    render: (props: CellProps) => <DefaultCell {...props} />,
  },
  currency: {
    render: (props: CellProps) => <CurrencyCell {...props} />,
  },
  states: {
    render: (props: StateCellProps) => <StateCell {...props} />,
  },
};

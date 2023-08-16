import {
  CurrencyCell,
  CurrencyCellProps,
  DataTableRenderStrategy,
  RenderStrategy,
  StateCell,
  StateCellProps,
} from "@/components";

export const renderStrategies: Record<
  DataTableRenderStrategy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RenderStrategy<any>
> = {
  default: {
    render: (props: CurrencyCellProps) => <CurrencyCell {...props} />,
  },
  currency: {
    render: (props: CurrencyCellProps) => <CurrencyCell {...props} />,
  },
  states: {
    render: (props: StateCellProps) => <StateCell {...props} />,
  },
};

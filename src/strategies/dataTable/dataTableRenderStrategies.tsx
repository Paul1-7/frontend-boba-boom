import {
  CurrencyCell,
  CellProps,
  DataTableRenderStrategy,
  RenderStrategy,
  StateCell,
  StateCellProps,
  DefaultCell,
  ActionCellProps,
  ActionCell,
  TimeCell
} from '@/components'

export const renderStrategies: Record<
  DataTableRenderStrategy,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RenderStrategy<any>
> = {
  default: {
    render: (props: CellProps) => <DefaultCell {...props} />
  },
  time: {
    render: (props: CellProps) => <TimeCell {...props} />
  },
  currency: {
    render: (props: CellProps) => <CurrencyCell {...props} />
  },
  states: {
    render: (props: StateCellProps) => <StateCell {...props} />
  },
  actions: {
    render: (props: ActionCellProps) => <ActionCell {...props} />
  }
}

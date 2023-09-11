import { ChipVariantProps } from '@nextui-org/react'
import { ReactElement } from 'react'

export type CellStateChip = {
  name: string
  color: ChipVariantProps['color']
}

export interface DataTableColumnsMapping {
  [columnKey: string]: ColumnsDataTable[]
}

export type ColumnsDataTable = {
  field: string
  header: string
  type: DataTableRenderStrategy
}

export type DataTableRenderStrategy =
  | 'currency'
  | 'states'
  | 'default'
  | 'actions'
  | 'time'

interface RenderStrategy<T> {
  render: (props: T) => React.ReactNode
}

export interface StateCellProps {
  complement: CellStateChip[] | { [key: string]: CellStateChip }
  value: unknown
}

interface ItemDropdown {
  label: string
  key: string
  icon?: ReactElement
}

export interface ActionCellProps {
  complement: {
    items: ItemDropdown[]
    onAction: (key: string, value: unknown) => void
  }
  value: unknown
}

export interface CellProps {
  value: unknown
}

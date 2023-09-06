import { renderStrategies } from '@/strategies'
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue
} from '@nextui-org/react'
import { v4 as uuid } from 'uuid'
import { ColumnsDataTable } from '.'
import { useMemo, useState } from 'react'
import { RESPONSE_MSG } from '@/constants'

interface CustomData {
  field: string
  complement: unknown
}

interface Props<T> {
  columns: ColumnsDataTable[]
  data: T[] | undefined
  customData?: CustomData[]
}

const DataTable = <T,>({ columns, data = [], customData }: Props<T>) => {
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const pages = Math.ceil(data.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return data.slice(start, end)
  }, [page, data])

  return (
    <Table
      aria-labelledby="table"
      bottomContent={
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      classNames={{
        wrapper: 'min-h-[444px]'
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.field}
            aria-labelledby={column.field}
            className="uppercase"
          >
            {column.header}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={items} emptyContent={RESPONSE_MSG.EMPTY_TABLE}>
        {(item: T) => (
          <TableRow key={uuid()}>
            {(columnValue) => {
              const column = columns.find(({ field }) => columnValue === field)

              const renderStrategy =
                renderStrategies?.[column?.type ?? 'default']

              const props = {
                value: '',
                complement: {}
              }

              const { complement } =
                customData?.find(({ field }) => field === column?.field) ?? {}

              props.value = getKeyValue(item, column?.field ?? '')
              if (complement) {
                props.complement = complement
              }

              return <TableCell>{renderStrategy.render(props)}</TableCell>
            }}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

export default DataTable

import { DataTable } from '@/components'
import { COLUMNS_DATA_TABLE, DASHBOARD_CONTENT } from '@/constants'
import { MainDashboardContainer } from '@/layout'
import { listOrdersToReport } from '@/services'
import { formatCurrencyToBOB, sumByKey } from '@/utils'
import { useQuery } from '@tanstack/react-query'

const Sales = () => {
  const { data } = useQuery({
    queryKey: ['orders'],
    queryFn: listOrdersToReport
  })

  const total = data ? sumByKey(data, 'total') : 0

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.reports.order}>
      <DataTable columns={COLUMNS_DATA_TABLE.reports} data={data} />
      <p className="text-2xl font-semibold mt-4">
        Total del día: {formatCurrencyToBOB(total)}
      </p>
    </MainDashboardContainer>
  )
}

export default Sales

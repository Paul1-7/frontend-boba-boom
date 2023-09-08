import { DataTable } from '@/components'
import {
  COLUMNS_DATA_TABLE,
  DASHBOARD_CONTENT,
  TABLE_STATES
} from '@/constants'
import { OrderContext } from '@/context'
import { MainDashboardContainer } from '@/layout'
import { useContext } from 'react'

const Orders = () => {
  const { orderState } = useContext(OrderContext) ?? {}
  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.default}>
      <DataTable
        columns={COLUMNS_DATA_TABLE.orders}
        data={orderState?.orders}
        customData={[
          {
            field: 'estado',
            complement: TABLE_STATES.order
          }
        ]}
      />
    </MainDashboardContainer>
  )
}

export default Orders

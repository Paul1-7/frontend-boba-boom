import { DataTable } from '@/components'
import {
  ACTIONS_ORDER,
  COLUMNS_DATA_TABLE,
  DASHBOARD_CONTENT,
  ROUTES,
  SOCKETS_EVENTS,
  TABLE_STATES
} from '@/constants'
import { OrderContext, SocketContext } from '@/context'
import { MainDashboardContainer } from '@/layout'
import { deleteOrder } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Orders = () => {
  const { socket } = useContext(SocketContext) ?? {}
  const { orderState } = useContext(OrderContext) ?? {}
  const navigate = useNavigate()
  const deleteOrderData = useMutation({
    mutationFn: deleteOrder
  })

  const onActionsTable = (key: string, value: string) => {
    if (key === 'detail') {
      navigate(`${ROUTES.orders.detail}/${value}`)
      return
    }

    if (key === 'modify') {
      navigate(`${ROUTES.orders.modify}/${value}`)
      return
    }

    if (key === 'delete') {
      deleteOrderData.mutate(value)
      return
    }
  }

  useEffect(() => {
    if (!deleteOrderData.isSuccess || deleteOrderData.isError) return
    socket?.emit(SOCKETS_EVENTS.ORDER_DELETE)
  }, [deleteOrderData.isError, deleteOrderData.isSuccess])

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.default}>
      <DataTable
        columns={COLUMNS_DATA_TABLE.orders}
        data={orderState?.orders}
        customData={[
          {
            field: 'state',
            complement: TABLE_STATES.order
          },
          {
            field: 'id',
            complement: {
              items: ACTIONS_ORDER,
              onAction: onActionsTable
            }
          }
        ]}
      />
    </MainDashboardContainer>
  )
}

export default Orders

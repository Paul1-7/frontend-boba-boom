import {
  DASHBOARD_CONTENT,
  ROUTES,
  SOCKETS_EVENTS,
  initialFormOrder
} from '@/constants'
import { MainDashboardContainer } from '@/layout'
import OrderForm from './OrderForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createOrder, listFlavours, listPriceMenus } from '@/services'
import { BobaOrderDetail, OrderWithDetails } from '@/index'
import { useForm } from '@/hooks'
import { OrderWithDetailsSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '@/context'

const OrderAdd = () => {
  const { socket } = useContext(SocketContext) ?? {}
  const navigation = useNavigate()
  const { mutate, isLoading, isSuccess, isError } = useMutation({
    mutationFn: createOrder
  })

  const { methods } = useForm({
    initialForm: initialFormOrder,
    schema: OrderWithDetailsSchema
  })

  const flavoursData = useQuery({
    queryKey: ['listFlavours'],
    queryFn: listFlavours
  })

  const priceMenuData = useQuery({
    queryKey: ['listPriceMenus'],
    queryFn: listPriceMenus
  })

  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    const orderData = data as OrderWithDetails

    const { bobaDetail, waffleeDetail } = orderData

    const newBobaDetail = (bobaDetail as BobaOrderDetail[]).map(
      ({ idBoba = [], idShake, idPrice }) => ({
        idBoba1: [...idBoba]?.[0],
        idBoba2: [...idBoba]?.[1],
        idBoba3: [...idBoba]?.[2],
        idShake: [...idShake]?.[0],
        idPrice: [...idPrice]?.[0]
      })
    )

    const newWaffleeDetail = waffleeDetail.map(
      ({ idCoating, idFruit, idTopping, idPrice }) => ({
        idCoating: [...idCoating]?.[0],
        idFruit: [...idFruit]?.[0],
        idTopping: [...idTopping]?.[0],
        idPrice: [...idPrice]?.[0]
      })
    )

    mutate({
      order: data.order,
      bobaDetail: newBobaDetail,
      waffleeDetail: newWaffleeDetail
    } as unknown as OrderWithDetails)
  }

  useEffect(() => {
    if (!isSuccess || isError) return

    socket?.emit(SOCKETS_EVENTS.ORDER_ADDED)
    navigation(ROUTES.orders.default)
  }, [isSuccess, isError])

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.add}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <OrderForm
          isLoading={isLoading}
          flavours={flavoursData}
          priceMenu={priceMenuData}
        />
      </Form>
    </MainDashboardContainer>
  )
}

export default OrderAdd

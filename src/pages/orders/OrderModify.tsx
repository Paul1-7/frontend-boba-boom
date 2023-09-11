import {
  DASHBOARD_CONTENT,
  ROUTES,
  SOCKETS_EVENTS,
  initialFormOrder
} from '@/constants'
import { MainDashboardContainer } from '@/layout'
import OrderForm from './OrderForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  getOrderByIdToModify,
  listFlavours,
  listPriceMenus,
  modifyOrder
} from '@/services'
import { BobaOrderDetail, OrderWithDetails } from '@/index'
import { useForm } from '@/hooks'
import { OrderWithDetailsSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { SocketContext } from '@/context'

const OrderModify = () => {
  const { socket } = useContext(SocketContext) ?? {}
  const navigation = useNavigate()
  const { id } = useParams()
  const { mutate, isLoading, isSuccess, isError } = useMutation(
    async (data: OrderWithDetails) => await modifyOrder(data, id)
  )

  const orderData = useQuery({
    queryKey: ['getFlavourById'],
    queryFn: () => getOrderByIdToModify(id),
    cacheTime: 0
  })

  const flavoursData = useQuery({
    queryKey: ['listFlavours'],
    queryFn: listFlavours
  })

  const priceMenuData = useQuery({
    queryKey: ['listPriceMenus'],
    queryFn: listPriceMenus
  })

  const { methods } = useForm({
    initialForm: initialFormOrder,
    schema: OrderWithDetailsSchema,
    onDataLoad: [flavoursData, priceMenuData, orderData],
    shouldLoadData: true,
    dataTarget: orderData
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
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.modify}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <OrderForm
          isLoading={isLoading}
          flavours={flavoursData}
          priceMenu={priceMenuData}
          counterBoba={orderData.data?.bobaDetail?.length}
          counterWafflee={orderData.data?.waffleeDetail?.length}
        />
      </Form>
    </MainDashboardContainer>
  )
}

export default OrderModify

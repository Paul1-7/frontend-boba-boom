import { DASHBOARD_CONTENT, ROUTES, initialFormOrder } from '@/constants'
import { MainDashboardContainer } from '@/layout'
import OrderForm from './OrderForm'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createOrder, listFlavours, listPriceMenus } from '@/services'
import { OrderWithDetails } from '@/index'
import { useForm } from '@/hooks'
import { OrderWithDetailsSchema, flavourSchema } from '@/schemas'
import { Form } from '@/components'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

const OrderAdd = () => {
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
    mutate(data as OrderWithDetails)
  }

  return (
    <MainDashboardContainer content={DASHBOARD_CONTENT.orders.add}>
      <Form formMethods={methods} onSubmit={handleSubmit}>
        <OrderForm
          isLoading={isLoading}
          flavours={flavoursData}
          priceMenu={priceMenuData}
          // isLoadingData={menuData.isLoading}
        />
      </Form>
      {isSuccess && !isError && <Navigate to={ROUTES.flavours.default} />}
    </MainDashboardContainer>
  )
}

export default OrderAdd

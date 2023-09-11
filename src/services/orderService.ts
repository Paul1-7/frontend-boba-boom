import { Axios, getOrderToModify } from '@/apis'
import { OrderById, OrderI, OrderWithDetails } from '..'
import { getEndOfDay, getStartOfDay } from '@/utils'
export const URL_ORDERS = {
  default: '/api/v1/orders'
}

interface Data<T> {
  data: T
}

export const createOrder = async (data: OrderWithDetails) => {
  const response = await Axios.post<OrderWithDetails>(URL_ORDERS.default, data)

  if (response?.status !== 200 && response?.status !== 201) throw response.data

  return response.data
}

export const listOrders = async (): Promise<OrderWithDetails[]> => {
  const response = await Axios.get<Data<OrderWithDetails[]>>(URL_ORDERS.default)

  if (response?.status !== 200) throw response.data
  return response.data.data
}

export const listOrdersToReport = async (): Promise<OrderI[]> => {
  const currentDate = new Date()
  const startOfDay = getStartOfDay(currentDate)
  const endOfDay = getEndOfDay(currentDate)

  const response = await Axios.get<Data<OrderI[]>>(
    URL_ORDERS.default +
      `?start=${startOfDay.toISOString()}&end=${endOfDay.toISOString()}`
  )

  if (response?.status !== 200) throw response.data
  return response.data.data
}

export const getOrderByIdToModify = async (
  id: string | undefined
): Promise<OrderWithDetails> => {
  const response = await Axios.get<Data<OrderById>>(
    `${URL_ORDERS.default}/${id}`
  )
  return getOrderToModify(response.data.data)
}

export const getOrderById = async (
  id: string | undefined
): Promise<OrderById> => {
  const response = await Axios.get<Data<OrderById>>(
    `${URL_ORDERS.default}/${id}`
  )
  return response.data.data
}

export const modifyOrder = async (
  data: OrderWithDetails,
  id: string | undefined
): Promise<OrderWithDetails> => {
  const response = await Axios.put<Data<OrderWithDetails>>(
    `${URL_ORDERS.default}/${id}`,
    data
  )

  return response.data.data
}

export const changeStateOrder = async (
  data: { [x: string]: string },
  id: string | undefined
): Promise<void> => {
  await Axios.put<Data<OrderWithDetails>>(
    `${URL_ORDERS.default}/change-states/${id}`,
    data
  )
}

export const deleteOrder = async (id: string) => {
  return Axios.delete(`${URL_ORDERS.default}/${id}`)
}

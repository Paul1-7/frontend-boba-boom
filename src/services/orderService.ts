import { Axios } from '@/apis'
import { OrderWithDetails } from '..'
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

export const getOrderById = async (
  id: string | undefined
): Promise<OrderWithDetails> => {
  const response = await Axios.get<Data<OrderWithDetails>>(
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

export const deleteOrder = async (id: string) => {
  return Axios.delete(`${URL_ORDERS.default}/${id}`)
}

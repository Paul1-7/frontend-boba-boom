import { Dispatch, ReactNode, createContext, useReducer } from 'react'
import { OrderActionReducer, OrderStateReducer } from '..'
import { orderReducer } from '@/reducer'

interface OrderContextProps {
  orderState: OrderStateReducer
  dispatch: Dispatch<OrderActionReducer>
}

export const OrderContext = createContext<OrderContextProps | null>(null)

const initialState: OrderStateReducer = {
  orders: [],
  uui: ''
}

interface Props {
  children: ReactNode
}

export const OrderProvider = ({ children }: Props) => {
  const [orderState, dispatch] = useReducer(orderReducer, initialState)

  return (
    <OrderContext.Provider
      value={{
        orderState,
        dispatch
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

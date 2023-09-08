import { SOCKETS_EVENTS } from '@/constants'
import { OrderActionReducer, OrderStateReducer } from '..'

export const orderReducer = (
  state: OrderStateReducer,
  action: OrderActionReducer
) => {
  switch (action.type) {
    case SOCKETS_EVENTS.ORDERS_LIST:
      return {
        ...state,
        orders: Array.isArray(action.payload) ? [...action.payload] : []
      }
    default:
      return state
  }
}

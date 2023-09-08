export interface OrderI {
  id?: string
  customer: string
  total: number
}

export interface OrderDetailI {
  idOrder?: string
  idFlavour: string
  idMenu: string
  subtotal: number
}

export interface OrderWithDetails {
  order: OrderI
  bobaDetail: OrderDetailI[],
  waffleeDetail: OrderDetailI[],
}

export interface FlavourI {
  id?: string
  type: string
  name: string
  idMenu: string
  price: number | string
}

export interface MenuI {
  id: string
  name: string
}

export interface PriceMenuI {
  id: string
  idMenu: string
  price: number
}

export type OrderStateReducer = {
  orders: OrderI[]
  uui: string
}

export type OrderActionReducer = {
  type: string
  payload: OrderI | OrderI[]
}

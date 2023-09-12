export interface OrderI {
  id?: string
  customer: string
  total: number
  state: string
}

interface OrderDetailI {
  idOrder?: string
  idMenu: string
  idPrice: Set<string> | string
}

export interface BobaOrderDetail extends OrderDetailI {
  idShake: Set<string>
  idBoba?: Set<string>
}

interface BobasOrderDetail extends OrderDetailI {
  idShake: string
  idBoba1?: string
  idBoba2?: string
  idBoba3?: string
}

interface WaffleeOrderDetail extends OrderDetailI {
  idFruit: Set<string>
  idCoating: Set<string>
  idTopping: Set<string>
}

export interface OrderWithDetails {
  order: OrderI
  bobaDetail: BobaOrderDetail[] | BobasOrderDetail[]
  waffleeDetail: WaffleeOrderDetail[]
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

interface FlavourById {
  id: string
  name: string
  price: number
}

interface BobaById {
  idPrice: string
  boba1Flavour: FlavourById
  boba2Flavour: FlavourById
  boba3Flavour: FlavourById
  shakeFlavour: FlavourById
}

interface WaffleeById {
  idPrice: string
  fruitFlavour: FlavourById
  coatingFlavour: FlavourById
  toppingFlavour: FlavourById
}

export interface OrderById extends OrderI {
  bobasDetail: BobaById[]
  waffleesDetail: WaffleeById[]
}

interface UserI {
  id: string
  user: string
  password: string
  idRol: string | Set
}

interface RolI {
  id: string
  name: string
}

interface UserAndRol extends UserI {
  rol: RolI
}

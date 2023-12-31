import { FlavourI, OrderWithDetails } from '..'

export const initialFormFlavour: FlavourI = {
  type: new Set(),
  name: '',
  idMenu: new Set(),
  price: 0
}

export const initialFormBobaOrder = {
  idOrder: '',
  idMenu: '',
  idShake: new Set(),
  idBoba: new Set(),
  idPrice: new Set()
}

export const initialFormWaffleeOrder = {
  idOrder: '',
  idMenu: '',
  idFruit: new Set(),
  idCoating: new Set(),
  idTopping: new Set(),
  idPrice: new Set()
}

export const initialFormOrder: OrderWithDetails = {
  order: {
    customer: '',
    total: 0,
    state: ''
  },
  bobaDetail: [],
  waffleeDetail: []
}

export const initialFormUser = {
  user: '',
  password: '',
  repeatPassword: '',
  idRol: new Set()
}

export const initialFormLogin = {
  user: '',
  password: ''
}

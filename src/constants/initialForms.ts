import { FlavourI, OrderWithDetails } from '..'

export const initialFormFlavour: FlavourI = {
  type: '',
  name: '',
  idMenu: '',
  price: 0
}

export const initialFormBobaOrder = {
  idOrder: '',
  idMenu: '',
  idShake: '',
  idBoba: new Set(),
  price: '',
  subtotal: ''
}

export const initialFormOrder: OrderWithDetails = {
  order: {
    customer: '',
    total: 0
  },
  bobaDetail: [],
  waffleeDetail: []
}

import { BobaOrderDetail, OrderById, OrderWithDetails } from '@/index'

export const getBobasSet = (...values: string[]) => {
  const boba = new Set()
  values.forEach((value) => {
    if (value?.length > 0) {
      boba.add(value)
    }
  })

  return boba
}

export const getOrderToModify = (orderData: OrderById): OrderWithDetails => {
  const { bobasDetail, waffleesDetail, ...order } = orderData

  return {
    order,
    bobaDetail: bobasDetail.map(
      ({ shakeFlavour, boba1Flavour, boba2Flavour, boba3Flavour, idPrice }) =>
        ({
          idShake: new Set([shakeFlavour.id]),
          idBoba: getBobasSet(
            boba1Flavour?.id,
            boba2Flavour?.id,
            boba3Flavour?.id
          ),
          idPrice: new Set([idPrice])
        }) as BobaOrderDetail
    ),
    waffleeDetail: waffleesDetail.map(
      ({ coatingFlavour, fruitFlavour, toppingFlavour, idPrice }) => ({
        idCoating: new Set([coatingFlavour.id]),
        idFruit: new Set([fruitFlavour.id]),
        idTopping: toppingFlavour?.id
          ? new Set([toppingFlavour?.id])
          : new Set(),
        idPrice: new Set([idPrice]),
        idMenu: ''
      })
    )
  }
}

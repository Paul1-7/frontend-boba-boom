import { Item } from '@/components'
import { PriceMenuI } from '@/index'

export const pricesMenuListItems = (
  pricesMenu: PriceMenuI[]
): Item<PriceMenuI>[] => {
  return pricesMenu.map((priceMenu) => ({
    value: String(priceMenu.id),
    label: String(priceMenu.price),
    customValues: priceMenu
  }))
}

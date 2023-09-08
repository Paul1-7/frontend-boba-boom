import { Item } from '@/components'
import { FlavourI } from '@/index'

export const flavourListItems = (flavours: FlavourI[]): Item<FlavourI>[] => {
  return flavours.map((flavour) => ({
    value: String(flavour.id),
    label: flavour.name,
    customValues: flavour
  }))
}

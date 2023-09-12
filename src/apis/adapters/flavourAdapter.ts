import { Item } from '@/components'
import { FlavourI } from '@/index'

export const flavourListItems = (flavours: FlavourI[]): Item<FlavourI>[] => {
  return flavours.map((flavour) => ({
    value: String(flavour.id),
    label: flavour.name,
    customValues: flavour
  }))
}

export const getFlavourToModify = (data: FlavourI): FlavourI => {
  return {
    ...data,
    idMenu: new Set([data.idMenu]),
    type: new Set([data.type])
  }
}

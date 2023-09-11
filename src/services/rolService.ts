import { Axios, menuItems } from '@/apis'
import { RolI } from '..'
import { Item } from '@/components'
export const URL_ROLS = {
  default: '/api/v1/rols'
}

interface Data<T> {
  data: T
}

export const listRols = async (): Promise<Item<RolI>[]> => {
  const response = await Axios.get<Data<RolI[]>>(URL_ROLS.default)

  if (response?.status !== 200) throw response.data
  return menuItems(response.data.data)
}

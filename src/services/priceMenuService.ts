import { Axios } from '@/apis'
import { PriceMenuI } from '..'

export const URL_PRICES_MENUS = {
  default: '/api/v1/prices-menu'
}

interface Data<T> {
  data: T
}

export const listPriceMenus = async (): Promise<PriceMenuI[]> => {
  const response = await Axios.get<Data<PriceMenuI[]>>(URL_PRICES_MENUS.default)

  if (response?.status !== 200) throw response.data
  return response.data.data
}

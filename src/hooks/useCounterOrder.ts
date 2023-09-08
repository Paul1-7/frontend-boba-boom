import { Types, initialFormBobaOrder } from '@/constants'
import { UseQueryResult } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FlavourI, PriceMenuI } from '..'
import { sortedItems } from '@/utils'
import { flavourListItems, pricesMenuListItems } from '@/apis'

const initialState = {
  bobaBoos: 0,
  bobaWaffles: 0
}

const BOBA_MENU_ID = '84280cbb-57c2-4806-a3ea-7f81848efdbf'
const WAFFLEES_MENU_ID = '369bf017-c1e5-4e5c-98ae-1185b21e53bf'

interface Props {
  flavoursData: UseQueryResult<FlavourI[], unknown>
  priceMenuData: UseQueryResult<PriceMenuI[], unknown>
}

export const useCounterOrder = ({ flavoursData, priceMenuData }: Props) => {
  const [counters, setCounters] = useState(initialState)
  const { control } = useFormContext()
  const { FRUTALES, ESPECIALES, DE_LA_CASA } = Types

  const { fields, remove, append } = useFieldArray({
    control,
    name: 'bobaDetail'
  })

  const handleIncrementBobas = () => {
    setCounters((prev) => ({ ...prev, bobaBoos: prev.bobaBoos + 1 }))
    append(initialFormBobaOrder)
  }

  const handleDecrementBobas = () => {
    setCounters((prev) => ({ ...prev, bobaBoos: prev.bobaBoos - 1 }))
    remove(fields.length - 1)
  }

  const bobaShakeFlavours = useMemo(() => {
    if (!flavoursData.data) return

    const data = flavoursData.data.filter(
      ({ idMenu, type }) =>
        idMenu === BOBA_MENU_ID && (type === DE_LA_CASA || type === ESPECIALES)
    )

    const itemsList = flavourListItems(data)

    return sortedItems(itemsList, 'label')
  }, [flavoursData.data])

  const bobaFlavours = useMemo(() => {
    if (!flavoursData.data) return

    const data = flavoursData.data.filter(
      ({ idMenu, type }) =>
        idMenu === BOBA_MENU_ID && (type === FRUTALES || type === ESPECIALES)
    )

    const itemsList = flavourListItems(data)

    return sortedItems(itemsList, 'label')
  }, [flavoursData.data])

  const bobaPrices = useMemo(() => {
    if (!priceMenuData.data) return

    const data = priceMenuData.data.filter(
      ({ idMenu }) => idMenu === BOBA_MENU_ID
    )

    return pricesMenuListItems(data)
  }, [priceMenuData.data])

  return {
    handleIncrementBobas,
    handleDecrementBobas,
    counters,
    bobaShakeFlavours,
    bobaFlavours,
    bobaPrices
  }
}

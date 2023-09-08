/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Types,
  initialFormBobaOrder,
  initialFormWaffleeOrder
} from '@/constants'
import { UseQueryResult } from '@tanstack/react-query'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { FlavourI, PriceMenuI } from '..'
import { groupArrayElements, sortedItems } from '@/utils'
import {
  flavourListItems,
  pricesMenuListItems as pricesMenuListAdapter
} from '@/apis'

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
  const { control, watch, setValue } = useFormContext()
  const { FRUTALES, ESPECIALES, DE_LA_CASA, CUBIERTA, TOPPING } = Types
  const watchedValues = watch()
  const idFlavours = useRef<string[]>([])
  const idPrices = useRef<string[]>([])

  useEffect(() => {
    if (!flavoursData.data || !priceMenuData.data) return
    idPrices.current = []
    idFlavours.current = []
    watchedValues.waffleeDetail.forEach(
      ({ idCoating, idFruit, idTopping, idPrice }: { [x: string]: string }) => {
        idFlavours.current.push(...[...idCoating])
        idFlavours.current.push(...[...idFruit])
        idFlavours.current.push(...[...idTopping])
        idPrices.current.push(...[...idPrice])
      }
    )

    watchedValues.bobaDetail.forEach(({ idShake, idBoba, idPrice }: any) => {
      idFlavours.current.push(...[...idShake])
      idFlavours.current.push(...[...idBoba])
      idPrices.current.push(...[...idPrice])
    })

    const idFlavoursFlat = idFlavours.current.flat(2)
    const idMenuPriceFlat = idPrices.current.flat(2)

    const idFlavourGroup = groupArrayElements(idFlavoursFlat)
    let totalPriceFlavour = 0
    let totalPriceMenu = 0

    Object.entries(idFlavourGroup).forEach(([key, value]) => {
      const foundedFlavour = flavoursData.data.find(({ id }) => id === key)

      totalPriceFlavour += (Number(foundedFlavour?.price) ?? 0) * value.count
    })

    idMenuPriceFlat.forEach((idMenuPrice) => {
      const foundedPriceMenu = priceMenuData.data.find(
        ({ id }) => id === idMenuPrice
      )

      totalPriceMenu += foundedPriceMenu?.price ?? 0
    })

    setValue('order.total', totalPriceMenu + totalPriceFlavour)
  }, [watchedValues])

  const bobaFieldArray = useFieldArray({
    control,
    name: 'bobaDetail'
  })

  const waffleeFieldArray = useFieldArray({
    control,
    name: 'waffleeDetail'
  })

  const handleIncrementBobas = () => {
    setCounters((prev) => ({ ...prev, bobaBoos: prev.bobaBoos + 1 }))
    bobaFieldArray.append(initialFormBobaOrder)
  }

  const handleDecrementBobas = () => {
    setCounters((prev) => ({ ...prev, bobaBoos: prev.bobaBoos - 1 }))
    bobaFieldArray.remove(bobaFieldArray.fields.length - 1)
  }

  const handleIncrementWafflee = () => {
    setCounters((prev) => ({ ...prev, bobaWaffles: prev.bobaWaffles + 1 }))
    waffleeFieldArray.append(initialFormWaffleeOrder)
  }

  const handleDecrementWafflee = () => {
    setCounters((prev) => ({ ...prev, bobaWaffles: prev.bobaWaffles - 1 }))
    waffleeFieldArray.remove(waffleeFieldArray.fields.length - 1)
  }

  const flavourListItem = (
    flavoursData: UseQueryResult<FlavourI[], unknown>,
    idMenu: string,
    typesFilters: string[]
  ) => {
    if (!flavoursData.data) return
    const data = flavoursData.data.filter(
      ({ idMenu: idMenuFlavour, type }) =>
        idMenuFlavour === idMenu &&
        typesFilters.some((typeFilter) => typeFilter === type)
    )

    const itemsList = flavourListItems(data)

    return sortedItems(itemsList, 'label')
  }

  const pricesMenuListItems = (
    priceMenuData: UseQueryResult<PriceMenuI[], unknown>,
    idMenu: string
  ) => {
    if (!priceMenuData.data) return
    const data = priceMenuData.data.filter(
      ({ idMenu: idMenuPrice }) => idMenuPrice === idMenu
    )

    const itemsList = pricesMenuListAdapter(data)

    return sortedItems(itemsList, 'label')
  }

  const bobaShakeFlavours = useMemo(
    () => flavourListItem(flavoursData, BOBA_MENU_ID, [FRUTALES, ESPECIALES]),
    [flavoursData.data]
  )

  const bobaFlavours = useMemo(
    () => flavourListItem(flavoursData, BOBA_MENU_ID, [DE_LA_CASA, ESPECIALES]),
    [flavoursData.data]
  )

  const bobaPrices = useMemo(
    () => pricesMenuListItems(priceMenuData, BOBA_MENU_ID),
    [priceMenuData.data]
  )

  const waffleePrices = useMemo(
    () => pricesMenuListItems(priceMenuData, WAFFLEES_MENU_ID),
    [priceMenuData.data]
  )

  const toppingFlavours = useMemo(
    () => flavourListItem(flavoursData, WAFFLEES_MENU_ID, [TOPPING]),
    [flavoursData.data]
  )

  const coatingFlavours = useMemo(
    () => flavourListItem(flavoursData, WAFFLEES_MENU_ID, [CUBIERTA]),
    [flavoursData.data]
  )

  const fruitsFlavours = useMemo(
    () => flavourListItem(flavoursData, WAFFLEES_MENU_ID, [FRUTALES]),
    [flavoursData.data]
  )

  return {
    handleIncrementBobas,
    handleDecrementBobas,
    handleIncrementWafflee,
    handleDecrementWafflee,
    counters,
    bobaShakeFlavours,
    bobaFlavours,
    bobaPrices,
    waffleePrices,
    coatingFlavours,
    fruitsFlavours,
    toppingFlavours
  }
}

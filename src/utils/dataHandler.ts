import { MenuItem } from '@/constants'
import { format } from 'date-fns'

export function isActivePathname(currentPath: string, targetPath: string) {
  const pathnameArray = currentPath.split('/')
  const lastsegmentPath = pathnameArray[pathnameArray.length - 1]
  return targetPath.includes(lastsegmentPath)
}

export const debounce = (fn: (...args: unknown[]) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null
  return function (...args: unknown[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

export const formatCurrencyToBOB = (value: number) =>
  new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'BOB' }).format(
    value
  )

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const objectByString = (o: { [x: string]: any }, s: string) => {
  s = s.replace(/\[(\w+)\]/g, '?.$1')
  s = s.replace(/^\./, '')
  const a = s.split('.')

  a.forEach((k) => {
    if (typeof o === 'undefined') return null
    if (k in o) {
      o = o[k]
    } else {
      return null
    }
  })

  return o
}

export const sortedItems = <T extends Record<K, string>, K extends keyof T>(
  array: T[],
  label: K
): T[] => {
  return array.slice().sort((a, b) => a[label].localeCompare(b[label]))
}

export type GroupedObject = { [key: string]: { count: number } }

export function groupArrayElements(arr: string[]): GroupedObject {
  return arr.reduce((result, item) => {
    const key = item

    if (!result[key]) {
      result[key] = { count: 0 }
    }

    result[key].count++

    return result
  }, {} as GroupedObject)
}

export const formatTime = (date: string) => {
  return format(new Date(date), 'HH:mm')
}

export function getStartOfDay(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    0,
    0,
    0,
    0
  )
}

export function getEndOfDay(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59,
    999
  )
}

export function sumByKey<T>(array: T[], key: keyof T): number {
  let totalSum = 0

  array.forEach((obj) => {
    totalSum += obj[key] as unknown as number
  })

  return totalSum
}

export function getAllowedMenus(
  menuItems: MenuItem[],
  allowedRol: string = ''
): MenuItem[] {
  return menuItems.filter(({ allowedRols }) => allowedRols.includes(allowedRol))
}

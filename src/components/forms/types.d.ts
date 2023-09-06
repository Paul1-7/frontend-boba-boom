import {
  InputProps as InputPropsNext,
  SelectProps as SelectPropsNext
} from '@nextui-org/react'
import { ReactNode } from 'react'
import { UseFormReturn } from 'react-hook-form'

interface InputProps extends InputPropsNext {
  name: string
  isDataPath?: boolean
  label: string
  methods?: UseFormReturn<FieldValues> | undefined
}

export interface Item<T> {
  value: string | number
  label: string
  customValues?: T
}

interface SelectProps<T> extends SelectPropsNext {
  name: string
  isDataPath?: boolean
  label: string
  methods?: UseFormReturn<FieldValues> | undefined
  items: undefined | Item<T>[] | object[] | T[]
  children?: ReactNode
}

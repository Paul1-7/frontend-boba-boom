/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react'
import { v4 as uuid } from 'uuid'

import { Controller } from 'react-hook-form'
import { objectByString } from '@/utils/dataHandler'
import compare from 'just-compare'
import { Select, SelectItem } from '@nextui-org/react'
import { SelectProps } from '../types'

const SelectMemo = memo(
  <T,>({
    name,
    label,
    isDataPath,
    methods,
    selectionMode,
    isObjectValue,
    items = [],
    ...others
  }: SelectProps<T>) => {
    const error = methods?.formState?.errors ?? {}

    const errorValue = isDataPath ? objectByString(error, name) : error[name]

    return (
      <Controller
        name={name}
        control={methods?.control}
        render={({ field: { onChange, onBlur, value } }) => {
          return (
            <Select
              size="sm"
              variant="underlined"
              label={label}
              validationState={errorValue?.message ? 'invalid' : 'valid'}
              selectionMode={selectionMode}
              onSelectionChange={onChange}
              onBlur={onBlur}
              errorMessage={errorValue?.message}
              selectedKeys={value}
              {...others}
            >
              {(items as object[]).map((item) => {
                if (!('value' in item) || !('label' in item)) {
                  return <SelectItem key={'0' + uuid()}>{'ninguno'}</SelectItem>
                }
                return (
                  <SelectItem
                    key={String(item.value)}
                    value={
                      isObjectValue ? JSON.stringify(item) : String(item.value)
                    }
                  >
                    {String(item.label)}
                  </SelectItem>
                )
              })}
            </Select>
          )
        }}
      />
    )
  },
  (prevProps, nextProps) =>
    prevProps?.disabled === nextProps?.disabled &&
    !compare(prevProps.methods, nextProps.methods)
)

export default SelectMemo

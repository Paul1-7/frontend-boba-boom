/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm as useFormHookForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { UseQueryResult } from '@tanstack/react-query'

interface UseForm {
  schema: z.Schema
  initialForm: { [x: string]: any }
  shouldLoadData?: boolean
  onDataLoad?: UseQueryResult[]
  dataTarget?: UseQueryResult<any, unknown>
}

export const useForm = ({
  schema,
  initialForm,
  shouldLoadData,
  onDataLoad,
  dataTarget
}: UseForm) => {
  const loadOnce = useRef<boolean>(true)
  const methods = useFormHookForm({
    resolver: zodResolver(schema),
    defaultValues: initialForm,
    mode: 'all',
    criteriaMode: 'all'
  })

  useEffect(() => {
    if (
      !shouldLoadData ||
      !onDataLoad?.every(({ isSuccess }) => isSuccess) ||
      !loadOnce.current
    )
      return

    onDataLoad.forEach(({ data }) => {
      console.log(data)
    })

    methods.reset(dataTarget?.data)
    loadOnce.current = false
  }, [dataTarget?.data, onDataLoad, shouldLoadData])

  return { methods }
}

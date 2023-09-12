import { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'sonner'

interface CustomErrorResponse {
  error: string
}

interface OnResponseError extends AxiosError<CustomErrorResponse> {
  response?: AxiosResponse<CustomErrorResponse>
}

export const onResponse = (response: AxiosResponse) => {
  if (response.data?.message) {
    toast.success(response.data?.message)
  }

  return response
}

export const onResponseError = (error: OnResponseError) => {
  const response = error.response?.data
  if (typeof response === 'string') {
    toast.error(response)
    throw response
  }
  if (typeof response === 'object') {
    const errorMesage = response.error
    toast.error(errorMesage)
    throw errorMesage
  }

  toast.error('Ha ocurrido un error')
  throw error
}

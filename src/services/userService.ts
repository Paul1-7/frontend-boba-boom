import { Axios, UserListAdapter, userList, userToModify } from '@/apis'
import { UserAndRol, UserI } from '..'
export const URL_USERS = {
  default: '/api/v1/users',
  auth: '/api/v1/auth'
}

interface Data<T> {
  data: T
}

export const createUser = async (data: UserI) => {
  const response = await Axios.post<UserI>(URL_USERS.default, data)

  if (response?.status !== 200 && response?.status !== 201) throw response.data

  return response.data
}

export const loginUser = async (data: UserAndRol) => {
  const response = await Axios.post<UserAndRol>(URL_USERS.auth + '/login', data)

  if (response?.status !== 200 && response?.status !== 201) throw response.data

  return response.data
}

export const listUsers = async (): Promise<UserListAdapter[]> => {
  const response = await Axios.get<Data<UserAndRol[]>>(URL_USERS.default)

  if (response?.status !== 200) throw response.data
  return userList(response.data.data) as unknown as UserListAdapter[]
}

export const getUserById = async (id: string | undefined): Promise<UserI> => {
  const response = await Axios.get<Data<UserI>>(`${URL_USERS.default}/${id}`)
  return userToModify(response.data.data)
}

export const modifyUser = async (
  data: UserI,
  id: string | undefined
): Promise<UserI> => {
  const response = await Axios.put<Data<UserI>>(
    `${URL_USERS.default}/${id}`,
    data
  )

  return response.data.data
}

export const deleteUser = async (id: string) => {
  return Axios.delete(`${URL_USERS.default}/${id}`)
}

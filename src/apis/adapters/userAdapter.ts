import { UserI, UserList } from '@/index'

export const userList = (data: UserList[]) => {
  return data.map(({ id, user, rol }) => ({
    id,
    user,
    rol: rol.name
  }))
}

export type UserListAdapter = ReturnType<typeof userList>

export const userToModify = (data: UserI) => {
  return {
    ...data,
    idRol: new Set([data.idRol])
  }
}

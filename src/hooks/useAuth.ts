import { ROUTES } from '@/constants'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAndRol } from '..'

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<UserAndRol | null>(
    JSON.parse(localStorage.getItem('authenticated') ?? '{}')
  )
  const navigate = useNavigate()

  const login = (data: UserAndRol) => {
    setAuthenticated(data)
    localStorage.setItem('authenticated', JSON.stringify(data))
  }

  const logout = () => {
    localStorage.removeItem('authenticated')
    setAuthenticated(null)
    setTimeout(() => {
      navigate(ROUTES.auth.login)
    }, 100)
  }

  const isAllowedRol = (roles: string[] = []) => {
    const { rol } = authenticated ?? {}

    return roles.includes(rol?.id ?? '')
  }

  return { authenticated, login, logout, isAllowedRol }
}

export default useAuth

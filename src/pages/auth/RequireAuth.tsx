import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks'
import { ReactNode } from 'react'
import { ROUTES } from '@/constants'

interface Props {
  allowedRols: string[]
  children: ReactNode
}

function RequireAuth({ allowedRols, children }: Props) {
  const { authenticated } = useAuth() ?? {}
  const location = useLocation()

  const hasRequiredRole =
    authenticated?.rol && allowedRols.includes(authenticated.rol.id)
  const isAuthenticated = !!authenticated?.user

  if (hasRequiredRole) {
    return children
  }

  return (
    <Navigate
      to={isAuthenticated ? ROUTES.auth.unauthorised : ROUTES.auth.login}
      state={{ from: location }}
      replace
    />
  )
}

export default RequireAuth

import { ADMIN_ROUTE, ROUTES } from '@/constants'
import AdminLayout from '@/layout/admin/AdminLayout'
import { NotFound, RoutesWithNotFound } from '@/pages'
import { Navigate, Route } from 'react-router-dom'

const MainRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={ROUTES.orders.default} />} />
      <Route path={ADMIN_ROUTE + '/*'} element={<AdminLayout />}>
        <Route path={ROUTES.orders.default} element={<NotFound />} />
      </Route>
    </RoutesWithNotFound>
  )
}

export default MainRoutes

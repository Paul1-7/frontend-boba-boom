import { DASHBOARD_ROUTE, ROUTES } from '@/constants'
import DashboardLayout from '@/layout/dashboard/DashboardLayout'
import { RoutesWithNotFound } from '@/pages'
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'

const Orders = lazy(() => import('@/pages/orders/Orders'))
const OrderAdd = lazy(() => import('@/pages/orders/OrderAdd'))
const OrderModify = lazy(() => import('@/pages/orders/OrderModify'))
const OrderDetail = lazy(() => import('@/pages/orders/OrderDetail'))
const Sales = lazy(() => import('@/pages/reports/SalesReport'))

//flavours
const Flavours = lazy(() => import('@/pages/flavours/Flavours'))
const FlavourAdd = lazy(() => import('@/pages/flavours/FlavourAdd'))
const FlavourModify = lazy(() => import('@/pages/flavours/FlavourModify'))

//users
const Users = lazy(() => import('@/pages/users/Users'))
const UserAdd = lazy(() => import('@/pages/users/UserAdd'))
const UserModify = lazy(() => import('@/pages/users/UserModify'))

const MainRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={`${ROUTES.orders.default}`} />} />
      <Route path={DASHBOARD_ROUTE} element={<DashboardLayout />}>
        <Route path={ROUTES.orders.default} element={<Orders />} />
        <Route path={ROUTES.orders.create} element={<OrderAdd />} />
        <Route path={ROUTES.orders.modify + '/:id'} element={<OrderModify />} />
        <Route path={ROUTES.orders.detail + '/:id'} element={<OrderDetail />} />
        <Route path={ROUTES.reports.order} element={<Sales />} />
        {/* flavours */}

        <Route path={ROUTES.flavours.default} element={<Flavours />} />
        <Route path={ROUTES.flavours.create} element={<FlavourAdd />} />
        <Route
          path={ROUTES.flavours.modify + '/:id'}
          element={<FlavourModify />}
        />

        <Route path={ROUTES.users.default} element={<Users />} />
        <Route path={ROUTES.users.create} element={<UserAdd />} />
        <Route path={ROUTES.users.modify + '/:id'} element={<UserModify />} />
      </Route>
    </RoutesWithNotFound>
  )
}

export default MainRoutes

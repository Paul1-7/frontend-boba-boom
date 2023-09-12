import { DASHBOARD_ROUTE, ROLES, ROUTES } from '@/constants'
import DashboardLayout from '@/layout/dashboard/DashboardLayout'
import { RequireAuth, RoutesWithNotFound } from '@/pages'
import { lazy } from 'react'
import { Navigate, Route } from 'react-router-dom'

const Orders = lazy(() => import('@/pages/orders/Orders'))
const OrderAdd = lazy(() => import('@/pages/orders/OrderAdd'))
const OrderModify = lazy(() => import('@/pages/orders/OrderModify'))
const OrderDetail = lazy(() => import('@/pages/orders/OrderDetail'))
const Sales = lazy(() => import('@/pages/reports/SalesReport'))
const Login = lazy(() => import('@/pages/auth/Login'))

//flavours
const Flavours = lazy(() => import('@/pages/flavours/Flavours'))
const FlavourAdd = lazy(() => import('@/pages/flavours/FlavourAdd'))
const FlavourModify = lazy(() => import('@/pages/flavours/FlavourModify'))

//users
const Users = lazy(() => import('@/pages/users/Users'))
const UserAdd = lazy(() => import('@/pages/users/UserAdd'))
const UserModify = lazy(() => import('@/pages/users/UserModify'))

const { ADMIN, CAMARERO, RECEPCIONISTA_ORDENES } = ROLES
const MainRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={`${ROUTES.orders.default}`} />} />
      <Route path={DASHBOARD_ROUTE} element={<DashboardLayout />}>
        <Route
          path={ROUTES.orders.default}
          element={
            <RequireAuth allowedRols={[ADMIN, CAMARERO, RECEPCIONISTA_ORDENES]}>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.orders.create}
          element={
            <RequireAuth allowedRols={[ADMIN, CAMARERO]}>
              <OrderAdd />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.orders.modify + '/:id'}
          element={
            <RequireAuth allowedRols={[ADMIN, CAMARERO]}>
              <OrderModify />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.orders.detail + '/:id'}
          element={
            <RequireAuth allowedRols={[ADMIN, CAMARERO, RECEPCIONISTA_ORDENES]}>
              <OrderDetail />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.reports.order}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <Sales />{' '}
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.flavours.default}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <Flavours />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.flavours.create}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <FlavourAdd />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.flavours.modify + '/:id'}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <FlavourModify />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.users.default}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <Users />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.users.create}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <UserAdd />
            </RequireAuth>
          }
        />
        <Route
          path={ROUTES.users.modify + '/:id'}
          element={
            <RequireAuth allowedRols={[ADMIN]}>
              <UserModify />
            </RequireAuth>
          }
        />
      </Route>
      <Route path={ROUTES.auth.login} element={<Login />} />
    </RoutesWithNotFound>
  )
}

export default MainRoutes

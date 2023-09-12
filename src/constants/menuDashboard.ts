import { MenuIc, OrderIc, UsersIc, flavourIc } from '@/assets'
import { ROLES, ROUTES } from '.'

export interface MenuItem {
  name: string
  Icon: () => JSX.Element
  path: string
  allowedRols: string[]
}

const { ADMIN, CAMARERO, RECEPCIONISTA_ORDENES } = ROLES
export const MENU_ITEMS_DASHBOARD: MenuItem[] = [
  {
    name: 'Pedidos',
    Icon: OrderIc,
    path: ROUTES.orders.default,
    allowedRols: [ADMIN, CAMARERO, RECEPCIONISTA_ORDENES]
  },
  {
    name: 'Usuarios',
    Icon: UsersIc,
    path: ROUTES.users.default,
    allowedRols: [ADMIN]
  },
  {
    name: 'Sabores',
    Icon: flavourIc,
    path: ROUTES.flavours.default,
    allowedRols: [ADMIN]
  },
  {
    name: 'Reporte del día',
    Icon: MenuIc,
    path: ROUTES.reports.order,
    allowedRols: [ADMIN]
  }
]

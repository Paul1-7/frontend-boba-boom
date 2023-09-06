export const DASHBOARD_ROUTE = '/administracion'

export const ROUTES = {
  orders: {
    default: DASHBOARD_ROUTE + '/pedidos',
    create: DASHBOARD_ROUTE + '/pedidos/agregar',
    modify: DASHBOARD_ROUTE + '/pedidos/modificar',
    detail: DASHBOARD_ROUTE + '/pedidos/detalle'
  },
  menus: {
    default: DASHBOARD_ROUTE + '/menus',
    create: DASHBOARD_ROUTE + '/menus/agregar',
    modify: DASHBOARD_ROUTE + '/menus/modificar'
  },
  flavours: {
    default: DASHBOARD_ROUTE + '/sabores',
    create: DASHBOARD_ROUTE + '/sabores/agregar',
    modify: DASHBOARD_ROUTE + '/sabores/modificar'
  },
  users: {
    default: DASHBOARD_ROUTE + '/usuarios',
    create: DASHBOARD_ROUTE + '/usuarios/agregar',
    modify: DASHBOARD_ROUTE + '/usuarios/modificar'
  },
  auth: {
    login: DASHBOARD_ROUTE + '/auth/login'
  }
}

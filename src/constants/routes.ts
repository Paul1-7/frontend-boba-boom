export const ADMIN_ROUTE = 'administracion'

export const ROUTES = {
  orders: {
    default: ADMIN_ROUTE + '/pedidos',
    create: ADMIN_ROUTE + '/pedidos/agregar',
    modify: ADMIN_ROUTE + '/pedidos/modificar',
    detail: ADMIN_ROUTE + '/pedidos/detalle'
  },
  users: {
    default: 'usuarios',
    create: 'usuarios/agregar',
    modify: 'usuarios/modificar'
  },
  auth: {
    login: '/auth/login'
  }
}

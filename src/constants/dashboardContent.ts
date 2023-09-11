import { ROUTES } from '.'

export const DASHBOARD_CONTENT = {
  orders: {
    default: {
      title: 'Lista de pedidos',
      button: 'agregar pedido',
      to: ROUTES.orders.create
    },
    add: {
      title: 'Creación de pedidos'
    },
    modify: {
      title: 'Modificación de pedidos'
    },
    detail: {
      title: 'Detalle del pedido'
    }
  },
  flavours: {
    default: {
      title: 'Lista de sabores',
      button: 'agregar sabor',
      to: ROUTES.flavours.create
    },
    add: {
      title: 'Creación de sabores'
    },
    modify: {
      title: 'Modificación de sabores'
    }
  },
  reports: {
    order: { title: 'Lista de ventas diarias' }
  }
}

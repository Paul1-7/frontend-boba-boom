import { ROLES, ROUTES } from '.'
const { ADMIN, CAMARERO } = ROLES
export const DASHBOARD_CONTENT = {
  orders: {
    default: {
      title: 'Lista de pedidos',
      button: {
        text: 'agregar pedido',
        allowedRols: [ADMIN, CAMARERO],
        to: ROUTES.orders.create
      }
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
      button: {
        text: 'agregar sabor',
        allowedRols: [ADMIN],
        to: ROUTES.flavours.create
      }
    },
    add: {
      title: 'Creación de sabores'
    },
    modify: {
      title: 'Modificación de sabores'
    }
  },
  users: {
    default: {
      title: 'Lista de usuarios',
      button: {
        text: 'agregar usuario',
        allowedRols: [ADMIN],
        to: ROUTES.users.create
      }
    },
    add: {
      title: 'Creación de usuarios'
    },
    modify: {
      title: 'Modificación del usuario'
    }
  },
  reports: {
    order: { title: 'Lista de ventas diarias' }
  }
}

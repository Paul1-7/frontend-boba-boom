export const DASHBOARD_ROUTE = "administracion";

export const ROUTES = {
  orders: {
    default: "pedidos",
    create: "pedidos/agregar",
    modify: "pedidos/modificar",
    detail: "pedidos/detalle",
  },
  menus: {
    default: "menus",
    create: "menus/agregar",
    modify: "menus/modificar",
  },
  flavours: {
    default: "sabores",
    create: "sabores/agregar",
    modify: "sabores/modificar",
  },
  users: {
    default: "usuarios",
    create: "usuarios/agregar",
    modify: "usuarios/modificar",
  },
  auth: {
    login: "/auth/login",
  },
};

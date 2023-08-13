export const DASHBOARD_ROUTE = "administracion";

export const ROUTES = {
  orders: {
    default: "pedidos",
    create: "pedidos/agregar",
    modify: "pedidos/modificar",
    detail: "pedidos/detalle",
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

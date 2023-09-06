import { ROUTES } from ".";

export const DASHBOARD_CONTENT = {
  orders: {
    default: { title: "Lista de pedidos", button: "agregar pedido" },
    add: {
      title: "Creación de pedidos",
    },
    modify: {
      title: "Modificación de pedidos",
    },
  },
  flavours: {
    default: { title: "Lista de sabores", button: "agregar sabor" ,
      to:ROUTES.flavours.create},
    add: {
      title: "Creación de sabores",
    },
    modify: {
      title: "Modificación de sabores",
    },
  },
  menus: {
    default: { title: "Lista de menus" },
  },
};

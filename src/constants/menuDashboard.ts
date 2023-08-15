import { OrderIc, UsersIc } from "@/assets";
import { ROUTES } from ".";

export interface MenuItem {
  name: string;
  Icon: () => JSX.Element;
  path: string;
}

export const MENU_ITEMS_DASHBOARD: MenuItem[] = [
  {
    name: "Pedidos",
    Icon: OrderIc,
    path: ROUTES.orders.default,
  },
  {
    name: "Usuarios",
    Icon: UsersIc,
    path: ROUTES.users.default,
  },
];

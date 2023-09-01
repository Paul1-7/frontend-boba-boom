import { MenuIc, OrderIc, UsersIc, flavourIc } from "@/assets";
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
  {
    name: "Menus",
    Icon: MenuIc,
    path: ROUTES.menus.default,
  },
  {
    name: "Sabores",
    Icon: flavourIc,
    path: ROUTES.flavours.default,
  },
];

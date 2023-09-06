import { Axios, menuItems } from "@/apis";
import { MenuI } from "..";
import { Item } from "@/components";
export const URL_MENUS = {
  default: "/api/v1/menus",
};

interface Data<T> {
  data: T;
}


export const listMenus = async (): Promise<MenuI[] | Item<MenuI>[]> => {
  const response = await Axios.get<Data<MenuI[]>>(URL_MENUS.default);

  if (response?.status !== 200) throw response.data;
  return menuItems(response.data.data);
};

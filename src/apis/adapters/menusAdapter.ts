import { Item } from "@/components";
import { MenuI } from "@/index";

export const menuItems = (data:MenuI[]): Item<MenuI>[]=> {
  return data.map(({id,name}) => ({value:id,label:name}))
}
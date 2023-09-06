import { Item } from "@/components"
import { Types } from "@/constants";


export const typesList = <T>(): Item<T>[] => {
  return Object.values(Types).map((value) => ({
    value,
    label: value
  }));
};
import { Axios } from "@/apis";
import { FlavourI } from "..";
export const URL_FLAVOURS = {
  default: "/api/v1/flavours",
};

interface Data<T> {
  data: T;
}

export const createFlavour = async (data: FlavourI) => {
  const response = await Axios.post(URL_FLAVOURS.default, data);

  if (response?.status !== 200 && response?.status !== 201) throw response.data;

  return response.data;
};

export const listFlavours = async (): Promise<FlavourI[]> => {
  const response = await Axios.get<Data<FlavourI[]>>(URL_FLAVOURS.default);

  if (response?.status !== 200) throw response.data;
  return response.data.data;
};

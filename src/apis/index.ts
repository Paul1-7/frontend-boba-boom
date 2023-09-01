import axios from "axios";
import { BASE_URL } from "@/config";
import { onResponse, onResponseError } from "./interceptors";

export const Axios = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

Axios.interceptors.response.use(onResponse, onResponseError);

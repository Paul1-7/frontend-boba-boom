const BASE_DEV = import.meta.env.VITE_API_URL_BASE_DEV
const BASE_PROD = import.meta.env.VITE_API_URL_BASE_PROD
export const PUBLIC_VAPID_KEY = import.meta.env.VITE_API_URL_PUBLIC_VAPID_KEY

export const BASE_URL = import.meta.env.PROD ? BASE_PROD : BASE_DEV

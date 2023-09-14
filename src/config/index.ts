const BASE_DEV = import.meta.env.VITE_API_URL_BASE_DEV
const BASE_PROD = import.meta.env.VITE_API_URL_BASE_PROD

export const BASE_URL = import.meta.env.PROD ? BASE_PROD : BASE_DEV

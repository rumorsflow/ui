export const API_URL = import.meta.env.VITE_APP_API_URL ?? '/api/v1'
export const APP_TELEGRAM_URL = import.meta.env.VITE_APP_TELEGRAM_URL ?? 'https://t.me/rumorbot'
export const APP_PER_PAGE = parseInt(import.meta.env.VITE_APP_PER_PAGE ?? '21', 10)
export const APP_NO_SSE = JSON.parse(import.meta.env.VITE_APP_NO_SSE ?? 'false') as boolean

export const APP_NAME_SHORT = import.meta.env.VITE_APP_NAME_SHORT ?? 'RF'
export const APP_NAME_LONG = import.meta.env.VITE_APP_NAME_LONG ?? 'Rumors Flow'
export const APP_NAME_CAPTION = import.meta.env.VITE_APP_NAME_CAPTION ?? ''
export const APP_NAME_TEMPLATE = import.meta.env.VITE_APP_NAME_TEMPLATE ?? `%s - ${APP_NAME_LONG}`

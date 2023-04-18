/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME_SHORT: string
  readonly VITE_APP_NAME_LONG: string
  readonly VITE_APP_NAME_CAPTION: string
  readonly VITE_APP_NAME_TEMPLATE: string
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_PER_PAGE: string
  readonly VITE_APP_TELEGRAM_URL: string
  readonly VITE_APP_NO_SSE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string
  readonly VITE_LOG_LEVEL: string
  readonly VITE_IMG_URL: string
  readonly VITE_FETCH_BASE_URL: string
  readonly VITE_FETCH_GET_MATCHES_URL: string
  readonly VITE_FETCH_GET_ALL_COMPETITIONS_URL: string
  readonly VITE_FETCH_GET_STANDING_URL: string
  readonly VITE_FETCH_GET_COMPETITION_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

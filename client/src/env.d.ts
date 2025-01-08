/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SOCKET_URL: string
  readonly VITE_APP_NAME: string
  readonly VITE_MAX_MESSAGE_LENGTH: string
  readonly VITE_MAX_USERNAME_LENGTH: string
  readonly VITE_MIN_USERNAME_LENGTH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 
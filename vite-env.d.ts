/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_REF_POST_LOGIN: string
  readonly VITE_REF_GET_ME_DATA: string
  readonly VITE_REF_POST_RELOGIN: string
  readonly VITE_REF_POST_LOGOUT: string
  readonly VITE_REF_GET_CURRENT_USER: string
  readonly VITE_API_BASE_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_REF_POST_LOGIN: string
  readonly VITE_REF_GET_ME_DATA: string
  readonly VITE_REF_POST_RELOGIN: string
  readonly VITE_REF_POST_LOGOUT: string
  readonly VITE_REF_GET_AUTH_STATUS: string
  readonly VITE_REF_GET_USERS: string
  readonly VITE_REF_GET_PROJECTS: string
  readonly VITE_REF_ROLES: string
  readonly VITE_API_TAGS_URL: string
  readonly VITE_API_TAG_GROUPS_URL: string
  readonly VITE_API_PROJECT_ROLES_URL: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_PARTNERS_URL: string
  readonly VITE_API_CHECKPOINTS_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

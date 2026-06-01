export const ENDPOINTS = {
  LOGIN: import.meta.env.VITE_REF_POST_LOGIN,
  STATUS: import.meta.env.VITE_REF_GET_AUTH_STATUS,
  ME: import.meta.env.VITE_REF_GET_ME_DATA,
  REFRESH: import.meta.env.VITE_REF_POST_RELOGIN,
  LOGOUT: import.meta.env.VITE_REF_POST_LOGOUT,
  USER_BY_ID: import.meta.env.VITE_REF_GET_CURRENT_USER,
  USERS_BY_NAME: import.meta.env.VITE_REF_GET_USERS_BY_NAME,
  PROJECTS_BY_NAME: import.meta.env.VITE_REF_GET_PROJECTS_BY_NAME,
  USER_PROJECTS: import.meta.env.VITE_REF_GET_USER_PROJECTS,
}

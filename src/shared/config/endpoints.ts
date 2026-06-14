export const ENDPOINTS = {
  LOGIN: import.meta.env.VITE_REF_POST_LOGIN,
  STATUS: import.meta.env.VITE_REF_GET_AUTH_STATUS,
  ME: import.meta.env.VITE_REF_GET_ME_DATA,
  REFRESH: import.meta.env.VITE_REF_POST_RELOGIN,
  LOGOUT: import.meta.env.VITE_REF_POST_LOGOUT,
  USER_BY_ID: (userId: string) => `${import.meta.env.VITE_REF_GET_USERS}/${userId}`,
  USERS_BY_NAME: import.meta.env.VITE_REF_GET_USERS,
  PROJECTS_BY_NAME: import.meta.env.VITE_REF_GET_PROJECTS,
  USER_PROJECTS: (userId: string) =>
    `${import.meta.env.VITE_REF_GET_USERS}/${userId}/${import.meta.env.VITE_REF_GET_PROJECTS}`,
  USER_ROLES: (userId: string, roleName: string) => `${import.meta.env.VITE_REF_GET_USERS}/${userId}/${import.meta.env.VITE_REF_ROLES}/${roleName}`,
  TAGS: import.meta.env.VITE_API_TAGS_URL,
  TAG_BY_ID: (tagId: string) => `${import.meta.env.VITE_API_TAGS_URL}/${tagId}`,
}

const SETTINGS_BASE = '/settings'

export const ROUTES = {
  MAIN: '/',
  LOGIN: '/login',
  PROJECTS: '/projects',
  USERS: '/users',
  ROLES: '/roles',
  REPORTS: '/reports',
  SETTINGS: {
    BASE: SETTINGS_BASE,
    TAGS: `${SETTINGS_BASE}/tags`,
    PROJECT_ROLES: `${SETTINGS_BASE}/project-roles`,
    PARTNERS: `${SETTINGS_BASE}/partners`,
    CHECKPOINTS: `${SETTINGS_BASE}/checkpoints`
  },
  USER: 'user/:id'
} as const

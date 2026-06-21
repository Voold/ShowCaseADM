import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { MainLayout, SettingsLayout } from '../layouts'
import { LoginPage } from '@/pages/login'
import { NotFoundPage } from '@/pages/not-found'
import { MainPage } from '@/pages/main/'
import { ProjectsPage } from '@/pages/projects'
import { UsersPage } from '@/pages/users'
import { RolesPage } from '@/pages/roles'
import { ReportsPage } from '@/pages/reports'
import { UserPage } from '@/pages/user'
import { TagsSettingsPage } from '@/pages/tags-settings'
import { ProjectRolesSettingsPage } from '@/pages/project-roles-settings'
import { ProtectedRoute } from '@/features/protected-route'
import { AuthBootstrapper } from '@/features/auth'
import { ROUTES } from '@/shared'

const RootRoute = () => {
  return (
    <>
      <AuthBootstrapper />
      <Outlet />
    </>
  )
}

export const router = createBrowserRouter([
  {
    element: <RootRoute />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [
              { index: true, element: <MainPage /> },
              { path: ROUTES.PROJECTS, element: <ProjectsPage /> },
              { path: ROUTES.USERS, element: <UsersPage /> },

              { path: ROUTES.USER, element: <UserPage /> },

              { path: ROUTES.ROLES, element: <RolesPage /> },
              { path: ROUTES.REPORTS, element: <ReportsPage /> },
              {
                path: ROUTES.SETTINGS.BASE,
                element: <SettingsLayout />,
                children: [
                  { index: true, element: <Navigate to={ROUTES.SETTINGS.TAGS} /> },
                  { path: ROUTES.SETTINGS.TAGS, element: <TagsSettingsPage /> },
                  { path: ROUTES.SETTINGS.PROJECT_ROLES, element: <ProjectRolesSettingsPage /> },
                  // { path: ROUTES.SETTINGS.PARTNERS, element: <TagsSettingsPage /> },
                  // { path: ROUTES.SETTINGS.CHECKPOINTS, element: <TagsSettingsPage /> }
                ]
              }
            ]
          }
        ]
      },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
])

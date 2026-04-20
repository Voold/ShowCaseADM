import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../layouts/main/MainLayout'
import { LoginPage } from '@/pages/login'
import { NotFoundPage } from '@/pages/not-found'
import { MainPage } from '@/pages/main/'
import { ProjectsPage } from '@/pages/projects'
import { UsersPage } from '@/pages/users'
import { RolesPage } from '@/pages/roles'
import { ReportsPage } from '@/pages/reports'
import { SettingsPage } from '@/pages/settings/ui/SettingsPage'
import { ProtectedRoute } from '@/features/protected-route'
import { ROUTES } from '@/shared'

export const router = createBrowserRouter([
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
          { path: ROUTES.ROLES, element: <RolesPage /> },
          { path: ROUTES.REPORTS, element: <ReportsPage /> },
          { path: ROUTES.SETTINGS, element: <SettingsPage /> }
        ]
      }
    ]
  },
  { path: '*', element: <NotFoundPage /> }
])

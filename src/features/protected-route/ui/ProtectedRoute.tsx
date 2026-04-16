import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/entities/user'
import { ROUTES } from '@/shared'
import { assertNever } from '@/shared'

export const ProtectedRoute = () => {
  const status = useAuthStore(state => state.status)

  switch (status) {
    case 'idle':
    case 'loading':
      return <div>Загрузка...</div>
    case 'authenticated':
      return <Outlet />
    case 'unauthenticated':
      return <Navigate to={ROUTES.LOGIN} replace />
    default:
      return assertNever(status)
  }
}

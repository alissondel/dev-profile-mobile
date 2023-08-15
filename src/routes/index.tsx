import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { useAuth } from '../hooks/useAuth'

export default function Routes() {
  const { user } = useAuth()
  return user?.id ? <AppRoutes /> : <AuthRoutes />
}

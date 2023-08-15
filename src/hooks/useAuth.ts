import { useContext } from 'react'

import { AuthContext, AuthContextData } from '../context/AuthContext'

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useTasks deve ser usado dentro de um JwtProvider')
  }

  return context
}

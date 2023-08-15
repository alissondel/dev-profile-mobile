import { ReactNode } from 'react'

export interface UserData {
  id: string
  name: string
  email: string
  avatar_url?: string
}

export interface AuthCredentialsData {
  email: string
  password: string
}

export interface AuthContextData {
  user: UserData
  signIn(credentials: AuthCredentialsData): void
  signOut(): void
  updateUser(user: UserData): void
}

export interface AuthProviderProps {
  children: ReactNode
}

export interface AuthStateData {
  token: string
  user: UserData
}

import { createContext, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { api } from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  AuthCredentialsData,
  AuthContextData,
  AuthProviderProps,
  AuthStateData,
  UserData,
} from './types'

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const tokenData = 'acessToken:token'
const userData = 'acessToken:user'

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthStateData>({} as AuthStateData)

  useEffect(() => {
    async function loadAuthData() {
      const user = await AsyncStorage.getItem(userData)
      const token = await AsyncStorage.getItem(tokenData)

      if (token && user) {
        setData({ token, user: JSON.parse(user) })
        api.defaults.headers.common.Authorization = `Bearer ${token}`
      }
    }

    loadAuthData()
  }, [])

  async function signIn({ email, password }: AuthCredentialsData) {
    try {
      const response = await api.post('sessions', {
        email,
        password,
      })

      const { token, user } = response.data

      await AsyncStorage.setItem(tokenData, token)
      await AsyncStorage.setItem(userData, JSON.stringify(user))
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setData({ token, user })
    } catch (error) {
      Alert.alert(
        'Erro na autenticação!',
        'Verfica se o email e senha estão corretos.',
      )
      throw new Error(error as string)
    }
  }

  async function updateUser(user: UserData) {
    await AsyncStorage.setItem(userData, JSON.stringify(user))
    setData({
      user,
      token: data.token,
    })
  }

  async function signOut() {
    await AsyncStorage.removeItem(tokenData)
    await AsyncStorage.removeItem(userData)
    setData({} as AuthStateData)
  }

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

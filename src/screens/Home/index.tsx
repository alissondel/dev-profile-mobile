import { Alert } from 'react-native'
import { useAuth } from '../../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  UserAvatarButton,
  UserAvatar,
  UserInfoDetail,
  Usergreeting,
  Username,
  Icon,
  LogoutButton,
  UserList,
  UserListHeader,
  UserListEmpty,
} from './styles'

import AvatarDefault from '../../assets/avatar02.png'
import { useEffect, useState } from 'react'
import { UserData } from '../../context/types'
import { api } from '../../services/api'
import User from '../../components/User'

interface ScreenNavigationProps {
  navigate: (screen: string, params?: unknown) => void
}

export default function Home() {
  const [users, setUsers] = useState<UserData[]>([])

  const { navigate } = useNavigation<ScreenNavigationProps>()
  const { user, signOut } = useAuth()

  useEffect(() => {
    async function loadUsers() {
      const res = await api.get('users')
      setUsers(res.data)
    }

    loadUsers()
  }, [])

  function handleSignOut() {
    Alert.alert('Tem certeza?', 'Deseja realmente sair da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      },
    ])
  }

  function handleUserDetails(userId: string) {
    navigate('UserDetails', { userId })
  }

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={() => navigate('UserProfile')}>
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : AvatarDefault
                }
              />
            </UserAvatarButton>
            <UserInfoDetail>
              <Usergreeting>Olá, </Usergreeting>
              <Username>{user?.name}</Username>
            </UserInfoDetail>
          </UserInfo>
          <LogoutButton onPress={handleSignOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <UserList
        data={users}
        keyExtractor={(item: UserData) => item.id}
        renderItem={({ item }: UserData | any) => (
          <User data={item} onPress={() => handleUserDetails(item.id)} />
        )}
        ListHeaderComponent={<UserListHeader>Usuários</UserListHeader>}
        ListEmptyComponent={
          <UserListEmpty>Ops! Ainda não há registros.</UserListEmpty>
        }
      />
    </Container>
  )
}

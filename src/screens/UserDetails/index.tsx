import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { UserData } from '../../context/types'
import { api } from '../../services/api'
import AvatarDefault from '../../assets/avatar02.png'

import {
  Container,
  Content,
  ContentTitle,
  EmailData,
  EmailTitle,
  GoBackButton,
  Header,
  HeaderTile,
  Icon,
  NameData,
  NameTitle,
  UserAvatar,
  UserDetailAvatar,
  UserEmailDetail,
  UserNameDetail,
} from './styles'
import { useAuth } from '../../hooks/useAuth'

interface RouteParams {
  userId: string
}

interface ScreenNavigationProps {
  goBack: () => void
}

export default function UserDetails() {
  const [userDetails, setUserDetails] = useState<UserData>({} as UserData)

  const router = useRoute()
  const { goBack } = useNavigation<ScreenNavigationProps>()
  const { userId } = router.params as RouteParams
  const { user } = useAuth()

  useEffect(() => {
    async function loaderUser() {
      const res = await api.get(`/users/${userId}`)
      setUserDetails(res.data)
    }
    loaderUser()
  }, [userId])

  return (
    <Container>
      <Header>
        <GoBackButton onPress={goBack}>
          <Icon name="chevron-left" />
        </GoBackButton>
        <HeaderTile>Usuários</HeaderTile>
        <UserAvatar
          source={user.avatar_url ? { uri: user.avatar_url } : AvatarDefault}
        />
      </Header>
      <Content>
        <ContentTitle>Detalhes do Usuário</ContentTitle>
        <UserDetailAvatar
          source={
            userDetails.avatar_url
              ? { uri: userDetails.avatar_url }
              : AvatarDefault
          }
        />

        <UserNameDetail>
          <NameTitle>Nome</NameTitle>
          <NameData>{userDetails.name}</NameData>
        </UserNameDetail>

        <UserEmailDetail>
          <EmailTitle>Email</EmailTitle>
          <EmailData>{userDetails.email}</EmailData>
        </UserEmailDetail>
      </Content>
    </Container>
  )
}

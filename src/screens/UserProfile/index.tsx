import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../../hooks/useAuth'

import {
  Container,
  Content,
  EmailData,
  EmailTitle,
  GoBackButton,
  Header,
  HeaderTile,
  Icon,
  NameData,
  NameTitle,
  UserAvatar,
  UserEmailDetail,
  UserNameDetail,
  PhotoContainer,
  PhotoButton,
  HeaderTop,
} from './styles'

import AvatarDefault from '../../assets/avatar02.png'
import { Button } from '../../components/Form/Button'

interface ScreenNavigationProps {
  goBack: () => void
  navigate: (screen: string) => void
}

export default function UserProfile() {
  const { user } = useAuth()
  const { goBack, navigate } = useNavigation<ScreenNavigationProps>()

  return (
    <Container>
      <Header>
        <HeaderTop>
          <GoBackButton onPress={goBack}>
            <Icon name="chevron-left" />
          </GoBackButton>
          <HeaderTile>Seu Perfil</HeaderTile>
        </HeaderTop>
      </Header>
      <PhotoContainer>
        <UserAvatar
          source={user.avatar_url ? { uri: user.avatar_url } : AvatarDefault}
        />
        <PhotoButton>
          <Icon name="camera" />
        </PhotoButton>
      </PhotoContainer>
      <Content>
        <UserNameDetail>
          <NameTitle>Nome</NameTitle>
          <NameData>{user.name}</NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle>Email</EmailTitle>
          <EmailData>{user.email}</EmailData>
        </UserEmailDetail>
        <Button
          title="Editar dados do perfil"
          onPress={() => navigate('UserProfileEdit')}
        />
        <Button
          title="Trocar senha"
          onPress={() => navigate('UserProfilePassword')}
        />
      </Content>
    </Container>
  )
}

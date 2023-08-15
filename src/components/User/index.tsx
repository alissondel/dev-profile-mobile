import AvatarDefault from '../../assets/avatar02.png'
import { UserData } from '../../context/types'

import {
  Container,
  EmailData,
  EmailTitle,
  NameData,
  NameTitle,
  UserAvatar,
  UserDetail,
  UserEmailDetail,
  UserNameDetail,
} from './styles'

interface UserProps {
  data: UserData
  onPress: () => void
}

export default function User({ data, onPress }: UserProps) {
  return (
    <Container onPress={onPress}>
      <UserDetail>
        <UserNameDetail>
          <NameTitle>Nome</NameTitle>
          <NameData>{data.name}</NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle>Email</EmailTitle>
          <EmailData>{data.email}</EmailData>
        </UserEmailDetail>
      </UserDetail>
      <UserAvatar
        source={data.avatar_url ? { uri: data.avatar_url } : AvatarDefault}
      />
    </Container>
  )
}

import styled, { DefaultTheme } from 'styled-components/native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

import { FlatList, FlatListProps } from 'react-native'
import { UserData } from '../../context/types'

interface StyledProps {
  theme: DefaultTheme
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: StyledProps) => theme.colors.dark};
`

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(17)}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-top: ${RFValue(28)}px;
  background-color: ${({ theme }: StyledProps) => theme.colors.secondary};
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`
export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`
export const UserInfoDetail = styled.View`
  margin-left: 17px;
`

export const Usergreeting = styled.Text`
  color: ${({ theme }: StyledProps) => theme.colors.gray800};
  font-size: ${RFValue(16)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.regular};
`

export const Username = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }: StyledProps) => theme.colors.gray800};
  font-family: ${({ theme }: StyledProps) => theme.fonts.bold};
  font-weight: bold;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }: StyledProps) => theme.colors.dark};
`
export const LogoutButton = styled.TouchableOpacity``

export const UserList = styled(
  FlatList as new (props: FlatListProps<UserData>) => FlatList<UserData>,
).attrs({
  contentContainerStyle: {
    padding: 24,
  },
  showVerticalScrollIndicator: false,
})``

export const UserListEmpty = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.regular};
  color: ${({ theme }: StyledProps) => theme.colors.gray500};
`

export const UserListHeader = styled.Text`
  font-size: ${RFValue(24)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.bold};
  font-weight: bold;
  color: ${({ theme }: StyledProps) => theme.colors.primary};
  margin-bottom: ${RFValue(8)}px;
`

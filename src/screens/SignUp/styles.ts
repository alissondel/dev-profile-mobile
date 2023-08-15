import styled, { DefaultTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

interface StyledProps {
  theme: DefaultTheme
}

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }: StyledProps) => theme.colors.dark};
`
export const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px;
`
export const Logo = styled.Image`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
  margin-bottom: ${RFValue(4)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.regular};
  color: ${({ theme }: StyledProps) => theme.colors.light};
  margin: 24px;
`

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }: StyledProps) => theme.colors.primary};
`

export const BackToSignIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ theme }: StyledProps) => theme.colors.gray800};
  border-top-width: 1px;
  border-color: ${({ theme }: StyledProps) => theme.colors.black};
  padding: 16px 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const BackToSignInTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.regular};
  color: ${({ theme }: StyledProps) => theme.colors.primary};
  margin-left: 16px;
`

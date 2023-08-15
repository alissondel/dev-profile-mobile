import styled, { DefaultTheme } from 'styled-components/native'
import { RFValue } from 'react-native-responsive-fontsize'

interface StyledProps {
  theme: DefaultTheme
}

export const Container = styled.View`
  width: 100%;
`
export const Error = styled.Text`
  font-family: ${({ theme }: StyledProps) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }: StyledProps) => theme.colors.danger};
  margin-bottom: 16px;
`

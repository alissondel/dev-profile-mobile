import styled, { DefaultTheme } from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

interface StyledProps {
  theme: DefaultTheme
}

export const Container = styled(TextInput)`
  width: 100%;
  padding: 18px 16px;
  background-color: ${({ theme }: StyledProps) => theme.colors.gray800};
  color: ${({ theme }: StyledProps) => theme.colors.light};
  border-radius: 5px;
  margin-bottom: 16px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.regular};
`

import { TouchableOpacity } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import styled, { DefaultTheme } from 'styled-components/native'

interface StyledProps {
  theme: DefaultTheme
}

export const Container = styled(TouchableOpacity)`
  width: 100%;
  align-items: center;
  background-color: ${({ theme }: StyledProps) => theme.colors.primary};
  border-radius: 5px;
  padding: 18px;
  margin-top: ${RFValue(16)}px;
`

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }: StyledProps) => theme.fonts.bold};
  color: ${({ theme }: StyledProps) => theme.colors.dark};
`

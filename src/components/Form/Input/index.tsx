import { FunctionComponent } from 'react'
import { TextInputProps } from 'react-native'
import { Container } from './styles'
import theme from '../../../global/styles/theme'

export const Input: FunctionComponent<TextInputProps> = ({ ...otherProps }) => {
  return (
    <Container placeholderTextColor={theme.colors.gray500} {...otherProps} />
  )
}

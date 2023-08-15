import { FunctionComponent } from 'react'
import { TextInputProps } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { Container, Error } from './styles'
import { Input } from '../Input'

interface InputControlProps extends TextInputProps {
  control: Control | any
  name: string
  error: string | undefined
}

export const InputControl: FunctionComponent<InputControlProps> = ({
  control,
  name,
  error,
  ...otherProps
}) => {
  return (
    <Container>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...otherProps} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}

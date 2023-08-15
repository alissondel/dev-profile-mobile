import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Content,
  Title,
  Logo,
  BackToSignIn,
  Icon,
  BackToSignInTitle,
} from './styles'

import { Button } from '../../components/Form/Button'
import { InputControl } from '../../components/Form/inputControl'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import LogoImage from '../../assets/logo.png'
import { api } from '../../services/api'

interface ScreenNavigationProp {
  navigate: (screen: string) => void
}

interface IFormInputs {
  token: string
  password: string
  password_confirmation: string
}

const formSchema = yup
  .object({
    token: yup.string().uuid('Código Invalido!').required('Informe o código'),
    password: yup
      .string()
      .min(4, 'Senha deve conter no minimo 4 caracteres!')
      .required('Informe a nova senha'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Confirmação Incorreta')
      .min(4, 'Senha deve conter no minimo 4 caracteres!')
      .required('Informe a confirmação da nova senha'),
  })
  .required()

export default function ResetPassword() {
  const { navigate } = useNavigation<ScreenNavigationProp>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      token: '',
      password: '',
      password_confirmation: '',
    },
    resolver: yupResolver(formSchema),
  })

  async function handleResetPassword({
    token,
    password,
    password_confirmation,
  }: IFormInputs) {
    try {
      await api.post('password/reset', {
        token,
        password,
        password_confirmation,
      })
      Alert.alert(
        'Senha Redefinida com Sucesso!',
        'Efetue o login para acessar o sistema!',
      )
      navigate('SignIn')
    } catch (error) {
      Alert.alert('Ocorreu um erro ao redefinir a senha. Tente novamente')
      console.error(error)
    }
  }

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={LogoImage} />
            <View>
              <Title>Redefinir a senha</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="token"
              placeholder="Código"
              error={errors.token && errors.token.message}
            />
            <InputControl
              autoCorrect={false}
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <InputControl
              autoCorrect={false}
              control={control}
              name="password_confirmation"
              placeholder="Confirmar Senha"
              secureTextEntry
              error={
                errors.password_confirmation &&
                errors.password_confirmation.message
              }
            />
            <Button
              title="Enviar"
              onPress={handleSubmit(handleResetPassword)}
            />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignIn onPress={() => navigate('SignIn')}>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Voltar para login</BackToSignInTitle>
      </BackToSignIn>
    </KeyboardAvoidingView>
  )
}

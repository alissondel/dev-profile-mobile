import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  View,
  Alert,
} from 'react-native'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Content,
  Title,
  Logo,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  CreateAccount,
  Icon,
  CreateAccountTitle,
} from './styles'

import { Button } from '../../components/Form/Button'
import { InputControl } from '../../components/Form/inputControl'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import LogoImage from '../../assets/logo.png'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

interface ScreenNavigationProp {
  navigate: (screen: string) => void
}

interface IFormInputs {
  email: string
  password: string
}

const formSchema = yup
  .object({
    email: yup.string().email('Email Invalido!').required('Informe o email'),
    password: yup
      .string()
      .min(4, 'Senha deve conter no minimo 4 caracteres!')
      .required('Informe a senha'),
  })
  .required()

export default function SignIn() {
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const { navigate } = useNavigation<ScreenNavigationProp>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(formSchema),
  })

  async function handleSignIn({ email, password }: IFormInputs) {
    try {
      setLoading(true)
      signIn({ email, password })
      Alert.alert('Usuário logado com sucesso!')
    } catch (error) {
      Alert.alert('Erro na autenticação!')
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
              <Title>Faça seu login</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <InputControl
              autoCorrect={false}
              control={control}
              name="password"
              placeholder="Senha"
              secureTextEntry
              error={errors.password && errors.password.message}
            />
            <Button
              title="Entrar"
              onPress={handleSubmit(handleSignIn)}
              disabled={loading || !!errors.email || !!errors.password}
            />
            <ForgotPasswordButton onPress={() => navigate('ForgotPassword')}>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount onPress={() => navigate('SignUp')}>
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  )
}

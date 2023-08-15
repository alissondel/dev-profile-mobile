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
  name: string
  email: string
  password: string
}

const formSchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Nome deve conter no minimo 3 caracteres!')
      .required('Informe o nome completo'),
    email: yup.string().email('Email Invalido!').required('Informe o email'),
    password: yup
      .string()
      .min(4, 'Senha deve conter no minimo 4 caracteres!')
      .required('Informe a senha'),
  })
  .required()

export default function SignUp() {
  const { navigate } = useNavigation<ScreenNavigationProp>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(formSchema),
  })

  async function handleSignUp({ name, email, password }: IFormInputs) {
    try {
      await api.post('users', {
        name,
        email,
        password,
      })
      Alert.alert('Cadastro realizado com sucesso ')
      navigate('SignIn')
    } catch (error) {
      Alert.alert('Ocorreu um erro ao enviar o email. Tente novamente')
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
              <Title>Crie sua conta</Title>
            </View>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
              error={errors.name && errors.name.message}
            />
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
            <Button title="Criar Conta" onPress={handleSubmit(handleSignUp)} />
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

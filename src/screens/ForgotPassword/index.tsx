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

interface FormInputsData {
  email: string
}

const formSchema = yup
  .object({
    email: yup.string().email('Email Invalido!').required('Informe o email'),
  })
  .required()

export default function ForgotPassword() {
  const { navigate } = useNavigation<ScreenNavigationProp>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputsData>({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(formSchema),
  })

  async function handleForgotPassword({ email }: FormInputsData) {
    try {
      await api.post('password/forgot', { email })
      Alert.alert(
        'Email enviado',
        'Você receberá um email com as instruções para redefinir sua nova senha',
      )

      navigate('ResetPassword')
    } catch (error) {
      Alert.alert('Ocorreu um erro ao fazer envio do email. Tente novamente')
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
              <Title>Esqueci minha senha</Title>
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
            <Button
              title="Enviar"
              onPress={handleSubmit(handleForgotPassword)}
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

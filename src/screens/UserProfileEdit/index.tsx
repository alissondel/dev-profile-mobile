import { Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'

import { useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'

import {
  Container,
  Content,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
  Title,
  UserAvatar,
} from './styles'

import { Button } from '../../components/Form/Button'
import { InputControl } from '../../components/Form/inputControl'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { api } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

import AvatarDefault from '../../assets/avatar02.png'

interface ScreenNavigationProp {
  goBack: () => void
}

interface IFormInputs {
  name: string
  email: string
}

const formSchema = yup
  .object({
    name: yup
      .string()
      .min(3, 'Nome deve conter no minimo 3 caracteres!')
      .required('Informe o nome completo'),
    email: yup.string().email('Email Invalido!').required('Informe o email'),
  })
  .required()

export default function UserProfileEdit() {
  const { user, updateUser } = useAuth()
  const { goBack } = useNavigation<ScreenNavigationProp>()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      name: user.name,
      email: user.email,
    },
    resolver: yupResolver(formSchema),
  })

  async function handleProfileEdit({ name, email }: IFormInputs) {
    try {
      const res = await api.put('profile', { name, email })
      updateUser(res.data)
      Alert.alert('Perfil Atualizado com Sucesso!')
      goBack()
    } catch (error) {
      Alert.alert(
        'Ocorreu um erro ao atualizar perfil do usuário. Tente novamente',
      )
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
          <Header>
            <GoBackButton onPress={goBack}>
              <Icon name="chevron-left" />
            </GoBackButton>
            <HeaderTitle>Seu perfil</HeaderTitle>
            <UserAvatar
              source={
                user.avatar_url ? { uri: user.avatar_url } : AvatarDefault
              }
            />
          </Header>
          <Content>
            <Title>Editar dados do perfil</Title>
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
            <Button
              title="Salvar Alterações"
              onPress={handleSubmit(handleProfileEdit)}
              disabled={!!errors.name || !!errors.email}
            />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

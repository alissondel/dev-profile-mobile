import { useEffect } from 'react'

// IMPORT EXPO
import * as SplashScreen from 'expo-splash-screen'

// IMPORTS THEME
import theme from './src/global/styles/theme'
import { ThemeProvider } from 'styled-components'

// IMPORTS FONTS
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto'

import Routes from './src/routes'
import { StatusBar } from 'react-native'
import { AuthProvider } from './src/context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  useEffect(() => {
    onLayoutRootView()
  }, [fontsLoaded]) //eslint-disable-line

  async function onLayoutRootView() {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </ThemeProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}

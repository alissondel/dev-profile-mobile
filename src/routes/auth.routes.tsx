import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Import Screens
import SignIn from '../screens/SignIn'
import SignUp from '../screens/SignUp'
import ForgotPassword from '../screens/ForgotPassword'
import ResetPassword from '../screens/ResetPassword'

const Auth = createNativeStackNavigator()

export default function AuthRoutes() {
  return (
    <Auth.Navigator
      initialRouteName="SignIn"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="SignIn" component={SignIn} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="ForgotPassword" component={ForgotPassword} />
      <Auth.Screen name="ResetPassword" component={ResetPassword} />
    </Auth.Navigator>
  )
}

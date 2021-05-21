// Sign In, Sign Up & Change Password
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginLandingScreen from '../screens/Auth/LoginLandingScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ProfileLandingScreen from '../screens/Auth/ProfileLandingScreen';
import InputBackgroundScreen1 from '../screens/Auth/InputBackgroundScreen1';
import InputBackgroundScreen2 from '../screens/Auth/InputBackgroundScreen2';
import InputBackgroundScreen3 from '../screens/Auth/InputBackgroundScreen3';
import PreferencesLandingScreen from '../screens/Auth/PreferencesLandingScreen';
import PrefInputScreen1 from '../screens/Auth/PreferenceInputScreen1';
import PrefInputScreen2 from '../screens/Auth/PreferenceScreen2';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import { FlexStyleProps } from '@ui-kitten/components/devsupport';
import ForgotPasswordConfirmationScreen from '../screens/Auth/ForgotPasswordConfirmationScreen';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='LoginLanding' component={LoginLandingScreen} />
    <Screen name='Login' component={LoginScreen} />
    <Screen name='ForgotPasswordScreen' component={ForgotPasswordScreen} />
    <Screen
      name='ForgotPasswordConfirmationScreen'
      component={ForgotPasswordConfirmationScreen}
    />
    <Screen name='Signup' component={SignupScreen} />
    <Screen name='ProfileLanding' component={ProfileLandingScreen} />
    <Screen name='InputBackgroundScreen1' component={InputBackgroundScreen1} />
    <Screen name='InputBackgroundScreen2' component={InputBackgroundScreen2} />
    <Screen name='InputBackgroundScreen3' component={InputBackgroundScreen3} />
    <Screen
      name='PreferencesLandingScreen'
      component={PreferencesLandingScreen}
    />
    <Screen name='PrefInputScreen1' component={PrefInputScreen1} />
    <Screen name='PrefInputScreen2' component={PrefInputScreen2} />
  </Navigator>
);

export default AuthNavigator;

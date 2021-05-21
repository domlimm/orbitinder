import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  LoginLandingScreen,
  LoginScreen,
  SignupScreen,
  ProfileLandingScreen,
  InputBackgroundScreen1,
  InputBackgroundScreen2,
  InputBackgroundScreen3,
  PreferencesLandingScreen,
  PrefInputScreen1,
  PrefInputScreen2,
  ForgotPasswordScreen,
  ForgotPasswordConfirmationScreen
} from '../screens/index';

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

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeLandingScreen,
  LoginLandingScreen,
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
  ForgotPasswordConfirmationScreen
} from '../screens/index';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='HomeLanding' component={HomeLandingScreen} />
    <Screen name='LoginLanding' component={LoginLandingScreen} />
    <Screen name='Login' component={LoginScreen} />
    <Screen name='Signup' component={SignupScreen} />
    <Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    <Screen
      name='ForgotPasswordConfirmation'
      component={ForgotPasswordConfirmationScreen}
    />
  </Navigator>
);

export default AuthNavigator;

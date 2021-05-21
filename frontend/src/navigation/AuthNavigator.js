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
  ForgotPasswordConfirmationScreen,
  HomeLandingScreen
} from '../screens/index';

const { Navigator, Screen } = createStackNavigator();

const AuthNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='LoginLanding' component={LoginLandingScreen} />
    <Screen name='Login' component={LoginScreen} />
    <Screen name='Signup' component={SignupScreen} />
    <Screen name='ProfileLanding' component={ProfileLandingScreen} />
    <Screen name='InputBackground1' component={InputBackgroundScreen1} />
    <Screen name='InputBackground2' component={InputBackgroundScreen2} />
    <Screen name='InputBackground3' component={InputBackgroundScreen3} />
    <Screen name='PreferencesLanding' component={PreferencesLandingScreen} />
    <Screen name='PrefInput1' component={PrefInputScreen1} />
    <Screen name='PrefInput2' component={PrefInputScreen2} />
    <Screen name='ForgotPassword' component={ForgotPasswordScreen} />
    <Screen
      name='ForgotPasswordConfirmation'
      component={ForgotPasswordConfirmationScreen}
    />
  </Navigator>
);

export default AuthNavigator;

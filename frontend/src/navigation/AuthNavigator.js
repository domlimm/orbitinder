import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  OnboardingScreen,
  HomeLandingScreen,
  LoginLandingScreen,
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
  ForgotPasswordConfirmationScreen
} from '../screens/index';

const Auth = createStackNavigator();

const AuthNavigator = () => {
  const [hasInit, setHasInit] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem('init').then(value => {
      if (value) {
        setHasInit(true);
      } else {
        setHasInit(false);
      }
    });
  }, []);

  return (
    <Auth.Navigator headerMode='none'>
      {!hasInit && (
        <Auth.Screen name='HomeLanding' component={OnboardingScreen} />
      )}
      <Auth.Screen name='LoginLanding' component={LoginLandingScreen} />
      <Auth.Screen name='Login' component={LoginScreen} />
      <Auth.Screen name='Signup' component={SignupScreen} />
      <Auth.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
      <Auth.Screen
        name='ForgotPasswordConfirmation'
        component={ForgotPasswordConfirmationScreen}
      />
    </Auth.Navigator>
  );
};

export default AuthNavigator;

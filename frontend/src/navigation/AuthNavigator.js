import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  HomeLandingScreen,
  LoginLandingScreen,
  LoginScreen,
  SignupScreen,
  ForgotPasswordScreen,
  ForgotPasswordConfirmationScreen
} from '../screens/index';

const { Navigator, Screen } = createStackNavigator();

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
    <Navigator headerMode='none'>
      {!hasInit && <Screen name='HomeLanding' component={HomeLandingScreen} />}
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
};

export default AuthNavigator;

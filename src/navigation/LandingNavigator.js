import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLandingScreen from '../screens/HomeLandingScreen';
import LoginLandingScreen from '../screens/LoginLandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

const { Navigator, Screen } = createStackNavigator();

const LandingNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen name='Home' component={HomeLandingScreen} />
      <Screen name='LoginLanding' component={LoginLandingScreen} />
      <Screen name='Login' component={LoginScreen} />
      <Screen name='Signup' component={SignupScreen} />
    </Navigator>
  </NavigationContainer>
);

export default LandingNavigator;

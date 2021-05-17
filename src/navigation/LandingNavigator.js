import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeLandingScreen } from '../screens/HomeLandingScreen';
import { LoginLandingScreen } from '../screens/LoginLandingScreen';
import { LoginScreen } from '../screens/LoginScreen';

const { Navigator, Screen } = createStackNavigator();

export const LandingNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen name='Home' component={HomeLandingScreen} />
      <Screen name='LoginLanding' component={LoginLandingScreen} />
      <Screen name='Login' component={LoginScreen} />
    </Navigator>
  </NavigationContainer>
);

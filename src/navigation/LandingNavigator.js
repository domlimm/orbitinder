import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeLandingScreen } from '../screens/HomeLanding';
import { LoginLanding } from '../screens/LoginLanding';

const { Navigator, Screen } = createStackNavigator();

export const LandingNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen name='Home' component={HomeLandingScreen} />
      <Screen name='LoginLanding' component={LoginLanding} />
    </Navigator>
  </NavigationContainer>
);

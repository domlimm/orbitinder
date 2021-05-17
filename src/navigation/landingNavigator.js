import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeLandingScreen } from '../screens/HomeLanding';

const { Navigator, Screen } = createStackNavigator();

export const LandingNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen name='Home' component={HomeLandingScreen} />
    </Navigator>
  </NavigationContainer>
);

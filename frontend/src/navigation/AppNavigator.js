import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLandingScreen from '../screens/HomeLandingScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen name='Home' component={HomeLandingScreen} />
      <Screen name='AuthNavigator' component={AuthNavigator} />
      <Screen name='MainNavigator' component={MainNavigator} />
    </Navigator>
  </NavigationContainer>
);

export default AppNavigator;

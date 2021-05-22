import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { HomeLandingScreen } from '../screens/index';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  // TODO: Check if first load for splash screen, to be done last.

  // Do Auth here.
  const [authenticated, setAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const checkAuth = async () => {
      if (await isAuthenticated()) {
        setAuthenticated(!authenticated);
      } else {
        setAuthenticated(false);
      }
    };

    checkAuth();
  }, [isAuthenticated]);

  const isAuthenticated = async () => {
    // await AsyncStorage.removeItem('token'); // To manually logout
    const token = await AsyncStorage.getItem('token');

    // Token exists ? true : false
    return !!token;
  };

  return (
    <NavigationContainer>
      <Navigator headerMode='none'>
        {authenticated ? (
          <Screen name='MainNavigator' component={MainNavigator} />
        ) : (
          <Screen name='AuthNavigator' component={AuthNavigator} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

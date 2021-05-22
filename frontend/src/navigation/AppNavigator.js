import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoadingScreen } from '../screens/index';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    const checkAuth = async () => {
      if (await isAuthenticated()) {
        setAuthenticated(true);
        setIsLoading(false);
      } else {
        setAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isAuthenticated = async () => {
    // await AsyncStorage.removeItem('token'); // To manually logout
    const token = await AsyncStorage.getItem('token');

    // Token exists ? true : false
    return !!token;
  };

  return (
    <NavigationContainer>
      <Navigator headerMode='none'>
        {authenticated && !isLoading ? (
          <Screen name='MainNavigator' component={MainNavigator} />
        ) : !authenticated && !isLoading ? (
          <Screen name='AuthNavigator' component={AuthNavigator} />
        ) : (
          <Screen name='Loading' component={LoadingScreen} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

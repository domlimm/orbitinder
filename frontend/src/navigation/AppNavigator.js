import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';

import { LoadingScreen } from '../screens/index';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const authHandler = () => {
    setIsLoading(true);

    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        setIsLoading(false);
      } else {
        setAuthenticated(false);
        setIsLoading(false);

        // TODO: Logout
      }
    });
  };

  React.useEffect(() => {
    const unsubscribe = authHandler();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer>
      {authenticated && !isLoading ? (
        <MainNavigator />
      ) : !authenticated && !isLoading ? (
        <AuthNavigator />
      ) : (
        <LoadingScreen />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;

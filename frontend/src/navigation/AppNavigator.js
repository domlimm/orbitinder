import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';
import { useDispatch } from 'react-redux';

import { LoadingScreen } from '../screens/index';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import * as authActions from '../redux/actions/auth';

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();

  const authHandler = async () => {
    setIsLoading(true);

    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        setIsLoading(false);
        dispatch(authActions.setCurrentUser(user.displayName));
      } else {
        setAuthenticated(false);
        setIsLoading(false);
        // TODO: Auto Logout
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
      <Navigator headerMode='none'>
        {authenticated && !isLoading ? (
          <Screen name='DrawerNavigator' component={DrawerNavigator} />
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

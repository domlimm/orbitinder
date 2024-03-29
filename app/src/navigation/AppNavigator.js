import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LoadingScreen } from '../screens/index';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import RegisterNavigator from './RegisterNavigator';
import * as authActions from '../redux/actions/auth';
import * as userActions from '../redux/actions/user';
import * as usersActions from '../redux/actions/users';
import { navigationRef } from '../navigation/RootNavigation';
import useNotifications from '../hooks/useNotifications';

const App = createStackNavigator();

const AppNavigator = () => {
  useNotifications();
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const isRegistering = useSelector(state => state.auth.isRegistering);

  const dispatch = useDispatch();

  const authHandler = () => {
    setIsLoading(true);

    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        AsyncStorage.setItem('init', 'true').then(() => {
          dispatch(
            authActions.setCurrentUser(
              user.uid,
              user.displayName,
              isRegistering
            )
          );
          dispatch(userActions.getUserData());
          dispatch(usersActions.getAllUserData());
        });

        setAuthenticated(true);
        setIsLoading(false);
      } else {
        dispatch(authActions.logOut());
        dispatch(userActions.logOut());
        dispatch(usersActions.logOut());
        setAuthenticated(false);
        setIsLoading(false);
      }
    });
  };

  React.useEffect(() => {
    const unsubscribe = authHandler();
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <App.Navigator headerMode='none'>
        {authenticated && !isRegistering && !isLoading ? (
          <App.Screen name='DrawerNavigator' component={DrawerNavigator} />
        ) : !authenticated && !isLoading ? (
          <App.Screen name='AuthNavigator' component={AuthNavigator} />
        ) : isRegistering && !isLoading ? (
          <App.Screen name='RegisterNavigator' component={RegisterNavigator} />
        ) : (
          <App.Screen name='Loading' component={LoadingScreen} />
        )}
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '../firebase';
import { useDispatch, useSelector } from 'react-redux';

import {
  LoadingScreen,
  PreferencesLandingScreen,
  PrefInputScreen1,
  PrefInputScreen2
} from '../screens/index';
import DrawerNavigator from './DrawerNavigator';
import AuthNavigator from './AuthNavigator';
import RegisterNavigator from './RegisterNavigator';
import * as authActions from '../redux/actions/auth';

const App = createStackNavigator();

const AppNavigator = () => {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const isRegistering = useSelector(state => state.auth.isRegistering);

  const dispatch = useDispatch();

  const authHandler = async () => {
    setIsLoading(true);

    return firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
        setIsLoading(false);

        dispatch(
          authActions.setCurrentUser(user.uid, user.displayName, isRegistering)
        );
      } else {
        setAuthenticated(false);
        setIsLoading(false);
      }
    });
  };

  React.useEffect(() => {
    authHandler();
  }, []);

  // {register ? (
  //   <App.Screen name='RegisterNavigator' component={RegisterNavigator} />
  // ) : authenticated && !register && !isLoading ? (
  //   <App.Screen name='DrawerNavigator' component={DrawerNavigator} />
  // ) : !authenticated && !isLoading ? (
  //   <App.Screen name='AuthNavigator' component={AuthNavigator} />
  // ) : (
  //   <App.Screen name='Loading' component={LoadingScreen} />
  // )}

  const Register = createStackNavigator();

  const RegisterNavigator = () => (
    <Register.Navigator headerMode='none' initialRouteName='PreferencesLanding'>
      <Register.Screen
        name='PreferencesLanding'
        component={PreferencesLandingScreen}
      />
      <Register.Screen name='PrefInput1' component={PrefInputScreen1} />
      <Register.Screen name='PrefInput2' component={PrefInputScreen2} />
    </Register.Navigator>
  );

  return (
    <NavigationContainer>
      <App.Navigator headerMode='none'>
        {/* {authenticated && !isRegistering && !isLoading ? (
          <App.Screen name='DrawerNavigator' component={DrawerNavigator} />
        ) : !authenticated && !isLoading ? (
          <App.Screen name='AuthNavigator' component={AuthNavigator} />
        ) : isRegistering && !isLoading ? (
          <App.Screen name='RegisterNavigator' component={RegisterNavigator} />
        ) : (
          <App.Screen name='Loading' component={LoadingScreen} />
        )} */}
        <App.Screen name='RegisterNavigator' component={RegisterNavigator} />
      </App.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

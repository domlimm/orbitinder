import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeLandingScreen,
  LoginLandingScreen,
  LoginScreen,
  SignupScreen,
  ProfileLandingScreen,
  InputBackgroundScreen1,
  InputBackgroundScreen2,
  InputBackgroundScreen3,
  PreferencesLandingScreen,
  PrefInputScreen1,
  PrefInputScreen2,
  ActivityFeedScreen,
  UserProfileScreen
} from '../screens/index';

const { Navigator, Screen } = createStackNavigator();

const LandingNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
      <Screen name='Home' component={HomeLandingScreen} />
      <Screen name='LoginLanding' component={LoginLandingScreen} />
      <Screen name='Login' component={LoginScreen} />
      <Screen name='Signup' component={SignupScreen} />
      <Screen name='ProfileLanding' component={ProfileLandingScreen} />
      <Screen
        name='InputBackgroundScreen1'
        component={InputBackgroundScreen1}
      />
      <Screen
        name='InputBackgroundScreen2'
        component={InputBackgroundScreen2}
      />
      <Screen
        name='InputBackgroundScreen3'
        component={InputBackgroundScreen3}
      />
      <Screen
        name='PreferencesLandingScreen'
        component={PreferencesLandingScreen}
      />
      <Screen name='PrefInputScreen1' component={PrefInputScreen1} />
      <Screen name='PrefInputScreen2' component={PrefInputScreen2} />
      <Screen name='ActivityFeedScreen' component={ActivityFeedScreen} />
      <Screen name='UserProfileScreen' component={UserProfileScreen} />
    </Navigator>
  </NavigationContainer>
);

export default LandingNavigator;

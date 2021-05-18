import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeLandingScreen from '../screens/HomeLandingScreen';
import LoginLandingScreen from '../screens/LoginLandingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ProfileLandingScreen from '../screens/ProfileLandingScreen';
import InputBackgroundScreen1 from '../screens/InputBackgroundScreen1';
import InputBackgroundScreen2 from '../screens/InputBackgroundScreen2';
import InputBackgroundScreen3 from '../screens/InputBackgroundScreen3';

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
    </Navigator>
  </NavigationContainer>
);

export default LandingNavigator;

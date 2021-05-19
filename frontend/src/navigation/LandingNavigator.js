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
import PreferencesLandingScreen from '../screens/PreferencesLandingScreen';
import PrefInputScreen1 from '../screens/PreferenceInputScreen1';
import PrefInputScreen2 from '../screens/PreferenceScreen2';

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
    </Navigator>
  </NavigationContainer>
);

export default LandingNavigator;

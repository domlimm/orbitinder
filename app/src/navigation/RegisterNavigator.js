import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ProfileLandingScreen,
  InputBackgroundScreen1,
  InputBackgroundScreen2,
  InputBackgroundScreen3,
  PreferencesLandingScreen,
  PrefInputScreen1,
  PrefInputScreen2,
  InputProfilePhotoScreen
} from '../screens/index';

const Register = createStackNavigator();

const RegisterNavigator = () => (
  <Register.Navigator headerMode='none' initialRouteName='ProfileLanding'>
    <Register.Screen name='ProfileLanding' component={ProfileLandingScreen} />
    <Register.Screen
      name='InputProfilePhoto'
      component={InputProfilePhotoScreen}
    />
    <Register.Screen
      name='InputBackground1'
      component={InputBackgroundScreen1}
    />
    <Register.Screen
      name='InputBackground2'
      component={InputBackgroundScreen2}
    />
    <Register.Screen
      name='InputBackground3'
      component={InputBackgroundScreen3}
    />
    <Register.Screen
      name='PreferencesLanding'
      component={PreferencesLandingScreen}
    />
    <Register.Screen name='PrefInput1' component={PrefInputScreen1} />
    <Register.Screen name='PrefInput2' component={PrefInputScreen2} />
  </Register.Navigator>
);

export default RegisterNavigator;

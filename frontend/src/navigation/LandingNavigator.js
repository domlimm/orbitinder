import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const { Navigator, Screen } = createStackNavigator();

const LandingNavigator = () => (
  <NavigationContainer>
    <Navigator headerMode='none'>
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

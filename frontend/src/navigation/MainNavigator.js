import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeDrawerNavigator } from './DrawerNavigator';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='DrawerNavigator' component={HomeDrawerNavigator} />
  </Navigator>
);

export default MainNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ActivityFeedScreen,
  UserProfileScreen,
  MainAppScreen
} from '../screens/index';
import { HomeDrawerNavigator } from './DrawerNavigator';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none'>
    {/* <Screen name='MainAppScreen' component={MainAppScreen} />
    <Screen name='ActivityFeedScreen' component={ActivityFeedScreen} />
    <Screen name='UserProfileScreen' component={UserProfileScreen} /> */}
    <Screen name='DrawerNavigator' component={HomeDrawerNavigator} />
  </Navigator>
);

export default MainNavigator;

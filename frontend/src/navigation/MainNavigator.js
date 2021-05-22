import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import BottomTabsNavigator from './BottomTabsNavigator';
import { ActivityFeedScreen, UserProfileScreen } from '../screens';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none' initialRouteName='MainApp'>
    <Screen name='DrawerNavigator' component={DrawerNavigator} />
    <Screen name='UserProfile' component={UserProfileScreen} />
    <Screen name='ActivityFeed' component={ActivityFeedScreen} />
  </Navigator>
);

export default MainNavigator;

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeDrawerNavigator } from './DrawerNavigator';
import {
  ActivityFeedScreen,
  EditProfileScreen,
  UserProfileScreen
} from '../screens';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none' initialRouteName='MainApp'>
    <Screen name='DrawerNavigator' component={HomeDrawerNavigator} />
    <Screen name='UserProfile' component={UserProfileScreen} />

    <Screen name='EditProfile' component={EditProfileScreen} />
    <Screen name='ActivityFeed' component={ActivityFeedScreen} />
  </Navigator>
);

export default MainNavigator;

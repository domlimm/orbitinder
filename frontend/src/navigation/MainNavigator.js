import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import {
  ActivityFeedScreen,
  UserProfileScreen,
  EditProfileScreen
} from '../screens';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none' initialRouteName='DrawerNavigator'>
    <Screen name='DrawerNavigator' component={DrawerNavigator} />
    <Screen name='UserProfile' component={UserProfileScreen} />

    <Screen name='EditProfile' component={EditProfileScreen} />
    <Screen name='ActivityFeed' component={ActivityFeedScreen} />
  </Navigator>
);

export default MainNavigator;

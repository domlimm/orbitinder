import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerNavigator from './DrawerNavigator';
import TabNavigator from './TopTabsNavigator';
import {
  ActivityFeedScreen,
  EditPrefScreen,
  EditProfileScreen
} from '../screens';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none' initialRouteName='DrawerNavigator'>
    <Screen name='DrawerNavigator' component={DrawerNavigator} />
    {/* <Screen name='UserProfile' component={UserProfileScreen} /> */}
    <Screen name='TabNavigator' component={TabNavigator} />

    <Screen name='EditProfile' component={EditProfileScreen} />
    <Screen name='EditPref' component={EditPrefScreen} />
    <Screen name='ActivityFeed' component={ActivityFeedScreen} />
  </Navigator>
);

export default MainNavigator;

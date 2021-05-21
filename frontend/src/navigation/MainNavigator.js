import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ActivityFeedScreen,
  UserProfileScreen,
  MainAppScreen
} from '../screens/index';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='MainAppScreen' component={MainAppScreen} />
    <Screen name='ActivityFeedScreen' component={ActivityFeedScreen} />
    <Screen name='UserProfileScreen' component={UserProfileScreen} />
  </Navigator>
);

export default MainNavigator;

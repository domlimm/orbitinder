// Sign In, Sign Up & Change Password
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivityFeedScreen from '../screens/Main/ActivityFeedScreen';
import UserProfileScreen from '../screens/Main/UserProfileScreen';

const { Navigator, Screen } = createStackNavigator();

const MainNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='ActivityFeedScreen' component={ActivityFeedScreen} />
    <Screen name='UserProfileScreen' component={UserProfileScreen} />
  </Navigator>
);

export default MainNavigator;

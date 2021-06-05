import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { EditProfileScreen, UserProfileScreen } from '../screens';
const { Navigator, Screen } = createStackNavigator();

const ProfileStackNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='UserProfile' component={UserProfileScreen} />
    <Screen name='EditProfile' component={EditProfileScreen} />
  </Navigator>
);
export default ProfileStackNavigator;

import React from 'react';
import { TabBar, Tab } from '@ui-kitten/components';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  UserProfileScreen,
  EditProfileScreen,
  UserPreferencesScreen,
  EditPrefScreen
} from '../screens/index';

const TopTabs = createMaterialTopTabNavigator();
const Profile = createStackNavigator();
const Preferences = createStackNavigator();

const ProfileStackNavigator = () => (
  <Profile.Navigator headerMode='none'>
    <Profile.Screen name='UserProfile' component={UserProfileScreen} />
    <Profile.Screen name='EditProfile' component={EditProfileScreen} />
  </Profile.Navigator>
);

const PrefStackNavigator = () => (
  <Preferences.Navigator headerMode='none'>
    <Preferences.Screen
      name='UserPreferences'
      component={UserPreferencesScreen}
    />
    <Preferences.Screen name='EditPref' component={EditPrefScreen} />
  </Preferences.Navigator>
);

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <Tab title='Your Profile' />
    <Tab title='Partner Preferences' />
  </TabBar>
);

const TabNavigator = () => (
  <TopTabs.Navigator
    tabBar={props => <TopTabBar {...props} />}
    initialRouteName='UserProfile'
    backBehavior='initialRoute'
  >
    <TopTabs.Screen name='UserProfile' component={ProfileStackNavigator} />
    <TopTabs.Screen name='UserPreferences' component={PrefStackNavigator} />
  </TopTabs.Navigator>
);

export default TabNavigator;

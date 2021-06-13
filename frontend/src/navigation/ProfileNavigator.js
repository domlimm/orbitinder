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

const TabStack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const EditProfilePref = createStackNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <Tab title='Your Profile' />
    <Tab title='Partner Preferences' />
  </TabBar>
);

const EditStackNavigator = () => (
  <EditProfilePref.Navigator headerMode='none'>
    <EditProfilePref.Screen name='EditProfile' component={EditProfileScreen} />
    <EditProfilePref.Screen name='EditPref' component={EditPrefScreen} />
  </EditProfilePref.Navigator>
);

const TopTabsNavigator = () => (
  <TopTabs.Navigator
    // tabBar={props => <TopTabBar {...props} />}
    initialRouteName='UserProfile'
    backBehavior='initialRoute'
    tabBarOptions={{
      activeTintColor: '#407BFF'
    }}
    tab
  >
    <TopTabs.Screen
      name='UserProfile'
      component={UserProfileScreen}
      options={{ tabBarLabel: 'Your Profile' }}
    />
    <TopTabs.Screen
      name='UserPreferences'
      component={UserPreferencesScreen}
      options={{ tabBarLabel: 'Partner Preferences' }}
    />
  </TopTabs.Navigator>
);

const ProfileNavigator = () => (
  <TabStack.Navigator initialRouteName='TopTabsNavigator' headerMode='none'>
    <TabStack.Screen name='TopTabsNavigator' component={TopTabsNavigator} />
    <TabStack.Screen name='EditNavigator' component={EditStackNavigator} />
  </TabStack.Navigator>
);

export default ProfileNavigator;

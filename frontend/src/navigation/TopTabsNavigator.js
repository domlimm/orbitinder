// import { ActivityIcon, VideoIcon } from '../assets/icons';
import { Divider, Icon, TabBar, Tab } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserPreferencesScreen, UserProfileScreen } from '../screens/index';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const TopTabBar = ({ navigation, state }) => (
  <TabBar
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <Tab title='User Profile' />
    <Tab title='Partner Preferences' />
  </TabBar>
);

const TabNavigator = () => (
  <Navigator
    tabBar={props => <TopTabBar {...props} />}
    initialRouteName='UserProfile'
    backBehavior='initialRoute'
  >
    <Screen name='UserProfile' component={UserProfileScreen} />
    <Screen name='UserPreferences' component={UserPreferencesScreen} />
  </Navigator>
);

export default TabNavigator;

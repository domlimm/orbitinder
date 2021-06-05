// import { ActivityIcon, VideoIcon } from '../assets/icons';
import { Divider, Icon, TabBar, Tab } from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { UserPreferencesScreen, UserProfileScreen } from '../screens/index';
import ProfileStackNavigator from './ProfileStackNavigator';
import PrefStackNavigator from './PrefStackNavigator';

const { Navigator, Screen } = createMaterialTopTabNavigator();

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
  <Navigator
    tabBar={props => <TopTabBar {...props} />}
    initialRouteName='UserProfile'
    backBehavior='initialRoute'
  >
    <Screen name='UserProfile' component={ProfileStackNavigator} />
    <Screen name='UserPreferences' component={PrefStackNavigator} />
  </Navigator>
);

export default TabNavigator;

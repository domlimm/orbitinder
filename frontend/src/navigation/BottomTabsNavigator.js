import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MainAppScreen,
  ChatOverviewScreen,
  TeamUpScreen,
  UserProfileScreen,
  EditProfileScreen,
  ActivityFeedScreen,
  EditPrefScreen
} from '../screens/index';
import { TeamUpBottomTab } from '../components/index';
import TabNavigator from './TopTabsNavigator';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name='home-outline' />;

const ChatIcon = props => <Icon {...props} name='message-square-outline' />;

const TeamUpIcon = props => <Icon {...props} name='person-outline' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance='noIndicator'
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={TeamUpBottomTab} />
    <BottomNavigationTab icon={ChatIcon} />
  </BottomNavigation>
);

const BottomTabsNavigator = () => (
  <Navigator
    tabBar={props => <BottomTabBar {...props} />}
    initialRouteName='Home'
  >
    <Screen name='Home' component={MainAppScreen} />
    <Screen name='TeamUp' component={TeamUpScreen} />
    <Screen name='ChatOverview' component={ChatOverviewScreen} />
    <Screen name='ActivityFeed' component={ActivityFeedScreen} />
    {/* <Screen name='UserProfile' component={UserProfileScreen} /> */}
    {/* <Screen name='EditProfile' component={EditProfileScreen} /> */}
    {/* <Screen name='EditPref' component={EditPrefScreen} /> */}
    <Screen name='TabNavigator' component={TabNavigator} />
  </Navigator>
);

export default BottomTabsNavigator;

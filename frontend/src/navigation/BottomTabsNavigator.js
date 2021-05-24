// import { ActivityIcon, VideoIcon } from '../assets/icons';
import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  Icon,
  Layout
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MainAppScreen,
  ChatOverviewScreen,
  TeamUpScreen
} from '../screens/index';
import { TeamUpBottomTab } from '../components/index';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name='home-outline' />;

const ChatIcon = props => <Icon {...props} name='message-square-outline' />;

const TeamUpIcon = props => <Icon {...props} name='person-outline' />;

const BottomTabBar = ({ navigation, state }) => (
  <Layout>
    <Divider />
    <BottomNavigation
      appearance='noIndicator'
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={TeamUpBottomTab} />
      <BottomNavigationTab icon={ChatIcon} />
    </BottomNavigation>
  </Layout>
);

const BottomTabsNavigator = () => (
  <Navigator
    tabBar={props => <BottomTabBar {...props} />}
    initialRouteName='Home'
  >
    <Screen name='Home' component={MainAppScreen} />
    <Screen name='TeamUp' component={TeamUpScreen} />
    <Screen name='ChatOverview' component={ChatOverviewScreen} />
  </Navigator>
);

export default BottomTabsNavigator;

// import { ActivityIcon, VideoIcon } from '../assets/icons';
import {
  BottomNavigation,
  BottomNavigationTab,
  Divider,
  Icon
} from '@ui-kitten/components';
import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  MainAppScreen,
  ChatOverviewScreen,
  TeamUpScreen
} from '../screens/index';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name='home-outline' />;

const ChatIcon = props => <Icon {...props} name='message-square-outline' />;

const TeamUpIcon = props => <Icon {...props} name='person-outline' />;

const BottomTabBar = ({ navigation, state }) => (
  <View>
    <Divider />
    <BottomNavigation
      appearance='noIndicator'
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab icon={HomeIcon} />
      <BottomNavigationTab icon={TeamUpIcon} />
      <BottomNavigationTab icon={ChatIcon} />
    </BottomNavigation>
  </View>
);

const BottomTabsNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name='Home' component={MainAppScreen} />
    <Screen name='TeamUpScreen' component={TeamUpScreen} />
    <Screen name='ChatOverviewScreen' component={ChatOverviewScreen} />
  </Navigator>
);

export default BottomTabsNavigator;

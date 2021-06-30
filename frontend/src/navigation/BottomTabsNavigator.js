import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  MainAppScreen,
  TeamUpScreen,
  ActivityFeedScreen,
  RecoUserScreen
} from '../screens/index';
import { TeamUpBottomTab } from '../components/index';

const BottomTabs = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name='home-outline' />;

const ChatIcon = props => <Icon {...props} name='message-square-outline' />;

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance='noIndicator'
    selectedIndex={state.index}
    onSelect={index => {
      if (index === 2) {
        navigation.navigate('ChatsNavigator', { screen: 'ChatsOverview' });
        return;
      }

      navigation.navigate(state.routeNames[index]);
    }}
  >
    <BottomNavigationTab icon={HomeIcon} />
    <BottomNavigationTab icon={TeamUpBottomTab} />
    <BottomNavigationTab icon={ChatIcon} />
  </BottomNavigation>
);

const BottomTabsNavigator = () => (
  <BottomTabs.Navigator
    tabBar={props => <BottomTabBar {...props} />}
    initialRouteName='Home'
  >
    <BottomTabs.Screen name='Home' component={MainAppScreen} />
    <BottomTabs.Screen name='TeamUp' component={TeamUpScreen} />
    <BottomTabs.Screen name='ActivityFeed' component={ActivityFeedScreen} />
    <BottomTabs.Screen name='RecoUser' component={RecoUserScreen} />
  </BottomTabs.Navigator>
);

export default BottomTabsNavigator;

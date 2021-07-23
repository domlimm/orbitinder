import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MainAppScreen, TeamUpScreen, RecoUserScreen } from '../screens/index';
import { TeamUpBottomTab } from '../components/index';

const BottomTabs = createBottomTabNavigator();

const HomeIcon = props => <Icon {...props} name='home-outline' />;

const ChatIcon = props => <Icon {...props} name='message-square-outline' />;

const TeamUpStack = createStackNavigator();

const TeamUpStackNav = () => (
  <TeamUpStack.Navigator headerMode='none' initialRouteName='TeamUpScreen'>
    <TeamUpStack.Screen name='TeamUpScreen' component={TeamUpScreen} />
    <TeamUpStack.Screen name='RecoUser' component={RecoUserScreen} />
  </TeamUpStack.Navigator>
);

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
    <BottomTabs.Screen name='TeamUp' component={TeamUpStackNav} />
  </BottomTabs.Navigator>
);

export default BottomTabsNavigator;

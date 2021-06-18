import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  ChatsOverviewScreen,
  ChatScreen,
  RequestsScreen,
  TeamUpProfileScreen
} from '../screens/index';

const TabStack = createStackNavigator();
const TopTabs = createMaterialTopTabNavigator();
const Chats = createStackNavigator();

const ChatStackNavigator = () => (
  <Chats.Navigator headerMode='none'>
    <Chats.Screen name='Chat' component={ChatScreen} />
    <Chats.Screen name='UserProfile' component={TeamUpProfileScreen} />
  </Chats.Navigator>
);

const TopTabsNavigator = () => (
  <TopTabs.Navigator
    initialRouteName='ChatsOverview'
    backBehavior='initialRoute'
    tabBarOptions={{
      activeTintColor: '#407BFF'
    }}
  >
    <TopTabs.Screen
      name='ChatsOverview'
      component={ChatsOverviewScreen}
      options={{ tabBarLabel: 'Chats' }}
    />
    <TopTabs.Screen
      name='RequestsOverview'
      component={RequestsScreen}
      options={{ tabBarLabel: 'Requests' }}
    />
  </TopTabs.Navigator>
);

const ChatsNavigator = () => (
  <TabStack.Navigator initialRouteName='TopTabsNavigator' headerMode='none'>
    <TabStack.Screen name='TopTabsNavigator' component={TopTabsNavigator} />
    <TabStack.Screen name='ChatStackNavigator' component={ChatStackNavigator} />
  </TabStack.Navigator>
);

export default ChatsNavigator;

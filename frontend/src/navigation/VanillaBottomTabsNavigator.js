import React from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

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

const BottomTabs = createBottomTabNavigator();

const VanillaBottomTabsNavigator = () => {
  return (
    <BottomTabs.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.bar, styles.shadow],
        activeTintColor: '#407BFF'
      }}
    >
      <BottomTabs.Screen
        name='Home'
        component={MainAppScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='home' color={color} size={size} />
          )
        }}
      />
      <BottomTabs.Screen
        name='TeamUp'
        component={TeamUpScreen}
        options={{
          tabBarButton: () => <TeamUpBottomTab />
        }}
      />
      <BottomTabs.Screen
        name='ChatOverview'
        component={ChatOverviewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name='message-square' color={color} size={size} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
};

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    height: 60
  },
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
});

export default VanillaBottomTabsNavigator;

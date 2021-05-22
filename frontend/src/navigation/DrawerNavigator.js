import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  Text
} from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  ChangePasswordScreen,
  LoginScreen,
  MainAppScreen,
  EditProfileScreen
} from '../screens/index';
import { BottomTabsNavigator } from './BottomNavigationTab';
import { NavHeader } from '../components/index';
const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const navProps = {
    navigation: navigation,
    type: 'landing',
    backNav: false
  };

  const Header = () => <NavHeader navProps={navProps} />;

  return (
    <SafeAreaView>
      <Drawer
        header={Header}
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title='Home' />
        <DrawerItem title='Edit Profile' />
        <DrawerItem title='Change Password' />
        <DrawerItem title='Logout' />
      </Drawer>
    </SafeAreaView>
  );
};

export const HomeDrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Screen name='BottomTabsNavigator' component={BottomTabsNavigator} />
    <Screen name='EditProfile' component={EditProfileScreen} />
    <Screen name='ChangePassword' component={ChangePasswordScreen} />
    <Screen name='Login' component={LoginScreen} />
  </Navigator>
);

const styles = StyleSheet.create({
  header: {
    height: 128,
    paddingHorizontal: 16,
    justifyContent: 'center'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileName: {
    marginHorizontal: 16
  },
  icon: {
    width: 22,
    height: 22,
    marginRight: 8
  }
});

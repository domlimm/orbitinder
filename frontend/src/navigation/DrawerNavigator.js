import React from 'react';
import { StyleSheet } from 'react-native';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions, StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ChangePasswordScreen } from '../screens/index';
import TabNavigator from './TopTabsNavigator';
import { NavHeader } from '../components/index';
import BottomTabsNavigator from './BottomTabsNavigator';
import AuthNavigator from './AuthNavigator';
import * as authActions from '../redux/actions/auth';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const navProps = {
    navigation: navigation,
    type: 'landing',
    backNav: false
  };

  const Header = () => <NavHeader navProps={navProps} />;

  const dispatch = useDispatch();

  return (
    <SafeAreaView>
      <Drawer
        header={Header}
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => {
          if (index.row === 2) {
            dispatch(authActions.logOut());

            //, params: { screen: 'LoginLanding' }
            // return navigation.dispatch(
            //   CommonActions.reset({
            //     index: 0,
            //     routes: [{ name: 'AuthNavigator' }]
            //   })
            // );

            return navigation.dispatch(() => ({
              ...StackActions.popToTop(),
              ...CommonActions.reset({
                index: 0,
                routes: [
                  { name: 'AuthNavigator', params: { screen: 'LoginLanding' } }
                ]
              })
            }));
          }

          return navigation.navigate(state.routeNames[index.row]);
        }}
      >
        <DrawerItem title='Home' />
        <DrawerItem title='Change Password' />
        <DrawerItem title='Logout' />
      </Drawer>
    </SafeAreaView>
  );
};

const DrawerNavigator = () => (
  <Navigator
    drawerContent={props => <DrawerContent {...props} />}
    initialRouteName='BottomTabsNavigator'
  >
    <Screen name='BottomTabsNavigator' component={BottomTabsNavigator} />
    <Screen name='ChangePassword' component={ChangePasswordScreen} />
    <Screen name='AuthNavigator' component={AuthNavigator} />
    <Screen name='TabNavigator' component={TabNavigator} />
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

export default DrawerNavigator;

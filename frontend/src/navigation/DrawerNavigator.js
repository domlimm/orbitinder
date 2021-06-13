import React from 'react';
import { Drawer, DrawerItem, IndexPath, Icon } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions, StackActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

import { ChangePasswordScreen } from '../screens/index';
import { NavHeader } from '../components/index';
import BottomTabsNavigator from './BottomTabsNavigator';
import AuthNavigator from './AuthNavigator';
import ProfileNavigator from './ProfileNavigator';
import * as authActions from '../redux/actions/auth';
import * as userActions from '../redux/actions/user';
import * as usersActions from '../redux/actions/users';

const DrawerNav = createDrawerNavigator();
const Main = createStackNavigator();

const MainNavigator = () => (
  <Main.Navigator headerMode='none' initialRouteName='BottomTabsNavigator'>
    <Main.Screen name='BottomTabsNavigator' component={BottomTabsNavigator} />
    <Main.Screen name='ProfileNavigator' component={ProfileNavigator} />
  </Main.Navigator>
);

const DrawerContent = ({ navigation, state }) => {
  const dispatch = useDispatch();

  const navProps = {
    navigation: navigation,
    type: 'landing',
    backNav: false
  };

  const Header = () => <NavHeader navProps={navProps} />;

  const HomeIcon = props => <Icon {...props} name='home' />;
  const ChangePWIcon = props => <Icon {...props} name='shield-outline' />;
  const LogoutIcon = props => <Icon {...props} name='log-out-outline' />;

  return (
    <SafeAreaView>
      <Drawer
        header={Header}
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => {
          if (index.row === 2) {
            dispatch(authActions.logOut());
            dispatch(userActions.logOut());
            dispatch(usersActions.logOut());

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
        <DrawerItem title='Home' accessoryLeft={HomeIcon} />
        <DrawerItem title='Change Password' accessoryLeft={ChangePWIcon} />
        <DrawerItem title='Logout' accessoryLeft={LogoutIcon} />
      </Drawer>
    </SafeAreaView>
  );
};

const DrawerNavigator = () => (
  <DrawerNav.Navigator
    drawerContent={props => <DrawerContent {...props} />}
    initialRouteName='MainNavigator'
  >
    <DrawerNav.Screen name='MainNavigator' component={MainNavigator} />
    <DrawerNav.Screen name='ChangePassword' component={ChangePasswordScreen} />
    <DrawerNav.Screen name='AuthNavigator' component={AuthNavigator} />
  </DrawerNav.Navigator>
);

export default DrawerNavigator;

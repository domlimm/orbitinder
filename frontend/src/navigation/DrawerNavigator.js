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
  ActivityFeedScreen,
  UserProfileScreen,
  MainAppScreen
} from '../screens/index';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const Header = () => (
    <Layout style={styles.header}>
      <Text>Orbitinder</Text>
    </Layout>
  );

  return (
    <SafeAreaView>
      <Drawer
        header={Header}
        selectedIndex={new IndexPath(state.index)}
        onSelect={index => navigation.navigate(state.routeNames[index.row])}
      >
        <DrawerItem title='Home' />
        <DrawerItem title='Change Password' />
        <DrawerItem title='Logout' />
      </Drawer>
    </SafeAreaView>
  );
};

export const HomeDrawerNavigator = () => (
  <Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Screen name='MainAppScreen' component={MainAppScreen} />
    <Screen name='ActivityFeedScreen' component={ActivityFeedScreen} />
    <Screen name='UserProfileScreen' component={UserProfileScreen} />
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

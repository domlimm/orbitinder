import {
  Avatar,
  Drawer,
  DrawerItem,
  IndexPath,
  Layout,
  StyleService,
  Text,
  useStyleSheet
} from '@ui-kitten/components';

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ActivityFeedScreen from '../screens/Main/ActivityFeedScreen';
import UserProfileScreen from '../screens/Main/UserProfileScreen';
import MainAppScreen from '../screens/Main/MainAppScreen';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  const styles = useStyleSheet(themedStyles);

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

const themedStyles = StyleService.create({
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

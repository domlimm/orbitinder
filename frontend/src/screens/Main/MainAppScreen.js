import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Layout,
  Icon,
  TopNavigationAction,
  TopNavigation,
  Text,
  Avatar
} from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import greeting from '../../utils/Greeting';

const MainAppScreen = ({ navigation }) => {
  const [stateName, setName] = React.useState('');

  const { auth } = useSelector(state => state);

  console.log(auth);

  const navigateActivityFeed = () => {
    navigation.navigate('ActivityFeed');
  };

  const navigateProfileScreen = () => {
    navigation.navigate('UserProfile');
  };

  const renderTitle = () => (
    // <Layout style={styles.titleContainer}>
    //   <Image
    //     style={styles.logo}
    //     source={require('../../assets/images/orbital-brand.png')}
    //   />
    // </Layout>
    <Text style={styles.titleHeader}>Home</Text>
  );

  const DrawerIcon = props => (
    <Icon
      {...props}
      name='menu-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
      onPress={() => navigation.openDrawer()}
    />
  );
  const renderSettingsIcon = () => <TopNavigationAction icon={DrawerIcon} />;

  const NotificationsIcon = props => (
    <Icon
      {...props}
      name='bell-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
    />
  );
  const renderNotificationsIcon = () => (
    <TopNavigationAction
      icon={NotificationsIcon}
      onPress={navigateActivityFeed}
    />
  );

  return (
    <SafeAreaView style={styles.parentContainer}>
      <TopNavigation
        title={renderTitle}
        alignment='center'
        accessoryLeft={renderSettingsIcon}
        accessoryRight={renderNotificationsIcon}
      />
      <ScrollView>
        <TouchableOpacity onPress={navigateProfileScreen}>
          <Layout style={styles.introCard}>
            <Layout>
              <Text style={styles.greetingTitle}>{greeting()}</Text>
              <Text>{stateName}</Text>
            </Layout>
            <Avatar
              shape='rounded'
              size='giant'
              source={{ uri: 'https://i.pravatar.cc/300' }}
            />
          </Layout>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  introCard: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  greetingTitle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 25
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 32
  },
  notifCard: {
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default MainAppScreen;

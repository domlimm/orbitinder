import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback
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

import { dummyUserData } from '../../constants/userData';
import greeting from '../../utils/Greeting';

const MainAppScreen = ({ navigation }) => {
  const { name } = useSelector(state => state.auth);

  const navigateActivityFeed = () => {
    navigation.navigate('ActivityFeed');
  };

  const navigateProfileScreen = () => {
    navigation.navigate('TabNavigator');
  };

  const renderTitle = () => <Text style={styles.titleHeader}>Home</Text>;

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
        <TouchableNativeFeedback
          onPress={navigateProfileScreen}
          background={TouchableNativeFeedback.Ripple('#00000020', false)}
          useForeground={true}
        >
          <Layout style={styles.introCard}>
            <Layout>
              <Text style={styles.greetingTitle}>{greeting()}</Text>
              <Text>{name}</Text>
            </Layout>
            <Avatar
              shape='rounded'
              size='giant'
              source={{ uri: dummyUserData.img }}
            />
          </Layout>
        </TouchableNativeFeedback>
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
    paddingHorizontal: 20,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    elevation: 3
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

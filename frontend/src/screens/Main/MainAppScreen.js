import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
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
import { useNavigation } from '@react-navigation/native';

const MainAppScreen = ({ navigation }) => {
  // const navigation = useNavigation();
  const navigateActivityFeed = () => {
    navigation.navigate('ActivityFeedScreen');
  };

  const navigateProfileScreen = () => {
    navigation.navigate('UserProfileScreen');
  };

  const renderTitle = () => (
    <Layout style={styles.titleContainer}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/orbital-brand.png')}
      />
    </Layout>
  );

  const SettingsIcon = props => (
    <Icon
      {...props}
      name='settings-2-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
      onPress={() => navigation.openDrawer()}
    />
  );
  const renderSettingsIcon = () => <TopNavigationAction icon={SettingsIcon} />;

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
      <ScrollView>
        <TopNavigation
          style={styles.topNav}
          title={renderTitle}
          alignment='center'
          accessoryLeft={renderSettingsIcon}
          accessoryRight={renderNotificationsIcon}
        />
        <TouchableOpacity onPress={navigateProfileScreen}>
          <Layout style={styles.introCard}>
            <Layout>
              <Text style={styles.greetingTitle}>Good Morning</Text>
              <Text>Harrison Ford</Text>
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
    backgroundColor: '#FAFAFA'
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
    // marginVertical: 50
  },
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  topNav: {
    marginVertical: 8
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
  }
});

export default MainAppScreen;

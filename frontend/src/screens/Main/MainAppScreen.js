import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import {
  Layout,
  Icon,
  TopNavigationAction,
  TopNavigation
} from '@ui-kitten/components';

const MainAppScreen = ({ navigation }) => {
  const navigateActivityFeed = () => {
    navigation.navigate('ActivityFeedScreen');
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
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
  }
});

export default MainAppScreen;

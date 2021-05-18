import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

export default function ProfileHeader(navProps) {
  const BackIcon = props => <Icon {...props} name='arrow-back' />;

  const navigateBack = () => {
    navProps.navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderTitle = () => (
    <Image
      style={styles.logo}
      source={require('../../assets/images/orbital-logo.png')}
    />
  );

  if (navProps.needBackNav) {
    return (
      <TopNavigation
        accessoryLeft={BackAction}
        alignment='center'
        style={styles.topNav}
        accessoryRight={renderTitle}
      />
    );
  } else {
    return (
      <TopNavigation
        style={styles.topNav}
        accessoryRight={renderTitle}
        alignment='center'
      />
    );
  }
}

const styles = StyleSheet.create({
  topNav: {
    marginVertical: 8
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: '5%'
  }
});

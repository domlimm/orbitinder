import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

const NavHeader = ({ navProps }) => {
  const navigateBack = () => {
    navProps.navigation.goBack();
  };

  const BackIcon = props => <Icon {...props} name='arrow-back' />;

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderBrand = () => (
    <View style={styles.titleContainer}>
      <Image
        style={{ ...styles.logo, ...styles.authLogo }}
        source={require('../../assets/images/orbital-brand.png')}
      />
    </View>
  );

  const renderLogo = () => (
    <Image
      style={{ ...styles.logo, ...styles.registerLogo }}
      source={require('../../assets/images/orbital-logo.png')}
    />
  );

  return (
    <TopNavigation
      style={styles.topNav}
      accessoryLeft={navProps.backNav && BackAction}
      accessoryRight={
        navProps.type === 'register' || navProps.type === 'profile'
          ? renderLogo
          : null
      }
      title={
        navProps.type === 'landing' || navProps.type === 'auth'
          ? renderBrand
          : null
      }
      alignment='center'
    />
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain'
  },
  authLogo: {
    flex: 1
  },
  registerLogo: {
    marginLeft: '5%'
  },
  topNav: {
    marginVertical: 6
  }
});

export default NavHeader;

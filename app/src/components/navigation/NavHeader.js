import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

const brand = require('../../assets/images/orbital-brand.png');
const logo = require('../../assets/images/orbital-logo.png');

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
      <Image style={{ ...styles.logo, ...styles.authLogo }} source={brand} />
    </View>
  );

  const Brand = React.useMemo(() => renderBrand, []);

  const renderLogo = () => (
    <Image style={{ ...styles.logo, ...styles.registerLogo }} source={logo} />
  );

  const Logo = React.useMemo(() => renderLogo, []);

  return (
    <TopNavigation
      style={styles.topNav}
      accessoryLeft={navProps.backNav && BackAction}
      accessoryRight={
        (navProps.type === 'register' || navProps.type === 'profile') && Logo
      }
      title={(navProps.type === 'landing' || navProps.type === 'auth') && Brand}
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
    resizeMode: 'contain'
  },
  authLogo: {
    flex: 1,
    width: 140,
    height: 45
  },
  registerLogo: {
    marginLeft: '5%',
    width: 40,
    height: 40
  },
  topNav: {
    marginVertical: 6
  }
});

export default NavHeader;

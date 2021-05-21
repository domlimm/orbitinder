import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text
} from '@ui-kitten/components';

const TitleHeader = ({ props, navProps }) => {
  const BackIcon = props => (
    <Icon
      {...props}
      name='arrow-back'
      fill='#407bff'
      style={[props.style, { width: 32, height: 32 }]}
    />
  );

  const navigateBack = () => {
    navProps.navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderTitle = () => (
    <Text style={styles.titleHeader}>{navProps.title}</Text>
  );

  const DrawerIcon = props => (
    <Icon
      {...props}
      name='menu-outline'
      style={[props.style, { width: 32, height: 32 }]}
      animation='pulse'
      fill='#407BFF'
      onPress={() => navProps.navigation.openDrawer()}
    />
  );
  const renderMenuIcon = () => <TopNavigationAction icon={DrawerIcon} />;

  if (navProps.needBackNav) {
    return (
      <TopNavigation
        accessoryLeft={BackAction}
        alignment='center'
        style={styles.topNav}
        title={renderTitle}
      />
    );
  } else {
    if (navProps.needMenuNav) {
      return (
        <TopNavigation
          style={styles.topNav}
          title={renderTitle}
          alignment='center'
          accessoryLeft={renderMenuIcon}
        />
      );
    } else {
      return (
        <TopNavigation
          style={styles.topNav}
          title={renderTitle}
          alignment='center'
        />
      );
    }
  }
};

const styles = StyleSheet.create({
  topNav: {
    marginVertical: 5
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: '5%'
  },
  titleHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default TitleHeader;

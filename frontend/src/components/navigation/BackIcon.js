import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

const BackIcon = ({ props, navigation, navProps }) => {
  let BackIcon;
  let navigateBack;
  if (navProps.useNewIcon) {
    BackIcon = props => (
      <Icon
        {...props}
        name={navProps.iconName}
        onPress={navigateBack}
        fill='white'
      />
    );
  } else {
    BackIcon = props => (
      <Icon {...props} name='arrow-back' onPress={navigateBack} fill='white' />
    );
  }

  if (navProps.navigateSpecificPage) {
    navigateBack = () => {
      navigation.navigate(navProps.navScreenName);
    };
  } else {
    navigateBack = () => {
      navigation.goBack();
    };
  }

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return <TopNavigation accessoryLeft={BackAction} style={styles.topNav} />;
};

const styles = StyleSheet.create({
  topNav: {
    backgroundColor: '#407bff',
    padding: 0,
    height: 0
  }
});

export default BackIcon;

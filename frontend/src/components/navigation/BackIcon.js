import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

const BackIcon = ({ props, navigation }) => {
  const BackIcon = props => (
    <Icon {...props} name='arrow-back' onPress={navigateBack} fill='white' />
  );

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const IconBack = BackIcon();

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

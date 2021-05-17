import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';

export default function AuthHeader({ navigation }) {
  const BackIcon = props => <Icon {...props} name='arrow-back' />;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <Image
        style={styles.logo}
        source={require('../../assets/images/orbital-brand.png')}
      />
    </View>
  );

  return (
    <TopNavigation
      style={{ marginVertical: 8 }}
      accessoryLeft={BackAction}
      title={renderTitle}
      alignment='center'
    />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 50
  },
  logo: {
    flex: 1,
    width: 40,
    height: 40,
    resizeMode: 'contain'
  }
});

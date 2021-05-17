import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TopNavigation } from '@ui-kitten/components';

export default function ProfileHeader() {
  const renderTitle = () => (
    <Image
      style={styles.logo}
      source={require('../../assets/images/orbital-logo.png')}
    />
  );
  return (
    <TopNavigation
      style={{ marginVertical: 8 }}
      accessoryRight={renderTitle}
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
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginLeft: '5%'
  }
});

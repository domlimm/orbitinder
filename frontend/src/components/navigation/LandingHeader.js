import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TopNavigation } from '@ui-kitten/components';

const LandingHeader = () => {
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
      style={styles.topNav}
      title={renderTitle}
      alignment='center'
    />
  );
};

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
  },
  topNav: {
    marginVertical: 8
  }
});

export default LandingHeader;

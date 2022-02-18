import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const FloatingEdit = ({ navigate }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.touchableOpacityStyle}
      onPress={navigate}
    >
      <Image
        source={require('../../assets/images/edit.png')}
        style={styles.floatingButtonStyle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 24
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50
  }
});

export default FloatingEdit;

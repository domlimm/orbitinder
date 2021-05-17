import React from 'react';
import { Image, StyleSheet } from 'react-native';

const LandingImage = ({ imgSrc }) => (
  <Image style={styles.img} source={imgSrc} />
);

const styles = StyleSheet.create({
  img: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain'
  }
});

export default LandingImage;

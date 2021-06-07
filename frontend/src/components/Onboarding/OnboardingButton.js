import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const OnboardingButton = ({ scrollTo }) => (
  <View style={styles.container}>
    <TouchableOpacity
      onPress={scrollTo}
      style={styles.button}
      activeOpacity={0.6}
    >
      <AntDesign name='arrowright' size={32} color='#fff' />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    backgroundColor: '#407BFF',
    borderRadius: 100,
    padding: 20
  }
});

export default OnboardingButton;

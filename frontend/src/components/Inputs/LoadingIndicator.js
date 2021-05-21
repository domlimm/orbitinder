import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const LoadingIndicator = props => {
  return (
    <View style={[props.style, styles.container]}>
      <Spinner size='small' />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default LoadingIndicator;

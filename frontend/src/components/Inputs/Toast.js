import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';

const Toast = ({ message, status, hide }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  let backgroundColor;

  if (status === 'success') {
    backgroundColor = '#9CE656';
  } else if (status === 'info') {
    backgroundColor = '#3DB7FF';
  } else if (status === 'warning') {
    backgroundColor = '#FFB73A';
  } else if (status === 'danger') {
    backgroundColor = '#FF3D32';
  }

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.delay(2000),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      })
    ]).start(() => {
      hide(false);
    });
  }, []);

  return (
    <Animated.View
      style={{
        ...styles.messageToast,
        opacity,
        transform: [
          {
            translateY: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [-20, 0]
            })
          }
        ],
        backgroundColor: backgroundColor
      }}
    >
      <Text style={styles.messageText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  messageToast: {
    margin: 10,
    marginBottom: 5,
    padding: 10,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  messageText: {
    fontWeight: 'bold',
    flexShrink: 1,
    flexWrap: 'wrap'
  }
});

export default Toast;

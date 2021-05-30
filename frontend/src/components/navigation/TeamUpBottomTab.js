import React, { useRef, useEffect } from 'react';
import { Platform, Pressable, StyleSheet, Animated, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TeamUpBottomTab = () => {
  const navigation = useNavigation();
  const animatedScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animatedScale.setValue(1);
  }, []);

  const pressHandler = () => {
    animatedScale.setValue(0.8);

    Animated.spring(animatedScale, {
      toValue: 1,
      bounciness: 24,
      speed: 20,
      useNativeDriver: true
    }).start();

    setTimeout(() => {
      navigation.navigate('TeamUp');
    }, 250);
  };

  return (
    <Pressable onPress={pressHandler} style={styles.teamUp}>
      <Animated.View style={[{ transform: [{ scale: animatedScale }] }]}>
        <Image
          style={styles.logo}
          source={require('../../assets/images/orbital-logo.png')}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  teamUp: {
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    top: -34,
    elevation: Platform.OS === 'android' ? 5 : 0,
    shadowColor: '#407BFF',
    shadowOffset: {
      height: 10
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    borderWidth: 3,
    borderColor: 'white'
  },
  logo: {
    width: 62,
    height: 62
  }
});

export default TeamUpBottomTab;

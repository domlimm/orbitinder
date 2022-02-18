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

    navigation.navigate('TeamUp');
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
    width: 82,
    height: 82,
    borderRadius: 41,
    top: -45,
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
    width: 75,
    height: 75
  }
});

export default TeamUpBottomTab;

import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import { LandingHeader, LandingImage } from '../components/navigation/index';

const LoginLandingScreen = ({ navigation }) => {
  const navigateLogin = () => {
    navigation.navigate('Login');
  };

  const navigateSignup = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <LandingHeader />
      <Layout style={styles.layoutContainerTop}>
        <LandingImage imgSrc={require('../assets/images/high-five-pana.png')} />
      </Layout>
      <Layout style={styles.layoutContainerBottom}>
        <Button onPress={navigateSignup} style={styles.signUpBtn}>
          Sign Up
        </Button>
        <Button onPress={navigateLogin} style={styles.logInBtn} status='basic'>
          Log In
        </Button>
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain'
  },
  layoutContainerTop: {
    height: '50%'
  },
  layoutContainerBottom: {
    height: '50%',
    alignItems: 'center'
  },
  textContent: {
    textAlign: 'center',
    fontSize: 17
  },
  signUpBtn: {
    width: '70%',
    marginVertical: 15
  },
  logInBtn: {
    width: '70%'
  }
});

export default LoginLandingScreen;

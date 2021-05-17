import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import { Button, Layout } from '@ui-kitten/components';
import LandingHeader from '../components/LandingHeader';

export const LoginLandingScreen = ({ navigation }) => {
  const navigateLoginScreen = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <LandingHeader />
      <Layout style={styles.layoutContainerTop}>
        <Image
          style={styles.landingImage}
          source={require('../assets/images/high-five-pana.png')}
        />
      </Layout>
      <Layout style={styles.layoutContainerBottom}>
        <Button
          onPress={() => console.log('sign up btn pressed')}
          style={styles.signUpBtn}
        >
          Sign Up
        </Button>
        <Button
          onPress={navigateLoginScreen}
          style={styles.logInBtn}
          status='basic'
        >
          Log In
        </Button>
      </Layout>
      <StatusBar style='auto' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  landingImage: {
    maxHeight: '100%',
    maxWidth: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
    paddingTop: 20
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
    margin: 15,
    backgroundColor: '#407BFF'
  },
  logInBtn: {
    width: '70%',
    margin: 15
  }
});
